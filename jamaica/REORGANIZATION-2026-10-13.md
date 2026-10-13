# Tony’s Guide Jamaica — regional experience reorganization

13 October 2026. Built from the published 111-article release `eab642a29447526b3d728b4a52e8182fe472e9d6`.

## What changed

- Six main navigation choices: Home, Regions, Things to do, History & culture, Plan and Search. Food, events, the complete place directory and cruise information remain directly accessible through the Things to do menu. Other Tony’s Guide editions and specialist resources remain in the footer.
- Homepage access to all eight regions, with a separate learning entrance and smaller contextual previews.
- Shared, persisted regional context across activities, food, events, place guides, history, comparisons and timetable choices. Multiple regions and parishes remain supported. Local branch options reflect the selected regions. Search explicitly distinguishes all-Jamaica and selected-region results.
- Regional hubs have consistent Overview, Activities, Food, Events, History & culture and Plan tabs. Regional learning previews derive from the article inventory. Complete collections remain reachable from the previews.
- History has six clear entrances. The 14-parish slavery collection and the full set of 17 learning pathways remain accessible in named expandable collections.
- Plan contains saved trips, saved reading/notes, comparison, the personal timetable, budget, preparation and cruise-return tools. Original tool, article and reading anchors remain usable. Existing storage keys are preserved.
- Mobile quick navigation: Home, Regions, Search, Learn and Plan. Compact region selectors and persistent result feedback reduce repeated choice panels.
- Conditions follow the first selected region using a named point. Morant Bay, Black River and Mandeville supplement the existing seven locations. Mandeville’s marine display explicitly identifies a separate south-coast offshore grid.
- Dated events precede recurring programmes. Parish contacts sit in an expandable local-programme desk; visitor-facing future-event editing instructions were rewritten as accurate confirmation notes.
- Repaired five missing programme destinations and initial links to runtime-generated programme/learning destinations. A direct programme record outside filters is identified without inventing an event date.
- Removed repeated event-listener registration during event rendering. Timetable exclusions retain their warning; importing saved places clears incompatible comparison refinements.

## Preserved content and hosting

111 articles, 100 place records, eight regions, 17 learning pathways and all 80 content-hashed hosted image assets remain. Existing media credits and global media-stop behavior remain. The fifteen-articles-per-parish programme is still incomplete. The same repository, Render service, domain and public audience are retained.

## Verification

`npm run release:prepare`: 49 tests passed, zero failures. Checks include generated-output freshness, syntax, IDs, source/image inventories and citation targets. Added journeys cover all regional tabs without duplicate runtime IDs; regional continuity; scope reset and multi-region selection; saved trips/reading under feed failure; imports; explicit scoped search; programme destinations outside date windows; and fresh initial deep links. Existing planner, events, media-control simulations, search aliases and all-parish article journeys passed. `git diff --check` passed.

Independent provider requests returned HTTP 200 with ten current-data entries from both Open-Meteo forecast and marine endpoints. This verifies response availability, not conditions on an actual beach. Deployment and public-file verification are reported after release.

## Limits

No supported real browser was available. Desktop/mobile rendered layout and audible playback were not independently checked. Automated DOM checks do not establish visual usability. Existing photograph reproduction-rights limitations remain; this reorganization does not establish new permissions.

Generated HTML: 2,947,033 bytes; gzip estimate 762,235 bytes. SHA256 `9728c0ab571355b8c4b17cb7876a32faf04c0b78226d52f30a300e8e47f65f64`. The existing 3.5 MB HTML budget remains enforced.
