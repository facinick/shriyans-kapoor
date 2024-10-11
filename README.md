# Personal Blog

This repository contains the source code for my personal blog.

- Repository: [facinick/shriyans-kapoor](https://github.com/facinick/shriyans-kapoor.git)
- Website: [https://shriyans-kapoor.netlify.app/](https://shriyans-kapoor.netlify.app/)

## Overview

The blog is built using the following technologies:

- **Next.js (SSR+SSG)**: Utilizes server-side rendering and static site generation for improved performance and SEO.
- **MDX**: Used for rendering .mdx posts, enabling markdown support.
- **Radix UI**: Provides components for a consistent and accessible UI.
- **Framer Motion**: Adds smooth animations to enhance the user experience.
- **Netlify**: Deployment, CDN with Netlify. Served over HTTP/2.

## Lighthouse
[![Lighthouse Accessibility Badge](./lighthouse_badges/lighthouse_accessibility.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse Best Practices Badge](./lighthouse_badges/lighthouse_best-practices.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse Performance Badge](./lighthouse_badges/lighthouse_performance.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse SEO Badge](./lighthouse_badges/lighthouse_seo.svg)](https://github.com/emazzotta/lighthouse-badges)

## Deployment
[![Netlify Status](https://api.netlify.com/api/v1/badges/55205328-9705-4a25-a7bf-ed133859b9a0/deploy-status)](https://app.netlify.com/sites/shriyans-kapoor/deploys)

## Features

- **SSR Supported Dark/Light Mode**: Prevents initial white flicker for a smoother user experience. (2 pass rendering to enable ssr theming)
- **SSR Supported Black/Blue/Orange Themes**: Offers multiple theme options without initial white flicker.
- **.mdx Posts**: Supports markdown-based posts for easy content creation.
- **Pagination**: Implements pagination for better navigation through posts.
- **SSR Pages**: All pages are server-side rendered for optimal performance.
- **SSG Pages**: Build time generation of `/[category]` and `/[category]/[slug]` routes for faster serving.
- **Best React Practices**: Follows best practices for React development to ensure maintainability and scalability.
- **Extensible UI Components**: Implements Component API design principles like polymorphism, delegated props, slots, etc., making it easy to extend and customize the UI components.
- **Supports reduced motion**: Web app respects readers decision to not give them seizures.
- **Lazy loading**: Lazy loading costly components so readers browser loads less data at first with `React.lazy()`
- **Caching**: Server caching through in-memory variables and client caching through `React.cache()`
- **Semantic HTML**: Is this a feature? With a lot fo developers not caring 1 bit about this, I'm sad to say yes it is. We need to support readers whose life we haven't lived. Don't make assumptions about anyone. We provide content to read, the reader should be able to. This feature is an ever extending one, I have a lot to learn still about this and I am constantly improving.
- **Support for categories**: Add new categories by created new folders inside `/posts` firectory, and add new posts by creating `.mdx` files inside the `[category]` folder.

## TODO:
- [x] Discuss Comments (click to load)
- [ ] Page views
- [ ] Estimated Reading Time
- [x] Tags
- [x] Categories
- [ ] Better UI **[P1]**
- [ ] Elevator Music
- [ ] Post Types **[P1]**
    1. Links
    2. Full posts
    3. Book Reviews
    4. Collections / Lists
    5. Location
    6. Bookmarks
    7. Spotify / YouTube Music / Apple Music / SoundCloud link / Thoughts or Quotes
- [ ] Lottie Animations
- [ ] X-Robots Tag Issue for SEO
- [ ] Automatic rss, lighthouse score, prettier, lint.
- [ ] Tests, Security audits.