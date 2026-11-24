# Analp Kalore | Portfolio

Static portfolio site (plain HTML, CSS and JS, no build step) for GitHub Pages.
Live URL (once deployed from a repo named `analpk30.github.io`): https://analpk30.github.io/

## Structure

```text
index.html        Home, Projects, Milestones and Contact (single page)
projects.html     Full project write-ups ("View More")
css/styles.css    Design tokens, layout, hero split layout, fixed dimmed background
js/main.js        Page transitions, scrollspy, scroll parallax, copy-email
assets/           desk-scene.webp (hero image), og-image.jpg, favicon.svg
.github/workflows/deploy.yml   GitHub Pages deployment (GitHub Actions)
.nojekyll         Serve files as-is
robots.txt        Crawler rules + sitemap pointer
sitemap.xml       Page list for search engines
```

## Local preview

```bash
python3 -m http.server 8000
```

## Deploy

1. Create a repository named `analpk30.github.io` under the `analpk30` account.
2. Push these files to the `main` branch.
3. Repo Settings -> Pages -> Build and deployment -> Source: **GitHub Actions**.
4. The `Deploy Portfolio to GitHub Pages` workflow publishes the site on every push to `main`.
