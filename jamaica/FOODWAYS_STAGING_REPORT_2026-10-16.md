# Jamaican Foodways: staging report

16 October 2026. Repository: `adepass-wq/tonys-guide-gruene`. Branch: `staging/jamaica-foodways-2026-10-15`. Existing draft PR: #1. **STAGING ONLY. NO MERGE OR PRODUCTION DEPLOYMENT.**

## Accomplishments and actual evidence state

All 107 archived entry records now have an individual documentary decision, an inspected source or explicitly failed research lead, a variation/defect note, and separate formula, kitchen-test and origin statuses. This completes an entry-by-entry documentary review of the specified inventory. It does **not** complete authentication or kitchen validation of 107 original formulas.

| Documentary outcome | Entry records |
|---|---:|
| Published preparation located | 70 |
| Attributed contemporary variation | 19 |
| Dish or product documented; formula not authenticated | 9 |
| Related preparation only | 7 |
| Authentication outstanding | 2 |
| Total, including aliases and combinations | 107 |

The 89 published-preparation/variation records include duplicate names, serving combinations and imperfect published sources. They must not be advertised as 89 unique, fully authenticated or tested recipes. The 18 other records remain plainly distinguished. Two unresolved records concern crayfish rundown and June-plum chutney. Further checks located cookbook-index evidence for cook-down ackee and callaloo (Original Flava, p. 142) and garlic-butter lobster (p. 129), and a Grace guava-jam product page. These support named preparations/products, not their complete home formulas; the full cookbook pages were not inspected. A failed or insufficient search is not proof of nonexistence.

**Original archived Tony’s Guide formulas authenticated: 0. Tony’s Guide kitchen trials: 0.** The earlier measured drafts remain archived and are excluded from the shipped HTML and runtime data. Their original twelve-record JavaScript data block was preserved in `research/foodways-original-twelve.json`; the other 95 remain in their original tracked JSON collections.

Five new source transcriptions retain published measurements with paraphrased instructions. Three are displayed: Grace Foods’ ackee and saltfish, canned-bean rice and peas, and coconut drops. Each is labelled documented and untested, links to its actual source, and states missing source detail. Two transcriptions are withheld from the cooking display because of unresolved source quantities or directions: oats porridge and gungo-peas soup. These are new source records, not certification of the old editorial drafts.

## Research, attribution and rejected evidence

The structured ledger records 117 retrieved-source attempts: 113 pages returned readable material and four failed. Of the 100 distinct sources linked to entry decisions, 99 were read; the remaining one is the failed Gleaner candidate explicitly attached to an unresolved record. The source ledger is bounded; additional search results and historical/safety references are described separately rather than included in these counts. A page read is not a claim that every external video played or that the publisher’s recipe has been independently tested.

Sources include Grace Foods; Joan Lue; Noel Cunningham; Sian Rose; Grace “Grandma” Reynolds; Winsome and Xavier Murphy; Lesa at Jamaican Foods and Recipes; Charla; Original Flava; Tanya Harris; Jamaica Tourist Board; Jamaica’s Scientific Research Council; and Jamaican tea producer Tops. Publisher identity is retained where no individual cook is identified. Corporate recipe pages are contemporary commercial sources, not historical proof.

The [107-entry register](FOODWAYS_ENTRY_REGISTER_2026-10-16.md) gives every entry, source link, disposition and limitation. `src/data/foodways-authentication.json` is the machine-readable ledger, with source metadata, access dates, brief locators, original-formula fingerprints and five separately identified source transcriptions.

Examples of corrections supported by inspected evidence:

- Joan Lue explicitly identifies stamp and go as saltfish fritters. Bammy/cassava bammy and fried dumplings/Johnny cakes are also linked as overlapping records.
- Coconut drops is documented; a distinct inherited “breakfast variation” is not established by the inspected source.
- Charla’s linked cou-cou formula is explicitly Trinidadian and distinguishes Jamaican turn cornmeal. It is comparative evidence, not a Jamaican formula.
- Lesa labels coconut prawns as rundown-inspired and chickpea curry as Jamaican/Indian fusion. Those descriptions remain visible.
- A candidate coco-bread submission used cocoa powder in a loaf. It was rejected for folded coco bread in favour of Tanya Harris’s attributed preparation.
- Grace’s gizzada source lacks a quantified coconut filling. Its ackee-and-corned-pork method mentions unlisted aromatics. Noel Cunningham’s peanut porridge lists vanilla twice. These defects were recorded instead of silently repaired.
- A stew roundup’s incorrect indenture chronology and bean equivalence were rejected as historical evidence.
- The prior NLJ attribution for Ital practice could not be substantiated and was removed. Contemporary Ital sources remain attributed interpretations, not a survey of Rastafari belief.

The historical work retains twenty introductions/reading notes and now attaches evidence scopes to the twelve shorter notes. It distinguishes an actually inspected contemporary recipe, an accessible scholarly argument, a publisher’s book description and a full-text historical proof. Edwards, Plummer and McKenzie’s 2026 work and Slocum’s 2024 study support bounded provision-ground discussions. NLJ’s named sections support limited migration and cassava context. Higman’s publisher description and contents were checked, not the whole book page by page. No full archival authentication or new oral-history interviews were completed.

## Implemented experience

- Static source-attributed dish cards, so the directory exists in built HTML and is not dependent on client-side recipe generation.
- Search by dish, source/cook and explanatory keywords; category and evidence filters; combined-filter empty state; live result count; reset with focus recovery; direct-entry navigation and overlapping-record links.
- Three expandable documented preparations and visibly qualified external preparation links for the wider collection.
- Four visual reading paths, a variation-comparison section, and practical links to Boston Bay, Middle Quarters and Little Ochie through existing maps and trip-saving records.
- Native disclosure controls, explicit form labels, focus outlines, narrow-screen grid rules, reduced-motion handling and link safety attributes.
- Preservation of the existing food directory, route anchors, historical articles, analytics module and site SEO metadata. No new third-party photographs were copied; permissioned culinary photography is still needed.

## Verification

Final checks are being recorded below. A build is not a deployment, a DOM check is not graphical browser inspection, and recipe-source retrieval is not kitchen testing.

- Build and static validator: passed during implementation; final coordinated release check in progress.
- Foodways record and behaviour tests: initial focused checks passed; final checks follow the final build.
- Full website regression suite: in progress.
- Pinned platform tests: 2 passed. Preservation check: 718 protected files pass after reviewing the three authorized Foodways integration baselines. The baseline-change record lists their prior/reviewed hashes and reasons. All other baseline hashes were retained.
- Visual desktop/mobile preview: blocked. `sites-preview start` failed with `bwrap: Can't mount proc on /newroot/proc: Operation not permitted`. No desktop/mobile screenshots or graphical browser results are claimed.
- Screen reader, actual touch interaction, external video/audio playback and real-device rendering: not independently verified.
- Production: no merge, hosting change or deployment performed.

## Publication readiness and recommended next action

**Keep PR #1 draft and unmerged.** The staging resource is materially developed, but it is not a completed, publication-ready 107-recipe cookbook or an exhaustively authenticated scholarly foodways reference.

The remaining gates are a functioning browser preview and desktop/mobile/keyboard/assistive-technology inspection; full page-level verification of contested historical assertions; resolution of the identified source defects and remaining provenance gaps; independent corroboration where only one cook/publication has been examined; appropriate food-safety review; permissioned photography; and recorded kitchen trials before any claim of tested local recipes. No parish-wide tradition should be inferred from one cook’s memory.

Use the register to obtain exact cookbook pages and named-cook clarification, then select preparations for controlled kitchen trials. Broader Caribbean dishes should remain comparisons unless Jamaican usage is established. Current source labels should remain even after a later production release is authorized.
