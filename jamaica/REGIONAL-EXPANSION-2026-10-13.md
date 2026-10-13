# Homepage and regional visitor expansion — 13 October 2026

Removed the sticky “Exploring all Jamaica” section from outside the page views. A direct Explore regions button now sits in the homepage hero. The multi-region picker remains available as a normal-flow disclosure within Regions; existing saved regional context and the section-level filters are preserved.

Added 40 complete practical place guides: 34 food stops and six activities. The shared inventory now contains 140 place guides and 71 food stops. New guides use the same named reading destinations, save controls, search, parish/region selectors, comparisons and personal timetable as the existing collection.

| Region | Place guides | Food stops |
| --- | ---: | ---: |
| Ocho Rios, St. Ann & St. Mary | 65 | 32 |
| Montego Bay, Falmouth & Trelawny | 13 | 4 |
| Negril, Hanover & Western Jamaica | 17 | 11 |
| Port Antonio & Portland | 10 | 4 |
| Kingston & Blue Mountains | 13 | 6 |
| St. Thomas & Southeast | 6 | 3 |
| South Coast & St. Elizabeth | 10 | 5 |
| Central Jamaica & Interior | 9 | 7 |

Counts overlap where a place belongs to more than one travel region. They are not eight mutually exclusive parish totals.

Western food is divided among Negril’s beach strip, West End, town and Green Island/Hanover. Separate venues on the same property remain separately described. Central and eastern additions include exact Juici branches, Murray’s separate locations, HotSpot Mandeville, Angola in Old Pera, Bushbar, Blue Brews Holywell and other named options. Kingston adds downtown Gloria’s Seafood City, Irish Town Café Blue and Devon House I-Scream. None is represented as personally visited or sampled.

Six outings add western countryside/community riding, Half Moon Beach, Boston Beach, Trench Town Culture Yard, Hope Gardens and Holland Bamboo. Roaring River Park is not equated with RastaSafari; closed western attractions and uncertain operations were omitted. The older Pelican Grill domain serves unrelated content, so the new guide uses the related hotel’s restaurant page. Hope Gardens in Tennessee and the overseas Jamaica Blue chain were excluded as wrong-place results.

Added a regional visitor-resource desk in Plan. Its 27 external records comprise 11 regional contacts/resources and 16 existing islandwide essentials. Search, category and region controls reveal results; national essentials are grouped in a disclosure that opens for relevant queries and direct links. Resources follow multiple selected regions, and explicit links pin an otherwise filtered record. Source cards also appear in global search. Medical entries are official facility directories, not booked activities or current clinical-service guarantees.

Named meals were added to the existing full-day/two-day plans. Regional and homepage food previews vary local branches rather than showing only the first venues in one area. The homepage date label identifies the selected regional scope. The eight-region structure, 111 history articles, historical media and saved trip/learning keys are preserved; no new raster assets were added.

## Evidence and limitations

Primary operator, JTB and regional-authority records are retained in `src/data/regional-expansion-evidence-2026-10-13.json`. Dates and durations are differentiated: published operator hours are labelled; visit durations are editorial estimates; current prices, access and service require confirmation. Some source pages include older material, and no live booking or phone confirmation occurred.

A supported browser-control plugin is unavailable in this environment. Desktop/mobile rendering was not visually inspected; automated DOM journeys do not establish aesthetic quality. Direct HTTP checks retrieved 12 candidate source pages; 29 requests failed at transport. These are not findings of business closure. Web-service research independently supplied operator/authority content.

Focused journeys passed for the relocated hero/region entrance, combined selection, western food branch/parish filtering, saving/comparing, regional resources, empty/direct-link recovery, global resource search and real meals in regional plans. Final publication requires the full release pipeline and matching live-page delivery check. The fifteen-articles-per-parish programme remains incomplete.

The generated HTML is 3,214,395 bytes (815,579 bytes in the local gzip estimate), within the existing 3.5 MB budget. The 155 hosted raster assets are unchanged. Old regression assumptions about an empty Clarendon inventory and only two Juici branches were replaced with checks of an actually empty region/parish intersection and the current named-branch inventory. Border remains specifically asserted and every returned parish-search result is checked for St. Elizabeth membership.

Final `npm run release:prepare` passed all 56 tests with zero failures, plus build freshness, source/citation/ID checks and `git diff --check`.
