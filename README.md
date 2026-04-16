# ResumeBuilder

ResumeBuilder is a browser-based portfolio of resume tools and templates that helps users build a recruiter-ready resume, review example templates, and rate resume styles.

## Features

- Multi-step resume builder form in `resume-builder.html`
  - Basic personal details
  - Career focus and goal
  - Experience summary
  - Skills and education
  - Final review summary card
- Resume examples gallery in `ResumeHtml/resumeEx.html`
  - Six resume template cards
  - Download buttons for PDF and DOC
  - Interactive star ratings for each template
  - Average rating stored in browser localStorage
- Responsive layout styled with `Assets/CSS/style.css`
- JavaScript interactivity in `Assets/JS/builder.js` and `Assets/JS/main.js`

## Files

- `index.html` — Main landing page with navigation, resources, and links to the builder and resume examples
- `resume-builder.html` — Interactive resume builder form
- `ResumeHtml/resumeEx.html` — Example resume templates with rating support
- `Assets/CSS/style.css` — Global styling and responsive page design
- `Assets/JS/builder.js` — Builder form step navigation, validation, and summary generation
- `Assets/JS/main.js` — Homepage interactions, dropdowns, accessibility helpers, and resume rating storage

## How to use

1. Open `index.html` in a browser.
2. Choose either the resume builder or the resume examples page.
3. On `resume-builder.html`, complete each form step and click `Next`.
4. On `ResumeHtml/resumeEx.html`, click a star rating to rate a resume template.
5. The average rating for each template is stored locally and displayed beneath the stars.

## Notes

- This project is entirely static and runs in the browser without a backend.
- Ratings are saved using browser localStorage, so each browser remembers submitted scores per template.
- Accessibility and responsive UI enhancements are included via `main.js` and `style.css`.

## License

See the `LICENSE` file for licensing details.

