# Jamaica independent release

Production remains the existing Render service and jamaica.tonysguide.com, now on the isolated `jamaica-production-migration-2026-10-14` branch. Build command is `npm run release:prepare`, publish directory `public`. This command synchronizes pinned shared primitives and design tokens, rebuilds the original source, runs all behavior and preservation checks, then copies the checked HTML into public/.

Content remains in jamaica/src/. Search ranking, Jamaica aliases, history, routes and visitor choices remain edition-specific. Edit shared-module adapters in platform/adapters/, not the generated search-engine or first CSS bundle. Navigation remains an edition source module. Original image bytes and credits are preserved.

Run the full release command before pushing, then allow one automatic Render deployment. Confirm its commit and live status, run `npm run verify:live`, compare all original image bytes and check changed visitor flows on the custom domain. Browser rendering and third-party playback limits must be reported separately from automated passes.

Rollback pointers are recorded in the dated Dropbox verification record: prior main commit 21d0c00a63b83d7c5e0a6180a81111384c92825c, original copy build command and existing domain/service. Retain the verified Git mirror archive. No other edition is released from this branch.
