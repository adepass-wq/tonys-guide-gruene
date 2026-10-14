# Jamaica release branch

This branch is a release-isolation checkpoint for Tony's Guide Jamaica, created from the October 14, 2026 main branch. It is NOT yet a standalone repository or live deployment source.

## Current production configuration
- Render service: `tonys-guide-jamaica` (`srv-db65ugt9fdbs73eu8rug`)
- Production branch currently: `main`
- Production repository currently: `adepass-wq/tonys-guide-gruene`
- Current build: `mkdir -p public && cp jamaica/index.html public/index.html`
- Deploy only after independent checks and updating the Render service's branch/repository configuration.

## Isolation requirements before cutover
1. Verify `jamaica/index.html` references only inline code or assets packaged into the release. Current build copies only `index.html`; relative assets would otherwise be missing.
2. Establish a Jamaica-owned repository (preferred) and independent deploy configuration, or point Jamaica Render to this separately maintained branch as an interim measure.
3. Create a shared versioned design-system package; consume pinned releases rather than deploying from Gruene's site output.
4. Build in clean workspace, scan HTML and asset references, run behavior and browser/mobile tests, and validate sitemap, canonical URL and links.
5. Keep `jamaica.tonysguide.com` on the proven production service until the replacement passes smoke tests and rollback plan is ready.
6. Verify live Render deploy status, domain/TLS, assets and key user journeys after cutover.
7. Keep Gruene's static service and events services on their existing release paths.

This branch deliberately does not trigger or change production Render services.