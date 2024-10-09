# Shriyans Kapoor's Personal Blog

This repository contains the source code for Shriyans Kapoor's personal blog.

- Repository: [facinick/shriyans-kapoor](https://github.com/facinick/shriyans-kapoor.git)
- Website: [https://shriyans-kapoor.netlify.app/](https://shriyans-kapoor.netlify.app/)

## Overview

The blog is built using the following technologies:

- **Next.js (SSR)**: Utilizes server-side rendering for improved performance and SEO.
- **MDX**: Used for rendering .mdx posts, enabling markdown support.
- **Radix UI**: Provides components for a consistent and accessible UI.
- **Framer Motion**: Adds smooth animations to enhance the user experience.

## Features

- **SSR Supported Dark/Light Mode**: Prevents initial white flicker for a smoother user experience. (2 pass rendering to enable ssr theming)
- **SSR Supported Black/Blue/Orange Themes**: Offers multiple theme options without initial white flicker.
- **.mdx Posts**: Supports markdown-based posts for easy content creation.
- **Pagination**: Implements pagination for better navigation through posts.
- **SSR Pages**: All pages are server-side rendered for optimal performance.
- **Best React Practices**: Follows best practices for React development to ensure maintainability and scalability.
- **Extensible UI Components**: Implements Component API design principles like polymorphism, delegated props, slots, etc., making it easy to extend and customize the UI components.
- **Supports reduced motion**: Web app respects readers decision to not give them seizures.
- **Lazy loading**: Lazy loading costly components so readers browser loads less data at first.
- **Pagination**: We generate pagination at built, so we can support ssr with ease. There is a `pagination.json` file generated holding information that can be consumed by any pagination utility, it has number pf pages, posts per page, metadata to show about thsoe pages and slug, incase you want to load the entire page.
- **Semantic HTML**: Is this a feature? With a lot fo developers not caring 1 bit about this, I'm sad to say yes it is. We need to support readers whose life we haven't lived. Don't make assumptions about anyone. We provide content to read, the reader should be able to. This feature is an ever extending one, I have a lot to learn still about this and I am constantly improving.