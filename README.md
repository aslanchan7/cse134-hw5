# SSG Exercise

`./ssg-exercise`

The 2 pages to preview are the homepage (`index.html`) and the project details page (`project-details.html`).

# Install Dependencies

```
npm install
npm run build
npm run preview
```

# Design Note

On the homepage, a visitor is able to fetch a random fact through my custom element.
The user clicks on the "Next Fact" button which requests data from the Useless Facts API. While waiting, the button is disabled and the visitor is able to see the "Fetching random fact..." status. On success, the status is updated to show the success and button is re-enabled. On failure, the status shows some failure message with clear instructions on how to retry. The button also changes its text content to say "Try Again."
