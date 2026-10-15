# Jamaica event collection

Collect from published organisational sources. Do not solicit or accept individual submissions. Discovery does not imply independent confirmation of event operation, tickets or attendance.

## Collection sources

- JCDC events and publications: https://jcdc.gov.jm/events and https://www.jcdc.gov.jm/publications . Check all parish schedules; verify the year inside PDFs. The existing local-event-sources.json maps desks to all 14 parishes. Desk contacts are not event records.
- Jamaica Tourism Board: https://www.visitjamaica.com/experiences/events/events-calendar/ . Broader discovery, including local and regional events.
- Touchstone Link: https://touchstonelink.com/events/list/ . Organiser ticket pages for community, school, worship, food and music programmes; inspect individual pages, not only the search snippet.
- Running Events Jamaica: https://www.runningeventsja.com/ . Runs and walks; obtain the race venue and participation details before adding a dated record.
- Venue calendars: https://jamaicafoodanddrinkkitchen.com/events/ and the source links in local-programmes.json . Include small recurring programmes with explicit schedule and recheck date.
- Local Government / municipal and SDC announcements: https://www.localgovjamaica.gov.jm/ and https://sdc.gov.jm/ . Seek parish stops, public community days, fairs and sporting programmes. A general month announcement does not establish individual event dates.

## Admission and maintenance

Include smaller events when an organisational publication establishes a current date and identifiable town or venue. Unknown price or precise address need not exclude an otherwise usable event: state the missing detail; use an explicitly labelled area map if necessary. Do not invent admission, accessibility, lineup or a future edition from an old poster.

Check organiser identity, date/year, venue, parish, ticket conditions and cancellation notices. Preserve the individual source URL and checked date. Resolve conflicting prices explicitly. Deduplicate package products and cross-listed events; distinct performances can have their own records. Preserve recurring programmes separately from confirmed editions. Expired dated records remain in source history but disappear from the visitor's upcoming view after their final Jamaica date.

Use the parish matrix to identify gaps on each collection pass, including inland and rural parishes. Do not describe the inventory as exhaustive or mistake no listing for no event. School benefits, worship, markets, heritage days, sports and local performances are within scope alongside major festivals.

Update travel-events.json and matching pages/events.html together, refresh the authorised content-baseline hashes, build and run relevant checks. These are collected snapshots; no unattended collection or automatic source refresh is configured. Recheck shortly before publication and refresh regularly thereafter.

## 15 October 2026 pass

Added 14 organiser ticket listings, taking dated source inventory from 18 to 32; 16 recurring programmes retained. Additions cover St. Ann, St. Mary, St. Catherine and St. Andrew. Rural and inland coverage remains incomplete. Individual event pages supply dates, venues and booking links. Frenchmen and Seychella package products were excluded from counts. JCDC's older parish PDFs were not rolled forward. The Local Government relay lacks a usable daily parish schedule, so it was not expanded into invented parish events.

Staged only. Browser rendering is unverified because the supported browser skill is unavailable. Prior full release passed 85 tests; this content pass runs source validation and focused event/data behavior checks. Run the complete release workflow before publication.

## Expanded island pass and expiry

The narrow first pass was insufficient. Expanded collection now includes CaribTix, First In Line, QRTick, UWI Mona and Western Jamaica Campus, NDTC, National Gallery of Jamaica, Republic Weekend, Jamaica International Fashion Week, and venue programmes in Negril, Montego Bay and Kingston. Sources are organisational publications and ticket pages; no individual intake is used.

Inventory is 94 dated records plus 27 venue programmes. For 15 October through 13 December 2026, 74 dated records overlap the 60-day window. This is a snapshot count, not an exhaustive estimate of Jamaica's actual events. It includes one record per published series or occasion, not a count of every performance. There is no 200-event cap. The 60-day dated inventory covers 13 parishes; Portland remains a gap. St. Ann has 11 dated listings in this window, in addition to its venue programmes; St. Ann is broader than Ocho Rios town.

`python jamaica/scripts/collect-events.py --from-date 2026-10-15 --through 2027-01-15 --output /tmp/jamaica-event-candidates.json` collects public CaribTix Event JSON-LD for review. It never modifies the site inventory or publishes. Its first live collection read 68 public event pages, with no retrieval errors. The factual extraction snapshot is in `audit/published-event-candidates-2026-10-15.json`. UTC timestamps must be converted to America/Jamaica: early UTC morning is often the previous Jamaica evening. Long spans often represent seasons or sales windows; football season records are not imported as continuous matches. Duplicate BRUV/Zebra ticket products are consolidated. The broad-platform list is only one input; follow the other institutional and venue calendars separately.

The public expiry module removes ended events and finite programmes on page load, on return to a tab, and every minute while open. All directory modules share its active arrays. Cards, search results, homepage previews and regional inventories update; expired direct links lead to Events with an ended-event notice. Expiry is after the final Jamaica calendar day, retaining overnight and multi-day events through their final date. Standing recurring programmes remain until an explicit programme end date; a single past occurrence does not end a weekly series. Research source and audit files are retained in Git, outside the visitor inventory.

Embedded JSON is compacted during build to keep growth modest. The expanded HTML is about 4.54 MB, gzip about 1.11 MB; media assets are unchanged. Budgets are 4.65 MB and 1.15 MB compressed. This is a small increase in page transfer from the previous content inventory; future much larger collections should move event data into a separate resource.

Staged only; the complete release workflow still precedes publication. Browser QA remains unavailable under the supported Sites workflow. Focused DOM tests cover genre/parish filtering, finite programmes, public data extraction and expiry across search, cards and direct links.

Eight event-specific posters were matched visually to their named events and verified as retrievable from the published ticket listings. The images retain complete poster layouts, link to the original artwork and credit the listing. WebP delivery totals 862,482 bytes across all eight, reduced from 16,854,822 source bytes, with lazy loading and fixed dimensions. Existing historical media remains unchanged. The Pictures selector filters dated listings with event artwork and combines with parish, date, genre and query; Reset restores all listings. All added dated listings have Google Maps links, with area-only maps identified where the precise venue is not established. Poster text refined race warm-up/start times and exposed differing Discovery Bay opening times, which are disclosed in the event copy.

## Continued local collection

The latest pass added 61 distinct dated listings from individually inspected WehfIGO calendar pages, TicketGateway organiser listings, MCAJ, Rose Hall, TPDCo, Mayhem, the Jamaica Jerk Championship and North East Jamaica Conference. Inventory is now 155 dated source records and 27 recurring venue programmes. The fixed 15 October–13 December 2026 window contains 134 dated listings across all 14 parishes; St. Ann has 23, broader than Ocho Rios itself. This replaces the earlier snapshot counts above and remains far from an exhaustive national calendar.

BZR’s marquee concert was rescheduled from 18 October to 20 December; the old four-day October claim and Cardi B implication were removed. The corrected concert falls outside the 60-day window. Public-calendar listings link their individual published entry; this is discovery evidence, not a guarantee that an organiser has reconfirmed operations. Current ticket availability still needs checking.

The community calendar research inspected 153 linked pages, with 40 retrieval failures. Duplicate cross-listings, existing package components, past events, unknown locations and unresolved date contradictions were excluded. Craft’s widget said 11pm but its announcement and TPDCo said 11am. Rose Hall’s operator supplies 6:30–8:30pm tours, superseding the calendar widget. Brunch at Brew’d is 4–10pm on one day. The James Bond listing was withheld because its description says 10 October while its widget says 30 October. No individual submissions are solicited. See `audit/community-event-expansion-2026-10-15.json` for accepted records and corrections.

This pass retains existing event-photo filters, parish/genre/date filters, labelled area maps and automatic expiry. No background source-refresh task has been configured; auto-expiry does not imply auto-discovery. Staged only; full release and supported browser checks still precede publication.
