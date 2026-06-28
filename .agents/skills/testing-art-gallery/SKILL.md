---
name: testing-art-gallery
description: Test the ArtVista art gallery website end-to-end. Use when verifying UI pages, navigation, filtering, admin CRUD, or dashboard analytics.
---

# Testing the ArtVista Art Gallery Website

## Overview
ArtVista is a React + TypeScript + Vite + Tailwind CSS art advertising website with 4 pages: Home, Exhibit, Admin, Dashboard.

## Local Dev Setup
```bash
cd /home/ubuntu/repos/art-gallery
npm install
npx vite --host 0.0.0.0 --port 5174
```
The app runs at `http://localhost:5174`.

## Pages and Routes
- `/` - Home (PublicLayout): hero section, stats, featured artworks, CTA
- `/exhibit` - Exhibit (PublicLayout): filterable art gallery with category buttons and search
- `/admin` - Admin (AdminLayout): artwork management table with add/delete/toggle
- `/dashboard` - Dashboard (AdminLayout): analytics stats, recent activity, top artworks

## Key Test Scenarios

### Home Page
- Verify hero heading "Where Art Meets Vision"
- Verify stats: "120+", "45K", "3,200"
- Verify 3 featured artwork cards: Violet Horizon, Ethereal Dreams, Abstract Flow

### Exhibit Page
- Default shows 9 artwork cards
- Category filter buttons: All, Paintings, Digital, Sculpture, Photography, Mixed Media
- "Digital" filter should show exactly 3 cards: Ethereal Dreams, Neon Pulse, Binary Bloom
- Search input filters by title or artist (case-insensitive)
- Searching "Maya" should show exactly 1 card: Violet Horizon

### Admin Page
- Initial table has 6 rows (4 Published, 2 Draft)
- "+ Add Artwork" opens form with Title, Artist, Category dropdown, Price fields
- Validation: all fields required (title, artist, price) - empty fields prevent save
- New artwork added at top of table with status "Draft"
- Trash icon deletes a row
- Status badge click toggles Published <-> Draft

### Dashboard Page
- 4 stat cards: $24,500 (+12.5%), 18,240 (+8.2%), 156 (+3), 3.2% (-0.4%)
- Recent Activity: 5 entries
- Top Artworks table: 4 rows, first is Marble Whisper (1,240 views)

### Cross-Layout Navigation
- Public pages (Home, Exhibit) use header nav with ArtVista logo
- Admin pages (Admin, Dashboard) use sidebar with "Back to Site" link
- "Back to Site" navigates to Home (`/`) with public layout

## Tips
- The branch with code may not be `main` - check `git branch` and checkout the correct branch before starting the dev server
- If dev server port 5174 is taken, Vite will use the next available port - check terminal output
- All data is client-side state (no backend/database) - page refresh resets to initial data
- The light purple theme uses Tailwind custom properties defined in `src/index.css`

## Devin Secrets Needed
None - this is a fully client-side app with no authentication or API keys required.
