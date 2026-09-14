# Flowcraft sales experience

## Preview

Run `npm run dev` and open http://localhost:3000.

## What is included

- Homepage with animated workflow, scroll reveals, a horizontally browsable website collection, agent playground, illustrative stories, pricing, FAQs, and inquiry form.
- `/websites`: filterable catalog of four original website concepts.
- `/websites/[slug]`: desktop/mobile preview, functional sample inquiry dialog, scope details, and a product-specific inquiry link.
- `/agents`: scripted chat, voice, and workflow scenarios plus the existing live AI salon chat integration.
- `/case-studies/[slug]`: two clearly labeled illustrative workflows.

## Where to edit

- `src/lib/catalog.ts`: website names, proposed starting prices, features, agent packages, and illustrative stories.
- `src/components/studio/Studio.tsx`: page sections, scenario scripts, FAQ answers, and inquiry experience.
- `src/components/studio/studio.css`: responsive layouts, visual design, and website demo artwork.

## Content to confirm before publishing

- Website prices, revision allowance, ownership, hosting, support, and delivery terms are proposed copy; confirm they match your commercial offer.
- Agent prices are starting points. Usage and third-party costs must be agreed with each client.
- Haven Dental, Forma Studio, Groundwork, and Gather & Table are fictional sample brands, not client endorsements.
- Replace illustrative stories with approved client material when available. Do not remove the illustrative labels unless the story is verified.

## Functional boundaries

- Product CTAs request a proposal. Checkout, billing, account management, and deployment automation are a later phase.
- Scripted agent scenarios do not send messages, book appointments, or update external tools. The voice scenario uses optional browser speech synthesis.
- Live salon chat calls `/api/agent-chat` and needs a working `GROQ_API_KEY`.
- Real project inquiries use `/api/book-call` and require `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and insert permission on `call_requests`.
- The inquiry endpoint validates input and performs an insert without requiring read access. Credential fragments and customer details are no longer logged by this route.
- No real contact inquiry was submitted during UI verification; only the sample dialog, live chat, and invalid-input validation were exercised.
- Existing legacy components and voice/TTS routes remain in the repository for later integration work.

## Checks

Production build, targeted lint, route responses and missing-product 404, desktop/mobile visual inspection, category filtering, demo switching, sample request completion, product interest preselection, and live salon chat response.

## Pre-push verification — 15 September 2026

- Site-wide palette: Pine Fern `#4f664c` and Porcelain Cream `#f4ece1`, with matching dark text and muted surfaces. The supplied logo shape is retained and tinted with CSS.
- Original `hero-video-scrub.mp4` restored to the hero. Desktop scroll scrubbing, pinned layout, mobile playback, pause/resume, manual scrubbing, and reduced-motion handling are implemented. The customer journey remains selectable.
- Verified all 17 public routes, missing-product 404, video partial-content delivery, form validation, live AI chat, and voice transcription plus reply.
- Desktop scrolling advanced the paused video from 0 to approximately 3.66 seconds. Mobile video loaded and paused correctly, with no page-width overflow at a 390-pixel test viewport.
- The interactive sample inquiry preserved the selected service and Thursday/afternoon preference.
- Supabase real insert checks FAILED with HTTP 401 / Invalid API key from the provider. The inquiry endpoint correctly reports failure and does not show a false success. No test rows were accepted. A valid project publishable/anon key is required in `.env.local` and the hosting environment before production release.
- Google Cloud TTS has no configured API key. The endpoint now reports 503 clearly instead of making a doomed upstream request. The current sample speech uses browser speech; live chat and Groq voice transcription were verified independently.
- Changes are intended for a GitHub review branch while the Supabase credential issue is unresolved. No production release readiness is claimed.
