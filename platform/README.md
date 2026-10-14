# Tony's Guide five-edition migration gate (staging only)

## Production guarantee
Do not modify production DNS, Render build source, Search Console verification, GA4 tags, published URLs, or live content from this branch. Staging files must be verified before any release.

## Inventory
`destinations.json` records the five currently intended canonical hosts. For now only the Jamaica and Gruene Render services are visible in the connected workspace; source and hosting for Center Hill Lake, Mentone and Bryson City require identification.

## Baseline capture (read-only)
1. Run `python platform/capture_identity.py platform/urls.seed.txt baseline.seed.json` to probe the five homepages. A failure is a blocker, not evidence of an offline site; investigate DNS, bot protection and connectivity.
2. For *each* host, inspect `robots.txt`, find validated XML sitemaps, and expand the URL file to every existing indexable URL, including deep routes and articles. Preserve trailing-slash distinctions. Do not treat the five-homepage seed as a comprehensive inventory.
3. Re-run `python platform/capture_identity.py urls.approved.txt baseline.approved.json`. Review redirects and errors manually. Preserve the approved baseline outside the repository and make an off-platform backup.
4. Before cutover, collect candidate output and run `python platform/verify_identity.py baseline.approved.json candidate.json`. Any nonzero exit prevents cutover.
5. Independently verify canonical redirects, internal links, hero/media loading, schema validity, mobile interaction, accessibility, route navigation, current-condition feeds, event expiry, GA4 hits, and Search Console ownership.
6. Verify the production domain after switch and retain rollback capacity. Record commit, deploy ID, timestamp and actual test results.

## Known limitations
- The parser checks HTML metadata, JSON-LD and GA4 measurement IDs present in HTML. It cannot guarantee GA4 execution, tag-manager state, live JSON-LD injected in JavaScript, or analytics property access.
- The comparison checks *identity*, not correctness, freshness, semantic differences, accessibility or performance.
- Inaccessible or JavaScript-only pages need real browser inspection.
- Shared styling tokens are opt-in; no destination imports them from this branch.
- A Git branch is **not** a complete backup of hosting, DNS, data feeds, images or third-party content.
