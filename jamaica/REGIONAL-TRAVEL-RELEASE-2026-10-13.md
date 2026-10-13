# Jamaica regional travel release — 13 October 2026

## Implemented
- Eight destination regions, reached through Regions in the main navigation. Earlier corridor URLs and parish history controls remain supported.
- Multiple-region selections in activities, food, place guides, events, comparison and the personal timetable. Multiple parish selections narrow those results. Counts update immediately; explicit result buttons reveal matches.
- Regional handoffs clear incompatible filters; resets recover the complete inventory. Timetable and comparison options retain valid choices and clear excluded ones.
- Suggested half-day, full-day, two-day and weekend choices for every base region. These are editorial recommendations, not measured driving itineraries. The personal timetable supports several regions.
- 14 added place guides (including two food stops): 100 place records total. 90 history/culture articles remain. The fifteen-articles-per-parish programme is not complete.
- Three new dated listings (17 records total, including historical/expired records automatically hidden) and four recurring/next-date programme leads (15 total). No future festival dates inferred from past editions.
- Existing documentary photographs reused in five new guides with original location/date captions and source credits. No new image assets: 67 content-hashed assets remain.

## Evidence and verification
Source review and exclusions are recorded in src/data/regional-travel-research.json. It distinguishes confirmed dates, recurring schedules, unresolved next dates, editorial recommendations and time estimates. Conflicting Mommy & Me and Jazz calendar descriptions were excluded. Tech Beach is assigned to Hanover using the Princess hotel's actual Green Island location.

Final release preparation passed script/data/source/ID validation and all 38 automated tests, including four regional journey tests. Tests cover region union, parish intersection, handoffs, search, reset, comparison, excluded timetable choices, saving plans and restoring a shortlist.

Checked HTML: 3,208,561 bytes; SHA256 fc90c5d042123349724f5ebe698af1e190853530ee97e7ab10b35401cfbc443a.

## Limits and next work
Browser access was unavailable: desktop/mobile appearance, actual external playback and physical accessibility were not visually or audibly verified. Source-page checks are not telephone or on-site confirmation. Existing media reproduction caveats remain in the prior audit.

Coverage is not exhaustive or equally deep across regions. St. Thomas, Clarendon and regional local calendars need further sourced expansion. This release completes the regional discovery layer; it does not complete the national editorial programme.

