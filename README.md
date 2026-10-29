# Stanza by Whitelion website

A fast, hand-built website: plain HTML, CSS and JavaScript. It has no build step and needs no installs. Netlify publishes this folder exactly as it is.

## What is where

| You want to change… | Edit this file |
|---|---|
| Colours, fonts, spacing | `assets/css/style.css`, section 1 "Tokens" at the top |
| Whitelion products, features, warranty | `data/whitelion.js` |
| PARÉ collections, shades, specs, warranty | `data/pare.js` |
| LUFT fans (101 of them) | `data/luft.js` |
| LMT categories | `data/lmt.js` |
| Page text (headlines, paragraphs) | `index.html`, `whitelion.html`, `pare.html`, `luft.html`, `lmt.html` |
| The interactive living room | the `<svg>` inside `whitelion.html`, and the logic in `assets/js/whitelion-home.js` |
| Images | `img/` (one folder per brand) |

## Common jobs

**Add a product.** Open the brand's file in `data/`, copy one `{ ... }` block, paste it below, and change the text. Save the file and refresh the page.

**Replace an image.** Export it as WebP, at most 1600 px wide and under 300 KB if you can (squoosh.app does this well). Give it the same file name as the old one and drop it into the same folder.

**Fill in a missing warranty.** In `data/pare.js`, DURA+ and TOUGH have `warranty: ""`. That's because their brochures don't state one. Type the warranty between the quotes once PARÉ confirms it.

**Change scenes in the interactive home.** In `assets/js/whitelion-home.js`, find `const SCENES` and edit the numbers. Lights and curtains go from 0 to 100, and the fan from 0 to 3.

## How the motion works

- **Page-to-page cross-fade.** The CSS rule `@view-transition` in `style.css` handles this. It works in Chrome, Edge and Safari 18+, and other browsers simply change pages normally.
- **Scroll animations.** GSAP and ScrollTrigger, in `assets/vendor/`, drive these from `assets/js/main.js`. Each element with `class="reveal"` fades up once as it scrolls into view.
- **Reduced motion.** Visitors who switch on "reduce motion" on their phone or computer see no animation.

## Enquiry form

The form uses **Netlify Forms**, so no extra code is needed. Submissions appear in Netlify under **Site → Forms → enquiry**. To get an email for each one, go to **Forms → Form notifications → Add notification → Email**.

## Publishing

Every push to the `main` branch on GitHub publishes the site on Netlify automatically. If you have no Git set up, you can also drag this whole folder onto the Netlify dashboard's **Deploys** page.

## Before launch, ask the client for

1. Original high-resolution photos. Many images here were taken from PDF brochures, and LMT and LUFT in particular look soft on large screens.
2. The approved privacy policy text for `privacy.html`.
3. Confirmed warranties for PARÉ DURA+ and TOUGH.
4. Opening hours for the experience centre.
5. The final domain, so the share-preview links in each page's `<head>` point to it.
