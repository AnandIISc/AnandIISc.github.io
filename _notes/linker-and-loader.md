---
title: "The Linker, The Loader, and What Actually Happens Before main()"
description: "A hands-on walkthrough of how the linker and loader work — from object files to a live process in memory, explained with real C programs and objdump output."
date: 2026-09-13
tags:
  - C
  - linker
  - loader
  - systems programming
  - memory
permalink: /notes/linker-and-loader/
---
**A bottom-up walk through linking and loading — the part of the toolchain most C programmers use every day but rarely look at directly.**

I wanted to understand the linker the same way I approached API and ABI — not by reading a definition, but by actually watching it work.

So I wrote a small C program, and I didn't just compile it. I stopped at every stage, cracked it open with `objdump`, and looked at what was actually there. This note is that walk.

---

## Before we start: our tool — objdump

Before touching any code, a quick word on `objdump`, because we'll lean on it throughout.

`objdump` is a disassembler and object file inspector. It knows how to read ELF files — object files (`.o`), shared libraries (`.so`), and executables alike — and show you what's inside: sections, symbols, raw bytes, disassembled instructions, relocations.

The flags I use most:

```text
objdump -h          # show sections (headers)
objdump -t          # show symbol table
objdump -d          # disassemble executable sections only
objdump -D          # disassemble all sections
objdump -r          # show relocations
```

We'll also use `readelf` and `nm` where they give a cleaner view. But `objdump` is the main lens.

---

## From source code to running program — the sequence

Before diving into the linker specifically, it helps to see the full pipeline:

```
Source code (.c)
      |
      | compiler (gcc -c)
      v
Object file (.o)        ← opcode + data, but symbols unresolved
      |
      | linker (ld / gcc)
      v
Executable (ELF)        ← symbols resolved, sections laid out
      |
      | loader (OS / ld.so)
      v
Process in memory       ← real virtual addresses, ready to run
```

Each stage has a distinct responsibility. The compiler turns C into machine instructions. The linker packages everything into a runnable binary. The loader maps that binary into memory and hands control to `_start`.

---

## What the linker actually does

The linker's job is straightforward to state: take one or more object files, resolve all the symbols that reference each other, assign final addresses to everything, and produce a single executable.

A good analogy: **the linker is like getting a boarding pass.** Your name is on it, your seat is assigned, the flight is confirmed — but the gate number just says "TBD". You know you're flying, but you don't know exactly where to go yet. The loader is the airport display board that fills in the real gate number right before you walk. At link time, addresses are laid out and symbols are resolved. At load time, the OS assigns real virtual addresses and the dynamic linker patches in the final locations.

And at its heart, linking is all about **address finding**. Every `bl Foo` or `ldr x0, [k]` in your object file is a placeholder — the compiler emitted the instruction but left the address as zero. The linker's entire job is to fill those zeros in with real locations.

---

## The linker toolchain

Three things work together to get your code running:

- **Compiler** — translates C to machine code, produces object files with opcodes, data, and a symbol table. It knows nothing about other files.
- **Linker** — takes all the object files, resolves cross-file symbol references, assigns addresses, and packages everything into an executable.
- **OS / loader** — prepares the memory layout, maps the executable into the process's virtual address space, resolves dynamic symbols, and transfers control to the entry point.

---

## The program in our example

Here are the two files we'll carry through the entire note.

**`hello_world.c`**

```c
#include <stdio.h>
#include "myfn.h"

int Total = 4;
int j = 10;
const char Msg[] = " BYE BYE BYE \n";
int L = 5;
extern int k;
extern int i;

int main(void) {
    printf("%s", Msg);
    i = 10;

    for (i = 0; i < j; i++) {
        Total += Foo(i, j);
        Total += k;
    }

    printf("Total = %d", Total);
    return 1;
}
```

**`myfn.h`**

```c
#ifndef MYFN_H
#define MYFN_H

int Foo(int a, int b);

#endif
```

**`myfn.c`**

```c
#include "myfn.h"

int k = 7;
int i = 0;

int Foo(int a, int b) {
    return a + b + k;
}
```

`hello_world.c` uses `k`, `i`, and `Foo()` — but doesn't define them. They live in `myfn.c`. This is exactly the cross-file dependency that the linker exists to resolve.

---

## Step 1 — compile to object files

```bash
gcc -c hello_world.c -o hello_world.o
gcc -c myfn.c -o myfn.o
```

Each file compiles independently. The compiler doesn't know about the other file. Let's look at the symbol table of `hello_world.o`:

```bash
objdump -t hello_world.o
```

```
SYMBOL TABLE:
0000000000000000 g     O .data   0000000000000004 Total
0000000000000004 g     O .data   0000000000000004 j
0000000000000000 g     O .rodata 000000000000000f Msg
0000000000000008 g     O .data   0000000000000004 L
0000000000000000 g     F .text   0000000000000104 main
0000000000000000         *UND*   0000000000000000 puts
0000000000000000         *UND*   0000000000000000 i
0000000000000000         *UND*   0000000000000000 Foo
0000000000000000         *UND*   0000000000000000 k
0000000000000000         *UND*   0000000000000000 printf
```

Four symbols are marked `*UND*` — undefined. `Foo`, `k`, and `i` are supposed to come from `myfn.c`. `puts` and `printf` come from `libc`. At this point the compiler has emitted all the instructions, but every address for these symbols is zero — a placeholder.

You can see this directly in the disassembly:

```bash
objdump -d hello_world.o
```

```
  54:   94000000        bl      0 <Foo>
  ...
  14:   90000000        adrp    x0, 0 <i>
  ...
  84:   90000000        adrp    x0, 0 <k>
```

Every call and every address reference points to `0`. The linker will fix these.

---

## What happens when a symbol stays undefined

Before moving on, it's worth seeing what the linker does when it can't resolve a symbol. When we had only `k` and `Foo` in `myfn.c` but no `i`:

```bash
gcc hello_world.o myfn.o -o hello_world
```

```
/usr/bin/aarch64-linux-gnu-ld.bfd: hello_world.o: in function `main':
hello_world.c:(.text+0x14): undefined reference to `i'
hello_world.c:(.text+0x18): undefined reference to `i'
...
collect2: error: ld returned 1 exit status
```

The linker scanned the symbol table of every `.o` it was given, found `i` in `*UND*` with no matching definition anywhere, and refused to produce a binary. This is symbol resolution failing — exactly the linker's job, done correctly.

Adding `int i = 0;` to `myfn.c` gives the linker a definition to resolve against, and the link succeeds.

---

## Step 2 — link into an executable

```bash
gcc hello_world.o myfn.o -o hello_world
./hello_world
```

```
 BYE BYE BYE
Total = 289
```

Now look at the same symbol table in the final executable:

```bash
objdump -D hello_world | grep -A2 "<Foo>\|<main>\|<k>:\|<Total>:"
```

In the linked binary, every symbol has a real address. Compare `Foo` in the object file versus the executable:

|                            | Address                              |
| -------------------------- | ------------------------------------ |
| `Foo` in `myfn.o`      | `0x0000000000000000` (placeholder) |
| `Foo` in `hello_world` | `0x0000000000000828` (real)        |

And in `main`, the call that was `bl 0 <Foo>` is now:

```
8ac:   97ffffdf        bl      828 <Foo>
```

A real target address. That's the linker's work.

The data variables also land at real locations in `.data`:

```
0000000000020010 <k>:      00000007
0000000000020014 <Total>:  00000004
0000000000020018 <j>:      0000000a
000000000002001c <L>:      00000005
```

---

## What an executable actually contains

A compiled ELF executable is made of sections. Each section holds a different kind of content:

| Section     | Contains                                                                                              |
| ----------- | ----------------------------------------------------------------------------------------------------- |
| `.text`   | Executable instructions — the compiled machine code                                                  |
| `.rodata` | Read-only data — string literals,`const` globals like `Msg`                                      |
| `.data`   | Initialized globals and statics with non-zero values —`Total`, `j`, `k`, `L`                 |
| `.bss`    | Uninitialized or zero-initialized globals and statics — no space in the file, allocated at load time |
| stack       | Per-function local variables and call frames — allocated at runtime                                  |

At runtime the OS also sets up the heap (for `malloc`) and a stack for each thread.

---

## A closer look at .text

The `.text` section contains the executable instructions for your program. A few things worth knowing about it:

- The instructions are in the binary encoding of the target ISA — AArch64 in our case, x86-64 on a typical desktop. A different ISA means a different compiler and different instruction encoding.
- `.text` is read-only and executable. It gets mapped into the process's virtual address space with execute permission.
- At runtime it can be cached in the processor's **instruction cache (I-cache)**. The processor fetches instructions using the **program counter (PC)**, which moves through the `.text` section one instruction at a time. The I-cache makes this fetch fast.
- On some processors — DSPs, for example — program memory and data memory have completely separate address spaces. In that architecture `.text` and `.data` literally cannot overlap. On a normal Linux system they share the same virtual address space but with different permissions.
- On systems with fast on-chip memory (like tightly coupled memory on microcontrollers), time-critical sections of `.text` are sometimes copied into that fast memory at startup.

---

## What the loader does

The linker produces a file. The loader turns that file into a running process.

When you type `./hello_world`, the kernel:

1. Reads the ELF headers to understand the memory layout
2. Creates a virtual address space for the new process
3. Maps the `.text`, `.rodata`, `.data` segments into that space
4. Allocates memory for `.bss` and zeroes it
5. Sets up the stack
6. For a dynamically linked binary, hands control to `ld.so` (the dynamic linker), which resolves any remaining shared-library symbols
7. Jumps to `_start`, which eventually calls `main()`

The key point: the linker assigned *virtual* addresses. The loader maps those virtual addresses to physical memory through the page table. The program never sees physical addresses.

---

## Memory layout example

Run the program and inspect its memory map while it's alive:

```bash
./hello_world &
cat /proc/$(pgrep hello_world)/maps
```

You'll see something like:

```
aaaaaaaa0000-aaaaaaaa1000 r-xp  ...  hello_world   ← .text (execute)
aaaaaaab0000-aaaaaaab1000 r--p  ...  hello_world   ← .rodata (read-only)
aaaaaaab1000-aaaaaaab2000 rw-p  ...  hello_world   ← .data + .bss (read-write)
...
ffff00000000-ffff00001000 r-xp  ...  ld-linux       ← dynamic linker
...
fffffffff000-1000000000000 rwxp ...  [stack]
```

Each region has permissions: `r` read, `w` write, `x` execute. The `.text` section is mapped `r-x` — readable and executable but not writable. `.data` is `rw-` — readable and writable but not executable. This separation is enforced by the hardware MMU.

---

## Where I want to go next

A few threads I want to pull on from here:

- **Linker scripts** — how to explicitly control where each section lands in memory, essential for bare-metal and embedded work
- **Static vs dynamic linking** — what `ldd`, shared objects, and `LD_PRELOAD` actually do
- **Relocations in detail** — the `.rela.dyn` and `.rela.plt` sections we saw in `objdump -D`, and what the dynamic linker does with them at runtime
