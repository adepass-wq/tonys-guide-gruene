# Tony's Guide Jamaica development

The Jamaica website is built from `jamaica/src/`. Read `jamaica/DEVELOPMENT.md` before making source changes. `jamaica/index.html` is generated; do not edit it directly or apply one-off patches to the published file.

Start from the current remote `main`, work on a task branch, preserve unrelated changes, and keep source changes and their generated output in the same commit. Make routine implementation decisions within the user's authorized scope.

Before publication, run `npm run release:prepare`. Run the local preview for changed user flows and inspect relevant desktop/mobile behavior with the available browser. Automated DOM tests do not establish visual layout, actual media playback, or the accuracy of an external source. State any browser verification limit.

Push one coordinated release after checks pass. Preserve the existing GitHub repository, public audience, domain and Render service. After deployment, run `npm run verify:live` and inspect the changed live flows. Do not repeatedly trigger deployment when an automatic deployment is already underway.

Use citations tied to the claims they support. Keep media dates, locations and credits attached to the actual material. Update article summaries in `data/article-metadata.json` when their purpose changes; search text and source lists are generated automatically.

Report separately what was changed, synchronized, deployed and independently tested. Never treat a successful build as proof that a deployment or external recording works.
