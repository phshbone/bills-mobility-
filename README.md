# Bill's Mobility

Minimal installable PWA for launching Bill's favorite mobility/fitness YouTube sources and shared playlists.

## v1 scope
- Six favorite creator cards.
- Five unique shared personal playlist cards (duplicate URL removed).
- `Anything else` is the generic catch-all playlist.
- `Mix it up` randomly chooses from configured sources.
- One-tap daily activity checkmark with 14-day local history.
- Offline app shell; YouTube playback itself still requires YouTube/network access.
- No backend, account, API key, paid service, or analytics.

## Adding another source
Edit the `SOURCES` object near the bottom of `index.html`. The UI grid expands automatically; no layout redesign is required.
