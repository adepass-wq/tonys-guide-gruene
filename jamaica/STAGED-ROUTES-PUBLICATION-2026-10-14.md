# Staged thematic routes publication

Integrates the approved Jamaica-Routes-Staged-Review.html package into the maintained source: 20 routes, two collections of ten, 80 stop entries, all eight travel regions. Preserves ordered stops, transport and access guidance, source links, Google Maps links, photographic credits, safety and agreed-price guidance. Homepage, History, Regions, Plan and navigation title now say twenty routes.

Reviewed route fragments live in src/routes, ordered by src/data/thematic-routes.json and included by scripts/thematic-routes.cjs. The regular builder extracts original embedded photographs into content-hashed public/assets files. Existing unrelated articles, media and site tools remain in their current source modules.

Verification: run release:prepare for build, structure and full behavior checks, including collection filters, all route destinations, 80 stop map links and safety/photo-credit presence. Browser preview listener launches; cloud browser cannot reach localhost (ERR_CONNECTION_REFUSED). Verify the deployed route flow in the public browser and exact live HTML after deployment. Browser evidence does not establish today's road conditions, venue access or every external media source.
