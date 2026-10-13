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

The page and place fragments retain the existing markup and inline asset order. Styles are named and ordered rather than concatenated in an unspecified order. The builder extracts embedded raster media without changing the image bytes into tracked `public/assets/` files. The generated HTML uses content-hashed `/assets/` URLs. Render's existing copy command preserves this directory while copying the new page; commit source, generated HTML and generated assets together.

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

## Saved trips and edition email records

Public companion: https://tonys-guide-saved-trips.adepass.chatgpt.site; Sites project `appgprj_6accf5debd888191bb9345facec0b837`. Source is maintained in its Sites Git repository, separately from Render. D1 stores trips (secret-link tokens and place IDs) and subscribers (email, edition, consent and timestamp). Emails are not exposed by the public API. Browser module: `src/scripts/saved-trips.js`. Allowed origins: Jamaica custom domain and Render domain.

The form records Jamaica update interest. No outbound email delivery service is configured. Trip links contain no email, but link holders can read selected places. Device storage, download and printing remain available.

Historical audio: `src/data/historical-recordings.json`. Preserve dates, field localities and conversation/performance distinctions. Do not reintroduce International Dialects of English Archive material.

## Sensory history and inline evidence

Place photographs and document facsimiles within the narrative beside the relevant passage. Every article figure needs a location caption: identify the actual place or state that the locality is not established. Keep dates, performer/creator and credits attached to the actual item. All article figures live in `.narrative-body`; do not restore footer image galleries.

`scripts/sensory-media.js` provides in-page image magnification and click-to-load YouTube embeds. Preserve original credits and fallback publisher links. `data/sensory-media-records.json` records source identity and technical checks; original publisher previews are labelled as 30-second excerpts. A successful HTTP response or provider embed flag does not establish heard playback.

The newspaper and Independence Act page use base64 source assets in `src/assets/` so readers can examine them without another image server. Source include tokens must remain intact; parse/serialize source HTML only after protecting include tokens. Keep primary artifact metadata distinct from interpretation, and retain the prohibition on International Dialects of English Archive material.

## Visitor discovery and local programmes

`data/travel-places.json` is the single inventory for the activity directory, food filters, homepage picks, comparisons and custom timetables. Keep full reading fragments and manifest entries aligned with it. `foodKind`, `nearby` and `discoveryCategory` control the dedicated views. A town branch is a distinct location, not a duplicate business accidentally created by search.

`data/local-programmes.json` contains recurring venue programmes, separately from confirmed dated events. Preserve weekday and second/last-Sunday rules. Homepage Today/This weekend uses Jamaica dates; the event desk also applies area and genre filters. Do not assign a dated concert or artist lineup from an undated venue feature. Programme records have a recheck date and visibly request fresh confirmation after it.

Photographs of restaurants, product illustrations and logos must be distinguished in captions. `data/visitor-research.json` and `data/food-image-records.json` retain the evidence and limitations. Source image assets are compressed and embedded to preserve the current one-file hosting workflow; a source URL is not an open-licence statement. Never use stock as evidence of a named venue.

The cruise calculator uses the visitor’s ship deadline, transfer estimate and margin; it does not infer berth, ship clock or traffic. Closed activity products stay visibly unavailable and are excluded from timetable options. Shared shortlist buttons use one delegated handler, including cards rendered after initial load.

## Shared regional experience

`src/scripts/experience-context.js` runs after the directories, learning tools and condition controls mount. `TGTravelRegions.controls` registers each regional selector; `TGContext` synchronizes their selection and stores it separately in `tg-jamaica-context-v1`. Preserve existing trip, reading and note storage keys. History exposes the same eight travel regions; old broad-region values remain hidden compatibility choices.

Practical tools and saved reading now live inside the Plan page, with the original tool and reading anchors retained. Region previews derive from the single place/article/event/programme inventories and retain actual media captions. Remove cloned IDs from reused figures. Programme wrappers keep stable destinations even when date filters hide their cards; direct records are identified when outside filters. Dispatch routing once after runtime-generated destinations mount so initial deep links resolve.

Weather uses ten named forecast points. Mandeville is inland; its marine output is explicitly labelled as a separate south-coast offshore grid. Model data is not a beach inspection.
