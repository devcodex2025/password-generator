# Guides Image Pipeline

## Goal
Generate one shared image per guide `slug` (not per locale), then reuse it for all locales.

## Output files
- `public/images/guides/<slug>/cover-1200x630.webp` (OpenGraph)
- `public/images/guides/<slug>/hero-1600x900.webp` (article hero, optional)

## Style baseline
- Clean cybersecurity editorial look
- No logos, no brand names, no UI screenshots
- High contrast, clear focal object, minimal clutter
- No text baked into image

## Technical requirements
- Format: `webp`
- Color profile: `sRGB`
- Safe margins: keep key object inside central 80% area
- Compression target: `< 250 KB` for `cover-1200x630.webp`

## Recommended workflow
1. Generate 2-4 variants per slug from prompt set in `docs/guides-image-prompts.json`.
2. Pick 1 final cover and (optionally) 1 hero.
3. Save by exact naming above.
4. Run a quick visual QA:
   - object is recognizable at small preview
   - no artifacts on edges
   - no accidental text/watermarks
5. Keep one visual style across all 10 guides.

## Content mapping
`content.json` uses:
- `image`: `/images/guides/<slug>/cover-1200x630.webp`
