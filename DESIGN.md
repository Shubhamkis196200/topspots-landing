# Design System — TopSpots Landing Pages

## Product Context
- **What this is:** B2B2C venue management platform for hospitality (bookings, menus, QR codes, tipping, analytics, staff profiles)
- **Who it's for:** Venue owners (restaurants, bars, cafes, clubs) and hospitality staff (bartenders, waiters, chefs)
- **Space/industry:** Hospitality SaaS — peers: SevenRooms, Resy OS, Toast, 7shifts
- **Project type:** Premium marketing/landing pages (2 pages: venues + staff)

## Aesthetic Direction
- **Direction:** Luxury/Refined + Art Deco fusion
- **Decoration level:** Expressive — 3D elements, glassmorphism, ambient glow, grain texture, mesh gradients
- **Mood:** Walking into a well-designed venue. Premium, warm, confident. Gold and darkness. Not another SaaS clone.
- **Reference sites:** SevenRooms (editorial feel), Stripe (visual craft), Resy (bold accents)

## Typography
- **Display/Hero:** Instrument Serif — editorial luxury, unexpected in SaaS, instant premium signal
- **Body/UI:** DM Sans — clean geometric sans, better character than Inter, great readability
- **Data/Stats:** Geist Mono — tabular figures for pricing and statistics
- **Loading:** Google Fonts CDN
- **Scale:** 14 / 16 / 18 / 24 / 32 / 48 / 64 / 80px

## Color
- **Approach:** Restrained — gold is precious, used sparingly for maximum impact
- **Primary Gold:** #C9A14A
- **Gold Light:** #E8C86A (hover/gradient)
- **Gold Dark:** #A8843A (pressed)
- **Gold Glow:** rgba(201, 161, 74, 0.15)
- **Charcoal Deep:** #0D0D0F (hero/dark sections)
- **Charcoal:** #1C1E21 (cards on dark)
- **Surface:** #FDFCFA (light sections)
- **Surface Elevated:** #F5F3EF (cards on light)
- **Text Primary (light):** #0D0D0F
- **Text Primary (dark):** #FDFCFA
- **Text Muted (light):** #6B6B6B
- **Text Muted (dark):** rgba(255,255,255,0.6)
- **Semantic:** success #34D399, warning #FBBF24, error #F87171, info #60A5FA

## Spacing
- **Base unit:** 8px
- **Density:** Spacious (premium marketing)
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64) 4xl(96) 5xl(120) 6xl(160)
- **Section gaps:** 120-160px
- **Card padding:** 32-48px

## Layout
- **Approach:** Hybrid — grid-disciplined for features/pricing, creative-editorial for hero/storytelling
- **Grid:** 12-column, 4-col mobile, 8-col tablet, 12-col desktop
- **Max content width:** 1280px
- **Border radius:** sm:8px, md:12px, lg:16px, xl:24px, full:9999px

## Motion
- **Approach:** Expressive (Framer Motion 12)
- **Easing:** enter: cubic-bezier(0.22, 1, 0.36, 1), exit: ease-in, move: ease-in-out
- **Duration:** micro(100ms) short(200ms) medium(400ms) long(700ms)
- **Effects:** scroll-triggered parallax, staggered reveals, floating 3D cards, ambient particles, number counters, magnetic cursor on CTAs

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-22 | Instrument Serif for display | Serif = luxury hospitality signal, unique in SaaS category |
| 2026-03-22 | DM Sans over Inter for body | Better character, less overused, pairs well with serif |
| 2026-03-22 | Expressive motion + 3D glass | Marketing site needs visual wow-factor, Stripe-level craft |
| 2026-03-22 | Deep charcoal #0D0D0F | Deeper black for hero = more dramatic gold contrast |
| 2026-03-22 | 21st.dev Magic for components | AI-generated premium components instead of hand-coding |
