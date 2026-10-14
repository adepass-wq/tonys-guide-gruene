# Gruene event API disposition — 2026-10-14

## Verified
- Public events route: https://gruene.tonysguide.com/events (accessible to the public web reader); initial HTML displays "Loading live event sources…" and event filters. Browser-rendered requests not captured.
- Render service `srv-dasl0pgu01pc73ce45r0` (`tonys-guide-gruene-events-live`): latest deployment reported `live`, commit `af57b994c8092fb1aa50aa704dc6b1435b364d78`.
- Render service `srv-dasl0f7pn0mc738skga0` (`tonys-guide-gruene-events`): only listed deployment `dep-dasl0fnpn0mc738skia0` failed its first build on 2026-09-27; event history confirms nonzero build exit 1.
- Render request logs checked across 2026-10-07 to 2026-10-14 yielded no records in the queried window for either service. This does not demonstrate zero traffic.

## Not verified
- Which endpoint the browser's JavaScript actually calls, including proxy/CDN paths and configuration variables.
- Whether event requests succeed and cards render after JS hydration.
- API response schema, event freshness, expiration behavior, CORS, latency and data-source resilience.

## Gate before disabling any service
1. Obtain rendered browser network trace from https://gruene.tonysguide.com/events and identify the exact API URL, status, and response payload.
2. Search all deployed JS/HTML and hosting environment variables for both Render hostnames and any reverse-proxy references.
3. Validate live event cards for today, this weekend, expired dates, and venue/source links.
4. Confirm service metrics and records in an appropriately selected time window.
5. Only after proving no active dependency, mark older failed service as retired; preserve configuration and rollback information before deletion.

**Action: no deletion, DNS change, endpoint change, or redeployment is authorized by this record.**
