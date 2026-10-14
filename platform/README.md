# Tony’s Guide platform v1.0.0

Shared, locally bundled search primitives, calendar-day engine and semantic design tokens. Each edition retains its own content, ranking and aliases, planner choices, URLs, metadata, data feeds, analytics and publishing identity. Existing React/Worker and static build systems are supported through separate adapters.

`v1/manifest.json` hashes every immutable shared module. `platform.lock.json` pins that manifest and maps edition adapters. `release.py sync` generates local bundles; `release.py check` rejects stale output, changed platform modules, and accidental edits to protected content/SEO/media. Run the edition’s RELEASE.md workflow; the platform tests supplement, not replace, its behavioral checks.

Platform upgrades require a new version directory, reviewed module diff, updated lock, edition tests, a verified backup and an independent edition release. A push to one edition never deploys another. Do not share unpinned production scripts or global mutable content indexes.

`network-monitor.py` is a read-only five-domain publication check; run it explicitly and keep its JSON evidence. It does not certify mobile behavior or analytics receipt. `new-edition-template.py` creates an unpublished source scaffold only; it never registers hosting or changes DNS. No recurring monitoring job has been scheduled.

Pre-migration source commits, saved host versions and dated Dropbox archives provide recovery. Roll back only the affected edition to its known saved version/source; preserve its project and custom domain. Verify canonical URLs, content and assets after rollback. Baseline updates are deliberate content releases, not a way to silence a failed migration check.
