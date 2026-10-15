# Reader-facing editorial-note cleanup

Staged with the existing Jamaica media/navigation changes; no production deployment.

## Scope

Reviewed the complete rendered-source set: articles, place guides, thematic routes, portals, events, planning, captions and dynamic copy. Removed 116 repeated source-review/process paragraphs, image-processing notes, prototype/future-development messages and editor-directed event/travel instructions. Kept reader-useful historical qualifications, practical confirmation advice, archival identities, dates, source links and reuse attribution. The removal audit retains the deleted footer text outside the website build.

333 source figures now show compact captions with expandable source/credit details. Image attribution/source URLs were compared with the previous source: none were removed. Card and image-viewer copy use the full credit text without duplicating the compact caption. All 177 unique static image assets preserve their source bytes.

## Verification

- Build and source checks passed: 153 articles, 140 place guides, 602 source modules; IDs, citations, syntax, JSON and image descriptions valid.
- Final cleanup test passed, including absence of production-note phrases, caption source access, credits collapsed by default, actual 2009 image identity and licence, court archive evidence, and working comparison copy.
- Sixteen existing focused regression checks passed: article navigation, media controls and magnification, date/place/credit preservation, location links, saved reading, search, planning and storytelling. The new cleanup assertion initially confused 333 source figures with 353 figures after runtime learning-cover duplication. It was corrected to account for those existing copies; the final cleanup test passed 1/1. No new visual browser or third-party playback verification was performed.
- Protected source baseline refreshed only for these authorized copy/presentation changes. Pinned shared platform modules unchanged; shared platform tests 2/2 passed.
- Generated article page and deployable homepage share SHA256 `03a42ab764211ee8c990b5873e4efffb0d1cec08adc609be48f16ff39d88bd02`.

This is a source staging branch, not a hosted preview. Review desktop/mobile caption spacing and disclosures before publication. Production stays unchanged.
