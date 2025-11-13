# Changelog

## v1.4 - 2025-10-19

### Added
- **SEO Essentials**
  - `app/sitemap.ts` - Dynamic sitemap generator that includes all static pages and blog posts
  - `public/robots.txt` - Search engine crawler directives

- **Error Handling**
  - `app/error.tsx` - Error boundary with retry functionality
  - `app/global-error.tsx` - Global error handler for critical failures
  - `app/not-found.tsx` - Custom 404 page with navigation options

- **Loading States**
  - `app/loading.tsx` - Root loading spinner
  - `app/blog/loading.tsx` - Blog-specific loading skeleton
  - `components/ui/loading-skeleton.tsx` - Reusable skeleton components

- **Documentation**
  - Inline comments in `Contact.tsx` with 4 integration options for contact form
  - Updated README.md to reflect all new features

### Improvements
- Enhanced UX with loading skeletons for better perceived performance
- Better error recovery with user-friendly error pages
- Production-ready SEO with automated sitemap generation

### Technical
- All TypeScript types verified (npm run typecheck passes)
- No breaking changes to existing functionality
- Maintains static-first architecture

---

## v1.3 - Previous Release
- Initial AI Website Builder Template
- Config-driven architecture
- Blog system with Markdown
- All core components and sections
