# History Reconsidered: second run

Seven essays added to the existing Jamaica edition, preserving the first run and regional structure.

| Essay | Evidentiary anchor | Material limit |
| --- | --- | --- |
| Taíno history | White Marl research; Morgan chapter summary; Smithsonian object interpretation; Schroeder et al. ancient DNA study | Bahamas DNA findings are not an islandwide Jamaican ancestry result. |
| Tacky and the Atlantic war | Brown's museum-authorized excerpt; Axis Maps project documentation | Full monograph and interactive map operation not independently verified. |
| Women and 1938 | Palmer synopsis; UWI testimony/publication inventory; Smith's Sistren abstract | Ida Homes stone-throwing is explicitly a rumour; full testimony collection not accessed. |
| Obeah | Paton's open 2009 article, especially the Bruce prosecution; related scholarly book descriptions | Legal classification and supernatural efficacy are separate questions; no present-day legal advice. |
| Black-led Christianity | Erskine journal abstract; Neely biography reprinted by Boston University | Full Erskine article not read. The 1793 correspondence was subsequently consulted in its 1916 re-publication; it is not an original manuscript. |
| Migration before Windrush | Putnam publisher account; US National Archives guidance; Wellcome catalogue | Regional workers are not all Jamaican; no individual genealogy established. |
| Tourist postcard | Thompson publisher description; Manley journal abstract; Johnston image record | Photo subjects' incomes, consent and opinions cannot be inferred from the image. |

Each essay distinguishes the account being examined, factual evidence, attributed interpretation and editorial reading questions. The opening accounts are analytical targets, not findings from a public-opinion survey. Citation entries state whether the full text, abstract, catalogue or publisher description was consulted. No invented historical dialogue or synthetic documentary imagery was added.

Discovery: homepage links to both runs; history portal identifies fourteen essays; second run has its own seven-card collection and ordered learning pathway. Full article text and citations enter the generated search and source indexes.

Media: existing dated and credited images remain attached to their actual locations; the Panama image is linked from its verified original image address and retains Wellcome attribution and CC BY 4.0. The museum's Brown recording is linked with its date and modern scholarly context. Image delivery and heard recording playback are separate from source-page verification.

Validation: `npm run release:prepare` checks generated output, syntax, citation targets, IDs, image descriptions and the behavior suite. The new second-run journey test checks direct routing, single-article reading, search and ordered navigation. The HTML size check was expanded for the growing full-text inventory, with a compressed-size budget added; it does not measure real visitor loading time.

Managed browser rendering was unavailable in this session; DOM tests do not establish visual phone layout or real external media playback. Deployment and live-source equality must be verified separately after push.

## Final evidence and media review

The second run now contains approximately 6,000 narrative words, 30 source entries and ten figures across the seven essays. Every essay has inline visual evidence. Additions:

- Taíno: Atkinson’s complete JNHT heritage essay and Neeganagwedgin’s oral-history research abstract; concrete Jamaican sites remain distinct from genetic claims.
- Tacky: direct interactive map launch and the museum’s official recording (YouTube G74WDexeevU) inside a dormant, click-to-load player.
- Women and 1938: the full 4 May Commons exchange and NLJ D0002591, showing a mixed crowd. The Gleaner publication date is not asserted to be the capture date. The original is only 321×197 pixels; no missing details were generated.
- Obeah: 1898 law facsimile, TNA CO 139/108, from Obeah Histories, and discussion of the actual historical statutory provisions. The historical copy is not represented as current legal advice.
- Christianity: Liele’s and Swigle’s January/April 1793 correspondence in a public-domain re-publication. The unrelated Port Royal church photograph was replaced by JNHT’s image of Salter’s Hill’s actual Baptist ruins.
- Migration: NARA’s historical gold/silver payroll analysis; African American cases are distinguished from Jamaican migrants.
- Tourist image: a dated inland market photograph alongside shoreline work; the editorial comparison is not attributed to undocumented intentions of the photographer.

The two newly downloaded image files were decoded and visually inspected. Caption identity agrees with the archive records. The additional behavior test verifies that Brown’s film starts only on request, stops on departure, and the original law opens and closes in the magnifier. Browser preview access from the cloud browser was refused; live browser inspection is required after deployment. Mobile viewport rendering and complete third-party playback remain separate limitations.

### Verification outcome before publication

The final release-preparation run passed source/build consistency, syntax, IDs, inventories, citation targets and image-description validation. Its full behavioral run finished with 63 passes and one failure: the builder subprocess in the source-refresh test returned a null exit status. That status indicates a subprocess did not exit normally; the captured assertion does not identify its termination cause. The same unchanged build test file was then run independently and both tests passed (2/2), including source refresh and rejection of stale output/broken includes. The separate new-series run also passed 2/2, and both new-series tests passed inside the full run. Thus every one of the 64 distinct checks has a passing result, but the full suite did not finish cleanly in that run. The termination cause remains unconfirmed; it must not be represented as a proven content defect or a proven resource failure.

All 23 release files were uploaded as GitHub blobs and their returned hashes matched the local Git object hashes. The complete prepared GitHub tree also matched the locally staged tree. This verifies source-transfer fidelity, separately from deployment and playback. Publication and live inspection are subsequent steps.

### Live image audit correction

After the first coordinated deployment was confirmed live, direct image requests found the Commons-hosted Panama photograph returning 403 in this environment. The same identified image (Wellcome V0030222 / 562002i) was obtained from the official Wellcome image service at https://iiif.wellcomecollection.org/image/V0030222/full/800%2C/0/default.jpg, visually inspected, and moved into the guide’s content-hashed image assets. The Salter’s Hill response was a valid photograph of the identified ruins with the same 145×108 dimensions, but returned recompressed bytes; it was independently viewed. An alternate view from the same JNHT site was saved as WebP, with its small source dimensions disclosed and display width limited. This is a media-delivery repair; the essays’ historical argument and reading behavior are preserved.
