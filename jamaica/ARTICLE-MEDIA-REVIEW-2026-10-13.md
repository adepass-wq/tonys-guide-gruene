# Article media review — 13 October 2026

Reviewed the source and media inventory of all 111 Tony’s Guide Jamaica articles, prioritising the newest fourteen slavery-legacies stories and the preceding St. Thomas/Clarendon round. The site retains its article collection, regional navigation, saved notes and historical recordings.

## Changes

- Added 23 licensed/public-domain visual assets, placed with the relevant narrative and specific observation prompts. New visual assets and original-source links support 43 articles; four additional newest-story photograph prompts improve interpretation without inventing a new image.
- Added 23 distinct original-source destinations, appearing in 30 contextual cards: historical photograph records and films from NLJ, UCF, JIS, Facebook publishers, Flickr and Pinterest. Restricted photographs are links, not unlicensed copies.
- Replaced four generic three-question diagrams with authentic material: Hibbert House, Fairfield’s Jamaican church and a 1755 Jamaica map for Suttons/Clarendon and Hellshire’s geographic context.
- Added the documented Jamaican Language Unit film to the newest Kromanti story; removed one duplicate Kumina film from its older article.
- Added “Look & listen” shortcuts across all 111 articles. They scroll and focus the relevant evidence without starting a player. YouTube remains click-to-load; existing global stop and departure behavior is retained.
- Hosted 52 previously external, credited Commons images as whole-frame resized WebP copies. Original records, creators and licences remain attached. Fourteen original URLs had returned HTTP429; successful image alternatives were retrieved and decoded. Six publisher images remain external and returned image data during the audit.
- Added source/date/place/licence decisions and an all-article audit in `src/data/article-media-review-2026-10-13.json`.

The generated page has 170 article images, 32 video frames and 17 audio players, plus 30 new contextual source cards. Frames are transformed to dormant player controls at runtime. These counts describe markup, not distinct films or verified complete recordings.

## Evidence and performance

New images were visually inspected as downloaded stills/contact sheets; all local-copy images were successfully decoded before conversion. Historical versus modern dates and comparison places are explicit. The Windrush document is June 1948 but the photograph is April 2023. The Yallahs crossing is December 1988. Fairfield is Manchester, Jamaica, 1968. Llandovery is not Drax Hall; Hope River bridge is not Hope Aqueduct; Cane River is not Yallahs; no St. Ann Orange Valley photograph was passed off as the Trelawny hospital.

The page is 3,002,705 bytes (784,943 bytes in the local gzip estimate), versus 2,947,033 bytes / 762,235 bytes before this round. New and newly hosted image assets are about 8.4 MB combined, delivered separately and lazily rather than added to the initial HTML. The site now references 155 unique hosted raster assets. Original archive full-size records remain available through credits.

15 distinct YouTube oEmbed publisher records returned HTTP200, and 11 distinct direct audio URLs returned audio data. This checks current provider metadata/delivery, not heard playback. Source markup, unique IDs, citation targets, figure locality captions, image alternatives and the HTML budget are checked by the release pipeline. Three new reader-journey tests cover evidence shortcuts/focus, click-to-load film departure/global stop, real dates and link-only restricted images.

Final `npm run release:prepare` passed: 52 tests, zero failures, plus build freshness, script syntax, citation/ID and image checks. `git diff --check` passed.

## Remaining limits

A supported browser-control plugin is unavailable in this managed environment. No rendered desktop/mobile inspection or audible playback was performed; DOM tests are not substitutes. JIS/UNESCO automated access and Facebook/Pinterest session access can vary. Social-source links visibly disclose possible sign-in requirements.

Existing JNHT reproductions retain their unresolved permission status from the published collection. NLJ permission-required items, UCF material requiring commercial permission and the noncommercial Tryall Flickr image were added as original-record links only. Existing historical archive public-domain labels were retained, without a legal adjudication of every photographer. Some makers, capture dates and exact film localities remain unknown and are labelled accordingly. The fifteen-articles-per-parish programme is not complete.

## Release record

Source, evidence, tests, generated HTML and every new hosted image are one coordinated Git release. Run `npm run release:prepare` before publication and `npm run verify:live` after the matching deployment. Publication and final live delivery results are reported in the task handoff.
