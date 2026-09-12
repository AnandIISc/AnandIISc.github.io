# 🚀 Personal Portfolio Website - GitHub Pages

## Engineering Notes

Engineering Notes are Markdown files in `_notes/` rendered by Jekyll into clean `/notes/<slug>/` pages. The portfolio homepage remains the primary landing page.

### Local preview

```bash
bundle install
bundle exec jekyll serve --livereload
```

Open `http://localhost:4000/notes/` while the server is running.

### Publish a new note

1. Copy the template from `_notes/template-note.md` to `_notes/my-note.md`.
2. Replace the placeholder content and set the title, description, date, tags and permalink.
3. Preview locally with Jekyll.
4. Commit and push the Markdown file.

```bash
git add _notes/my-note.md
git commit -m "Add note on process identity"
git push origin main
```

Jekyll discovers new files in `_notes/` automatically; the Notes index does not need manual editing.

A modern, responsive portfolio website showcasing systems engineering expertise, built with vanilla HTML, CSS, and JavaScript.

![Portfolio Preview](https://img.shields.io/badge/Status-Ready%20to%20Deploy-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ Features

- **Modern Dark Theme** - Eye-friendly dark color scheme with cyan accents
- **Responsive Design** - Fully responsive across all devices (mobile, tablet, desktop)
- **Smooth Animations** - Engaging scroll animations and transitions
- **Interactive Elements** - Dynamic typing effect, particle background, and 3D card tilts
- **Performance Optimized** - Vanilla JavaScript with no framework overhead
- **SEO Friendly** - Proper meta tags and semantic HTML
- **Accessibility** - WCAG compliant with keyboard navigation support

## 🎨 Sections

1. **Hero Section** - Eye-catching introduction with animated typing effect
2. **About** - Professional background and achievements
3. **Experience** - Timeline of work history with detailed descriptions
4. **Projects** - Showcase of featured projects with tech stacks
5. **Skills** - Technical expertise with animated progress bars
6. **Contact** - Multiple ways to connect

## 🚀 Quick Start

### Option 1: Deploy to GitHub Pages (Recommended)

1. **Create a new repository** named `<your-username>.github.io`
   ```bash
   # Example: if your username is "anand", create "anand.github.io"
   ```

2. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/<your-username>.github.io.git
   cd <your-username>.github.io
   ```

3. **Copy the website files**
   ```bash
   # Copy index.html, styles.css, and script.js to the repository root
   cp /path/to/github-io-page/* .
   ```

4. **Customize the content**
   - Edit `index.html` to update your personal information
   - Update social media links (GitHub, LinkedIn)
   - Modify project descriptions and links
   - Adjust skills and experience sections

5. **Commit and push**
   ```bash
   git add .
   git commit -m "Initial commit: Add portfolio website"
   git push origin main
   ```

6. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "main" branch as source
   - Click "Save"

7. **Access your website**
   - Your site will be live at: `https://<your-username>.github.io`
   - It may take a few minutes for the first deployment

### Option 2: Deploy to GitHub Pages (Project Site)

If you want to deploy as a project site instead of a user site:

1. **Create a new repository** with any name (e.g., `portfolio`)

2. **Clone and add files**
   ```bash
   git clone https://github.com/<your-username>/portfolio.git
   cd portfolio
   # Copy files here
   ```

3. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add portfolio website"
   git push origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "main" branch and "/" (root) folder
   - Save

5. **Access at**: `https://<your-username>.github.io/portfolio`

### Option 3: Local Development

To test locally before deploying:

```bash
# Navigate to the project directory
cd github-io-page

# Option 1: Using Python
python -m http.server 8000

# Option 2: Using Node.js (if you have http-server installed)
npx http-server

# Option 3: Using PHP
php -S localhost:8000

# Open browser and visit: http://localhost:8000
```

## 🎨 Customization Guide

### 1. Personal Information

Edit [`index.html`](index.html):

```html
<!-- Update your name -->
<h1 class="glitch" data-text="Your Name">Your Name</h1>

<!-- Update your title and company -->
<p class="hero-subtitle">Your Title @ Your Company | Your Education</p>

<!-- Update social links -->
<a href="https://github.com/your-username" target="_blank">
<a href="https://www.linkedin.com/in/your-profile/" target="_blank">
```

### 2. Experience Section

Update the timeline items with your work history:

```html
<div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <div class="timeline-header">
            <h3>Your Job Title</h3>
            <span class="company">Company Name</span>
            <span class="duration">Start Date – End Date</span>
        </div>
        <!-- Add your responsibilities -->
    </div>
</div>
```

### 3. Projects Section

Update project cards with your actual projects:

```html
<div class="project-card">
    <div class="project-header">
        <i class="fas fa-folder-open"></i>
        <div class="project-links">
            <a href="your-github-repo-url" class="project-link">
                <i class="fab fa-github"></i>
            </a>
        </div>
    </div>
    <h3 class="project-title">Your Project Name</h3>
    <p class="project-description">Your project description</p>
    <div class="project-tech">
        <span>Tech1</span>
        <span>Tech2</span>
    </div>
</div>
```

### 4. Skills Section

Adjust skill levels in the progress bars:

```html
<div class="skill-progress" style="width: 95%"></div>
<!-- Change the width percentage to match your skill level -->
```

### 5. Color Scheme

Edit [`styles.css`](styles.css) to change colors:

```css
:root {
    --primary-color: #64ffda;      /* Main accent color */
    --bg-color: #0a192f;           /* Background color */
    --text-primary: #ccd6f6;       /* Primary text color */
    /* Modify these to match your preference */
}
```

### 6. Typing Animation

Edit [`script.js`](script.js) to change the typing phrases:

```javascript
const phrases = [
    'Your Title 1',
    'Your Title 2',
    'Your Title 3',
    // Add more phrases
];
```

## 📱 Responsive Breakpoints

The website is responsive with the following breakpoints:

- **Desktop**: > 968px
- **Tablet**: 768px - 968px
- **Mobile**: < 768px

## 🎯 Performance Tips

1. **Optimize Images**: If you add images, compress them using tools like TinyPNG
2. **Lazy Loading**: Images are lazy-loaded by default (if you add any)
3. **Minification**: For production, consider minifying CSS and JS files
4. **CDN**: Font Awesome and Google Fonts are loaded from CDN

## 🔧 Advanced Customization

### Adding Custom Fonts

```html
<!-- In index.html <head> -->
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@400;700&display=swap" rel="stylesheet">
```

```css
/* In styles.css */
:root {
    --font-sans: 'Your Font', sans-serif;
}
```

### Adding Analytics

Add Google Analytics or other tracking:

```html
<!-- Before </head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-ID');
</script>
```

### Custom Domain

To use a custom domain with GitHub Pages:

1. Create a file named `CNAME` in the repository root
2. Add your domain name (e.g., `www.yourdomain.com`)
3. Configure DNS settings with your domain provider:
   - Add A records pointing to GitHub's IPs
   - Or add a CNAME record pointing to `<username>.github.io`

## 🐛 Troubleshooting

### Site not loading after deployment
- Wait 5-10 minutes for GitHub Pages to build
- Check repository settings → Pages section
- Ensure branch is set correctly (usually `main`)
- Verify files are in the root directory

### Styles not applying
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors
- Verify CSS file path in HTML

### JavaScript not working
- Check browser console for errors
- Ensure script.js is loaded at the end of body
- Verify all DOM elements exist before JavaScript runs

### Mobile menu not working
- Check if hamburger icon is visible on mobile
- Verify JavaScript is loaded
- Test on actual mobile device, not just browser resize

## 📄 File Structure

```
github-io-page/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🌟 Features Breakdown

### HTML Features
- Semantic HTML5 elements
- Proper meta tags for SEO
- Open Graph tags for social sharing
- Accessible navigation structure

### CSS Features
- CSS Grid and Flexbox layouts
- CSS Variables for easy theming
- Smooth animations and transitions
- Mobile-first responsive design
- Custom scrollbar styling

### JavaScript Features
- Smooth scroll navigation
- Typing animation effect
- Particle background animation
- Intersection Observer for scroll animations
- Dynamic skill bar animations
- Mobile menu toggle
- Active navigation highlighting
- 3D card tilt effects
- Scroll progress indicator

## 🎨 Design Credits

- **Color Scheme**: Inspired by modern developer portfolios
- **Fonts**: 
  - JetBrains Mono (monospace)
  - Inter (sans-serif)
- **Icons**: Font Awesome 6.4.0

## 📝 License

This project is open source and available for personal use. Feel free to fork and customize for your own portfolio!

## 🤝 Contributing

If you find any bugs or have suggestions for improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

If you need help with deployment or customization:
- Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
- Open an issue in the repository
- Refer to the troubleshooting section above

## 🚀 Next Steps

After deployment:

1. ✅ Test on multiple devices and browsers
2. ✅ Share your portfolio link on LinkedIn and GitHub profile
3. ✅ Add your portfolio link to your resume
4. ✅ Keep it updated with new projects and experiences
5. ✅ Monitor analytics to see visitor engagement

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**

*No frameworks, no build tools, just pure web technologies!*
