# Jamaican Foodways release gate (2026-10-15)

Status: **not cleared for release**. This is a working checklist, not a declaration of completion.

## Editorial inventory

- 44 distinct editorial recipe drafts with measured ingredients, yields and at least four numbered method steps; these are not kitchen-tested.
- 63 research-only dish entries remain to be drafted. The existing 94-entry research source preserves source-provenance; display code excludes recipes already promoted into drafts.
- 20 introductory/history essays, including 8 focused on slavery, migration, Indigenous cooking, Maroon foodways and Rastafari. The history narratives require more claim-level source verification and image sourcing before publication.

## Required checks before publication

1. Develop 56 or more additional distinct complete editorial recipes to meet a 100-recipe threshold (ideally finish all 63); check ingredients, quantities, cooking steps, timing, yields, allergens and relevant safety warnings individually.
2. Kitchen-test each recipe separately or explicitly label every untested recipe. Kitchen-testing cannot be inferred from a static build.
3. Add claim-level citations and a source ledger for the history articles. Verify accounts of provision grounds, post-emancipation land access, migration, culinary techniques and the evolution of specific dishes without equating ingredient history to modern recipe history.
4. Source appropriately licensed photographs with creator, licence, location and download date. Do not embed or hotlink images without reliable rights evidence.
5. Regenerate jamaica/index.html and static assets with the repository build process. Do not manually patch the generated output.
6. Run npm run verify, page navigation and JavaScript checks, mobile and keyboard tests, screenreader semantics, and recipe links. Confirm deployment output matches source commit.
7. Preserve draft PR status until the above gates are verified; avoid touching production, DNS, URLs and analytics.

## Verification completed this turn

- Fetched current recipe collections directly from GitHub and parsed them.
- Confirmed 44 unique recipe drafts, each containing ingredients, yield and four or more steps.
- Confirmed 63 names remain in the research-only inventory.
- Confirmed modular template references the new recipe JSON.
- Updated structural test assertions. The tests were not executed.
