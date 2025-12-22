# Tools Repository

A collection of small, self-contained web tools built with the help of LLMs.

## Architecture

- **Single-file tools**: Each tool is a standalone HTML file with embedded CSS and JavaScript
- **No build step**: Tools run directly in the browser without compilation or bundling
- **Vanilla JS/CSS only**: No React, Vue, or other frameworks

## Creating New Tools

### File Structure

Create a single `.html` file in the repository root. Include all CSS in a `<style>` tag and all JavaScript in a `<script>` tag at the end of `<body>`.

### CSS Guidelines

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

- **Box-sizing**: Always use `box-sizing: border-box` universally
- **Max-width container**: Use centered max-width layout (600-800px typical)
- **Flexbox**: Use flexbox for layout
- **CSS variables**: Define colors and theming values in `:root`
- **Dark mode**: Support via `@media (prefers-color-scheme: dark)`
- **System fonts**: Use the system font stack:
  ```css
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  ```

### Mobile Responsiveness

- Use `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Design mobile-first with minimal CSS
- Use `clamp()` for fluid typography
- Add media queries for breakpoints as needed

### External Resources

- Use CDN links for any external libraries
- Prefer minimal dependencies
- **Always use current versions** of external libraries
- **Include SRI (Subresource Integrity)** hashes for all external resources for security

### JavaScript Guidelines

- **Modern ECMAScript**: Write modern ECMAScript 2022 or newer
- **Web APIs**: Prefer modern web/browser APIs where possible (e.g., Fetch API, Web Storage API, etc.)

## Security and Privacy

Security and privacy are core values for this project. All tools must follow these guidelines:

### Input Sanitization

- **Never trust user input**: Always validate and sanitize all user-provided data
- **File uploads**: Validate file types, sizes, and contents before processing
- **URL parameters**: Sanitize and validate any data from URL parameters or query strings
- **Form inputs**: Validate all form inputs on the client side (and server side if applicable)

### Output Escaping

- **HTML output**: Always escape user-provided content before rendering in HTML
  ```javascript
  function escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
  }
  ```
- **DOM manipulation**: Use `.textContent` instead of `.innerHTML` when inserting user data
- **URL construction**: Use `encodeURIComponent()` when building URLs with user data
- **Template literals**: Escape variables in template strings that contain user input

### Common Vulnerabilities to Prevent

- **XSS (Cross-Site Scripting)**: Escape all user input before rendering
- **Command Injection**: Never execute user input as code (avoid `eval()`, `Function()`, etc.)
- **Path Traversal**: Validate file paths if processing local files
- **Open Redirects**: Validate and whitelist redirect URLs
- **Prototype Pollution**: Be careful when merging objects from user input

### Content Security

- **SRI (Subresource Integrity)**: Required for all external scripts and stylesheets
- **HTTPS only**: All external resources must use HTTPS URLs
- **No inline scripts**: Avoid inline event handlers (`onclick="..."`) when possible
- **Referrer Policy**: Use `referrerpolicy="no-referrer"` or `referrerpolicy="no-referrer-when-downgrade"` for external links

### Privacy Guidelines

- **Client-side only**: All processing should happen in the browser when possible
- **No tracking**: Do not include analytics, tracking pixels, or third-party cookies
- **No data collection**: Do not send user data to external servers unless explicitly required
- **Local storage**: If using localStorage/sessionStorage, document what is stored and why
- **Clear data**: Provide users a way to clear any stored data
- **No PII logging**: Never log personally identifiable information to console

### Best Practices

- **CORS**: Be mindful of CORS policies when fetching external resources
- **File handling**: Process files entirely client-side when possible to protect privacy
- **Credentials**: Never hard-code API keys, tokens, or credentials
- **Error messages**: Don't expose sensitive information in error messages
- **Dependencies**: Minimize external dependencies to reduce attack surface

### Navigation Footer

Include a navigation section at the bottom of each tool:

```html
<nav class="site-nav">
    <a href="/">← All Tools</a> | <a href="https://github.com/flokoe/tools/blob/main/TOOLNAME.html" target="_blank" rel="noopener">Source</a>
</nav>
```

### Index Page

After creating a new tool, add it to `index.html` in the tools list.

## Existing Patterns

- Semantic HTML with ARIA attributes
- Open Graph and Twitter Card and other SEO meta tags
