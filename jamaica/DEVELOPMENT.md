# Updating Tony's Guide Jamaica

## One-time setup

Use Node.js 24 or later. Clone `https://github.com/adepass-wq/tonys-guide-gruene.git`, enter the repository, and run `npm ci --ignore-scripts`.

## The normal update

1. Fetch the current remote source and start a task branch. Do not replace newer edits with an older copy.
2. Edit the relevant source files below. Research and check new factual claims and media independently.
3. Run `npm run release:prepare`. This builds the deployable page, rejects stale output, checks syntax/citations/IDs and runs behavior tests.
4. Run `npm run preview`, then open its printed URL. Check the changed flows, search results, reading layout and narrow-screen navigation. Rebuild after source edits and refresh the preview. Stop the preview when finished.
5. Review the Git diff. Commit source, metadata, tests when relevant, and `jamaica/index.html` together. Publish one coordinated release to `main` through the authorized GitHub workflow.
6. Confirm the matching Render deployment is live; do not trigger another if one is already running. Run `npm run verify:live` and inspect the changed live flows. That command checks HTTP success and an exact match with the checked local build.

## Where to edit

| Change | Source |
| --- | --- |
| An article | `src/articles/<article-id>.html` |
| Article collection, parish, summary, era | `src/data/article-metadata.json` |
| Place guide text and media | `src/places/<place-id>.html` |
| Place properties used by filters, comparisons and planners | `src/data/travel-places.json` |
| Events | `src/data/travel-events.json` and the corresponding event markup in `src/pages/events.html` |
| Visitor-resource directory | `src/data/travel-resources.json` and its page markup when necessary |
| Homepage or a portal | `src/pages/<page-id>.html` |
| Header/footer | `src/layout/` |
| Typography, colors or component layout | `src/styles/`, in the existing template order |
| Search, navigation, weather, planning, listening | The named module in `src/scripts/` |

The page and place fragments retain the existing markup and inline asset order. Styles are named and ordered rather than concatenated in an unspecified order. The generated page remains self-contained so Render's existing copy command continues to work.

### Article changes

Edit the article fragment and, when needed, its short summary. Full-text history search entries, article titles and the source index are rebuilt from the article itself. Do not maintain duplicate copies of article text inside JavaScript.

For a new article: create the fragment, add its include to `src/pages/reader.html`, add a metadata entry and update the manifest inventory. Add links from relevant portals. Use unique citation IDs within the article and preserve the single-article reading behavior.

### Places, events and recordings

Structured place data drives comparisons and planning; the place fragment supplies the reading view. Update both when a price, opening rule or other practical detail changes. Event data and event markup must likewise agree. Recording biography, actual location, source and usage terms should remain visible. A successful automated test does not establish that every third-party stream plays.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run build` | Assemble source and regenerate indexes into `jamaica/index.html` |
| `npm run check` | Reject a stale build; validate scripts, JSON, IDs, sources and image descriptions |
| `npm test` | Test routing, search, planner dates, saved state, conditions and feed failures |
| `npm run release:prepare` | Build and run all prepublication checks |
| `npm run preview` | Serve the assembled page at a local URL without publishing |
| `npm run verify:live` | Compare the live HTML with the checked local build |

`npm run verify:live -- --url http://127.0.0.1:4173/` checks the preview. CI runs `npm run verify` on relevant pull requests and pushes. It reports failures; it is not currently a branch-protection rule or a Render deployment gate.

## Hosting and rollback

The existing Render service is `tonys-guide-jamaica`, branch `main`, build command `mkdir -p public && cp jamaica/index.html public/index.html`, published directory `public`. Keep these settings unless the user requests a hosting change. The source repository also contains the Gruene archive; leave it intact.

For rollback, select the last verified release commit and revert the coordinated source/output commit through Git. Rebuild and verify the reverted source, deploy once, and compare the live output. Do not restore only `index.html` while leaving incompatible source behind.

## Verification limits

DOM tests use deterministic weather fixtures and simulated feed outages. They do not inspect a real beach, validate historical claims, render a phone screen, or prove third-party audio/video availability. Verify those separately and report specific limits without presenting automated success as broader evidence.
