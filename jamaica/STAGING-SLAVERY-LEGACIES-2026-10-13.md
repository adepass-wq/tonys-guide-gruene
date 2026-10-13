# Tony’s Guide Jamaica — 14-parish slavery-legacies staging batch

Date: 13 October 2026. **Staged only; not published.**

Base: latest 97-article staging commit `9cda33ced61cb48117a0dc07da641aa084a49fa9`, including the St. Thomas/Clarendon articles and local-event desk. This batch adds exactly one dedicated article for each parish, yielding 111 articles. Existing live/main remains outside this release.

## Added articles

| Parish | Article | Dedicated articles now |
| --- | --- | --- |
| Kingston | Hibbert House: the slave trade behind a Kingston landmark (`legacy-hibbert`) | 4 |
| St. Andrew | Hope Aqueduct: water carried into the slavery economy (`legacy-hope`) | 4 |
| St. Thomas | Bath Fountain: remembering Jacob beyond the discovery story (`legacy-bath-jacob`) | 7 |
| Portland | Kromanti in Moore Town: a living inheritance of resistance (`legacy-kromanti`) | 4 |
| St. Mary | Daddy Rock, Woodside: bringing enslaved ancestors back into view (`legacy-daddy-rock`) | 9 |
| St. Ann | Drax Hall: the waterwheel and the workers’ household (`legacy-drax`) | 7 |
| Trelawny | Orange Valley hospital: care inside a coercive estate (`legacy-orange-valley`) | 4 |
| St. James | Salter’s Hill: a church built by enslaved Africans (`legacy-salters`) | 4 |
| Hanover | Tryall’s waterwheel: the work behind an estate landmark (`legacy-tryall`) | 5 |
| Westmoreland | Ackendown: a castle inscription and the people it leaves unnamed (`legacy-ackendown`) | 4 |
| St. Elizabeth | Munro’s bequest: slavery wealth carried into education (`legacy-munro`) | 4 |
| Manchester | Fairfield: a mission inherited from the plantation world (`legacy-fairfield`) | 6 |
| Clarendon | Suttons: the plantation name and the memory of resistance (`legacy-suttons`) | 7 |
| St. Catherine | Hellshire’s refuge landscape: escape and the cost of control (`legacy-hellshire`) | 5 |

There are 74 strictly single-parish articles in this inventory; shared/regional and islandwide articles are not counted towards individual parish totals. The fifteen-articles-per-parish programme remains incomplete. The 210 subjects remain an editorial programme; these additions are staged first drafts.

## Integration and performance

- New 14-parish collection in History & Culture, linked from its quick navigation.
- Two seven-article learning pathways: buildings/records/wealth and community/resistance/memory.
- Reciprocal local article links, generated full-text search and parish-library counts.
- Each new article includes roughly 560–625 words of narrative, relevant visual material, a learning exercise, sources tied to claims and access guidance.
- Eight new JNHT source photographs were downloaded and visually inspected. One existing attributed Moore Town image is reused. Five original SVG reading aids are explicitly labelled as editorial diagrams, not historical reconstructions.
- Incorrect image identities were rejected: Woodside’s Taíno carving is not Daddy Rock, Tryall’s house is not its wheel, and the JNHT banner is not Hibbert House.
- Search and learning share one generated article-index JSON block. The 3.5 MB HTML limit remains enforced; it was not increased to accommodate content.
- Original image bytes remain content-hashed reusable assets. No new automatic audio/video download or playback was introduced. The Kromanti article connects to the existing catalogue-identified Moore Town listening story.

## Verification

Final results and build identity are recorded below after release checks. DOM journeys test parish/topic discovery, exclusive article display, saving notes, marking read, pathway neighbours and return to the collection for every new article. Existing navigation, media-control simulations, activities, multiple-parish tools, event desk, weather failure handling and planners retain their checks.

Source HTTP review: 39 unique requests; 34 returned HTTP 200. Google Books was rate-limited, two Gleaner direct requests timed out after successful web retrieval, and two publisher requests blocked automated access. Hellshire’s second link was replaced with the open UCL accepted manuscript. HTTP availability is not proof of historical accuracy or public reproduction rights.

## Outstanding before publication

- Eight newly incorporated JNHT photographs have no established open licence or permission grant. Their source, actual locality and date/maker limitations are attached; resolve public reproduction rights or replace them before publication. The existing reused JNHT image also retains its prior rights limitation.
- The NLJ Orange Valley photograph explicitly requires permission. It is linked to the archive, not reproduced in this batch.
- No real browser was available through the supported preview workflow. Desktop/mobile layout, real playback and audible verification have not been performed. DOM tests are not substitutes.
- Current site access, staffing, tours and accessible routes are not established by historical web descriptions; the articles request local confirmation rather than inventing bookable services.
- Some short heritage sources contain ambiguous dates or unsupported genealogy. Those details are qualified or omitted; specific unresolved construction/fire chronology is stated in the relevant article.

Content and navigation integration are ready for review. Public release still requires the image-rights decisions and desktop/mobile visual review. No deployment or main-branch update is authorised by this staging task.

## Final check results

- `npm run release:prepare`: 43/43 tests passed, including the new all-parish reader journeys.
- A final grammar-only source correction was rebuilt and checked for stale output, IDs, scripts, citations and images.
- `git diff --check` passed.
- Generated HTML: 2,919,015 bytes; gzip estimate 755,317 bytes.
- SHA256: `080c2e0390b72a6b55c727858d227f3661e1f54ae84475bfba3d167aa56c38cf`.
- Static image inventory: 80 unique content-hashed assets.
- No desktop/mobile visual or audible verification is claimed.
