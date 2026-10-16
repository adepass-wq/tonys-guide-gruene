# Jamaican Foodways publication gate — updated 2026-10-15

**Staging only. Do not merge or publish yet.**

## Source completeness verified
- 107 distinct named recipe drafts with measured ingredient lists, servings, and at least four numbered steps.
- All 94 previously research-only titles are now represented in the recipe collections, alongside the original 13 additional titles. None should display as a research-only unfinished entry.
- 20 history essays, including eight dedicated to slavery, Indigenous food histories, indenture, immigration, Maroon foodways and Rastafari, plus a separately maintained article evidence crosswalk in `src/data/foodways-source-ledger.json`.
- A staging-only GitHub Actions workflow builds the modular source and runs validation and jsdom smoke tests. Successful execution must be checked from the latest workflow run, not assumed from the workflow file's existence.

## Still blocked
1. **Kitchen validation:** all recipes are editorial formulations; do not claim they have been prepared and tasted. Independently kitchen-test weights, yields, times, safety, texture and ingredient substitutions, prioritizing cassava, ackee, meat temperatures, dried beans, preservation and allergen-sensitive drinks.
2. **History scholarship:** existing sourced syntheses are not equivalent to exhaustively footnoted academic articles. Add page citations, archive references and additional independent evidence for each contested dish-origin claim.
3. **Photography:** no new third-party recipe photographs were included without verified rights; licensing and captions remain unfinished.
4. **Build artifact:** built HTML generated in CI is not automatically committed to `jamaica/index.html`; existing repository verification workflow therefore can fail on a stale generated file. Regenerate and commit built output and static assets before merge, then confirm both repository workflow and staging smoke tests pass for that precise commit.
5. **Human/browser checks:** independently inspect mobile, desktop, keyboard navigation, screen-reader labels, links, recipe filters and video/photo availability. Automated jsdom checks do not substitute for graphical browser testing.

## Evidence audit
- Source recipes counted and checked via GitHub file retrieval in this work session: 107 unique, all with multi-step instructions.
- Scholarly starting references: Higman (2008), UWI Press catalogue; Leah Slocum (2024), *Slavery & Abolition*, DOI 10.1080/0144039X.2024.2358537; National Library of Jamaica Indian immigration history notes.
- Source crosswalk explicitly distinguishes source-supported broad historical claims from unverified recipe-specific attributions.
