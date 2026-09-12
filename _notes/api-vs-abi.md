---
title: "From printf() to the CPU: Where Do API and ABI Fit?"
description: "A bottom-up experiment to understand the contracts between C source code, compiled binaries, and the processor."
date: 2026-09-13
tags:
  - C
  - systems programming
  - API
  - ABI
  - AArch64
permalink: /notes/api-vs-abi/
---
**A bottom-up look at the contracts that let the same C program work across different libraries, operating systems, and processor architectures.**

I wanted to understand API and ABI a little differently.

Instead of starting with their definitions, I started with a very simple C program:

```c
#include <stdio.h>

int main(void)
{
    printf("Hello, World!\n");
    return 0;
}
```

We already know what is going to happen.

```text
anand@anand-QEMU-Virtual-Machine:~$ gcc main.c -o main
anand@anand-QEMU-Virtual-Machine:~$ ./main 
Hello, World!
```

Nothing surprising here.

But I had a simple question:

**What made me so confident that the output would be `Hello, World!`?**

Who actually made that promise?

Is it C? Is it `stdio.h`? Is it the compiler? Is it the C library? Is it Linux? Or eventually, the CPU?

I thought following this one line—

```c
printf("Hello, World!\n");
```

—let understand where API and ABI actually fit.

At a high level, this is the path I want to explore:

```text
C Program
    ↓
C Standard / Library Interface
    ↓
Compiler
    ↓
Compiled Program / Libraries
    ↓
Operating-System Interface
    ↓
Machine Instructions
    ↓
CPU
```

The interesting part for me is not every implementation detail in this path. The question I want to keep asking is:

**At each boundary, what is the contract, and who is depending on it?**

---

## Starting with `<stdio.h>`

The first obvious thing in the program is:

```c
#include <stdio.h>
```

I am running this experiment on an AArch64 Ubuntu Linux VM, so I first looked at the actual header installed on the machine.

```text
anand@anand-QEMU-Virtual-Machine:$ grep "printf" /usr/include/stdio.h

extern int fprintf (FILE *__restrict __stream, ...);
extern int printf (const char *__restrict __format, ...);
```

So before worrying about where `printf()` is implemented, there is already something interesting here.

My source code knows how it is allowed to call `printf()`.

The declaration tells the compiler that there is a function called `printf`, what its first parameter looks like, that more arguments may follow, and that the function returns an `int`.

But there is no implementation of formatted output here.

That made me ask the next question:

**Is this declaration enough for the compiler to compile my program?**

---

## What does the compiler actually see?

Instead of directly doing:

```text
gcc main.c -o main
```

I decided to break the build into stages.

First, preprocessing:

```text
$ anand@anand-QEMU-Virtual-Machine:~$ wc -l main.c main.i
    3 main.c
  844 main.i
```

My original source is only a few lines, but the preprocessed file is much larger:

Looking near the end of `main.i`, I can still find the declaration of `printf()` that came through `stdio.h`.


```c
extern int printf (const char *__restrict __format, ...);
```

So at this point I still haven't found the implementation of `printf()`.

What I have found is an **interface that my source code is compiling against**.

This seems like the first place where the idea of an API becomes useful.

At the source-code level, I don't need to know how formatted output is implemented. I need to know the interface I am allowed to use and the behavior I can expect from it.

So, for now, my mental model is:

```text
My C source
     │
     │ uses
     ▼
printf(...)
     │
     │ declaration exposed through headers
     ▼
source-level interface
```

I don't want to call the header itself “the API,” because the API is more than one declaration. But the header is one place where the implementation exposes the source-level interface to my program.

Now the next question becomes more interesting:

**What does the compiler do with this information?**

---

## Let me stop before linking

Instead of creating the final executable, I generated assembly and an object file separately.

```text
$ anand@anand-QEMU-Virtual-Machine:~$ gcc -S main.c -o main.s
$ nand@anand-QEMU-Virtual-Machine:~$ file main.s
main.s: assembler source, ASCII text
```

Looking at the generated assembly, I found this:

```asm
anand@anand-QEMU-Virtual-Machine:~$ cat main.s
adrp    x0, .LC0
add     x0, x0, :lo12:.LC0
bl      printf
```

This was the point where API versus ABI started making more sense to me.

At the C level I wrote:

```c
printf("Hello, World!\n");
```

And the declaration I saw was roughly:

```c
int printf(const char *, ...);
```

But now the compiler has generated instructions involving `x0` and `bl`.

That raises another question:

**Where did `x0` come from?**

Nothing in:

```c
int printf(const char *, ...);
```

says:

```text
put the first argument in register x0
```

Yet the compiler has done exactly that.

So there must be another contract below the C source-level interface.

---

## This is where ABI starts becoming visible

My program is being compiled for AArch64.

The compiler needs to generate a call that can eventually enter a separately compiled implementation of `printf()`.

Those two pieces of code may have been compiled completely independently:

```text
my main.c                         C library

    │                                │
    ▼                                ▼

compiled caller                compiled printf
    │                                │
    └──────── must agree ────────────┘
```

They need to agree on questions such as:

* Where does the first function argument go?
* Where do additional arguments go?
* Where is a return value placed?
* Which registers can a function modify?
* Which registers must it preserve?
* And So onnnn....

My C declaration doesn't answer those questions.

The **ABI does**.

So this is currently the distinction that makes the most sense to me:

```text
SOURCE LEVEL

printf("Hello, World!")
        │
        │ source-level interface
        ▼
       API
        │
        ▼
     compiler


BINARY LEVEL

argument placed according
to calling convention

        ↓

    bl printf
        │
        ▼
       ABI
        │
        ▼
separately compiled library code
```

Or, even more simply:

**API tells me what interface my source code can use.**

**ABI tells separately compiled pieces of software how they must agree at the binary level.**

That finally connects the two ideas for me.

---

## And what about the CPU?

There is still another layer.

Consider:

```asm
bl printf
```

The ABI can define the convention around a function call—for example, how arguments and return values are communicated between caller and callee.

But the processor itself needs to understand what the `bl` instruction means.

That belongs to another contract: the processor's **ISA**.

So I currently see three different contracts:

```text
C source
   │
   │ API
   ▼
What can I call?
What does the interface mean?
   │
   ▼
Compiled code
   │
   │ ABI
   ▼
How do separately compiled
components agree?
   │
   ▼
Machine instructions
   │
   │ ISA
   ▼
What does the CPU actually
execute and what do those
instructions mean?
```

The interesting thing is that these contracts solve different problems.

The C programmer doesn't normally need to think about `x0`.

The C library doesn't need to know how my application was designed internally.

And the CPU doesn't know anything about `printf()`.

Each layer only needs the appropriate contract with the layer around it.

---

## Where I want to go next

I still haven't answered the original question completely.

I know more about how my source-level call becomes a binary-level function call, but I haven't yet followed `printf()` all the way through the C library, into the operating system, and eventually toward the hardware.

That is probably the next part of this experiment.

For now, though, one thing is much clearer to me:

```text
API  → source-level agreement

ABI  → binary-level agreement

ISA  → processor-level agreement
```

These aren't three names for the same thing.

They are contracts at different boundaries.

And that is the part I was missing when I originally tried to understand the difference between API and ABI.
