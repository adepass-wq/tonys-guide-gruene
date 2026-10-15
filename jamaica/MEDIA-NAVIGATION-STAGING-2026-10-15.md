# Jamaica story imagery and culture navigation

Status: staged source; no production deployment requested or performed.
Base: production migration branch at e54f761, which includes current main at 21d0c00.

## Editorial changes

- Move the credited February 2009 Negril sound-system photograph out of the 1914/1921 introduction and into its own equipment-and-labour discussion. Preserve dates, locality, licence and the existing source links.
- Move the 1891 Linstead Market photograph beside the market-song discussion and select it as the culture article's directory cover.
- Remove the generic 2023 fishing-boat photographs from court and free-village stories. The court article now links directly to the National Library's MS 273 catalogue description; the Maidstone section uses the existing credited Maidstone photograph.
- Derive all history-directory images and image context from their actual article figures. Remove the independent thumbnail list that supplied unrelated or obsolete substitutions. Prefer expressly selected house/dwelling images for great-house, housing and architecture articles. Use the same selection in learning pathways and regional features.

## Navigation changes

- Add twelve visible collection entrances ahead of the long essay lists: national history, History Reconsidered, parishes, slavery's legacies, everyday life, music, language, storytelling, objects, learning, film and sources.
- Add shared collection navigation on the homepage and music, language, storytelling and film portals.
- Expand the history/culture header menu. Give every article links back to collections and article discovery, and put the article outline near its beginning.
- Keep existing routes, inventories, media files and recorded access distinctions. Update only thirteen protected-baseline hashes corresponding to authorized editorial source changes; pinned shared platform modules remain unchanged.

## Review scope and limits

Visually inspected contact sheets of 107 locally embedded article cover images. Inspected source structure, figure captions and placement for the confirmed mismatches. This is not independent revalidation of every historical claim, every external image or every recording. Existing archival claims and source metadata are retained; no synthetic historical imagery or recordings are introduced.

Source validation and behavior results are recorded with the final staging commit. Browser rendering, responsive appearance and external media playback have not been verified in this session because the supported browser-control skill is unavailable. Production remains unchanged. Review desktop/mobile presentation and source-specific playback before publication.

## Verified staging results

- `npm run build` and `npm run check`: pass; 153 articles, 602 source modules, 177 unique static image assets. Syntax, JSON, article inventory, unique IDs, citation destinations, image descriptions and stale-output checks passed.
- Full regression run: `node --test --test-concurrency=6 jamaica/tests/*.test.cjs`: 80/81 passed. The single failure was an obsolete requirement for multimedia in every article, which rejected the deliberately removed court-story photograph. The revised assertion requires its in-prose National Library source card, MS 273 identity and absence of a substitute photograph.
- `node --test --test-name-pattern='sensory history keeps evidence' jamaica/tests/site.test.cjs`: 1/1 passed after the test-only correction. No website source changed after the full regression run.
- Focused media/navigation run: 5/5 passed. Shared platform tests: 2/2 passed. Protected content-baseline and pinned-platform checks passed.
- Generated HTML and deployable homepage have identical SHA256: `9a1774dd4034ed0038d6a79cdecf39b79b56faa8de693d43a14ed1b96df3a691`.
- All staged source blobs and generated output were compared to local Git object hashes. The initial remote staging tree matched the local tree exactly: `8b7534893b227969c5e6f59dc024986899aa69cb`.
- Branch: `staging/jamaica-media-navigation-2026-10-15`. No production branch or deployment was updated. This is a source staging branch, not a hosted visual preview.

Recommended next action: inspect the staged desktop/mobile layouts and source-specific media playback before authorizing publication.
