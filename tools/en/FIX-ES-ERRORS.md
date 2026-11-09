# Fixing the Spanish pages from tools/en/ES-ERRORS.md

Eduardo asked (6-11-2026) to correct the errors listed in `tools/en/ES-ERRORS.md` in the Spanish pages, in a separate commit. You are assigned a range of lines of that file. Work in `C:\Users\edues\Documents\Claude\Projects\teoriamusical.com.es`. Reply in the report in Spanish.

## Rules
1. For each item: open the Spanish page named, **check the item is still true** (some were already fixed earlier; skip those and say so). Verify the fact itself (music theory, acoustics, instrument ranges; use WebSearch only when needed). Never "correct" something into a new error.
2. **Fix** items that are factual errors, broken HTML, wrong links, typos, internal contradictions, wrong numbers/octaves/directions. Fix the whole page consistently (text, tables, FAQ, `<meta name="description">`, JSON-LD FAQ answers, image `alt`, captions). Page JSON-LD FAQPage must match the visible FAQ text.
3. **Do not touch**: items marked "sin verificar / unverified / exagerado / opinión / subjetivo" (only soften or remove them if you can verify they are wrong, or if the item says plainly it is false); items marked "DISCREPANCIA, NO CORREGIR"; the horn thumb convention; things Eduardo must decide (semicadencia sobre la subdominante, "+" in cifrado, "Superdominante"/"Perfecto mayor" naming, cuatrillo=6 convention, Fliscorno Mahler/Janáček, names "caja china/látigo/platos/cascabeles"). List these in the report as "para decidir".
4. Images, SVG, PNG, PDF with Spanish text: do not regenerate (out of scope), just list. Exceptions: a wrong text inside the HTML next to them (alt, caption) you fix.
5. Keep the site's style (Spanish, tuteo as the page does, same markup, no new classes). Use the minimal change. Do not add features.
6. Interactive widgets: if an item says an `AFIN_TRANSP` value shows the wrong octave, check `assets/js/afinador.js` and the page's inline `AFIN_TRANSP` to see what the panel really does; fix the page's number or text only if it is really wrong; do NOT edit `assets/js/*.js` (other agents are editing those).
7. Do not run `build.js`, `version_assets.cjs`, `insert_ads.py`; do not commit; do not touch `en/`, `tools/en/` (except you may append at the end of `tools/en/FIX-ES-ERRORS.log` — see report) or other agents' pages. If a fix changes a fact that the English module `tools/en/pages/*.js` also states, note the module name in your report (do not edit it).
8. After editing, for each edited page: `node tools/validate_jsonld.js <page>/index.html` must pass, and check the HTML is balanced around what you edited.

## Report (final message, Spanish, concise)
- Per page: items fixed (one line each), items already fixed, items skipped with the reason.
- "Para decidir por Eduardo": list.
- "Módulos EN a revisar": list of `tools/en/pages/*.js` whose text depends on a changed fact.
- Files edited (relative paths).
