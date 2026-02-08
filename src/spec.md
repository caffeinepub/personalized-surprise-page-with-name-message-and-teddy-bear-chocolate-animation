# Specification

## Summary
**Goal:** Add synced bite/chew sound effects and enhance the teddy bear eating chocolate animation with extra visual detail while preserving the current multi-phase flow and reduced-motion behavior.

**Planned changes:**
- Add bite and chew sound effects timed to the existing animation phases (single bite sound at bite moment; chew sounds synced to each mouth open/close beat).
- Ensure audio only plays after a user interaction that starts the Surprise/Replay flow, and add a visible mute/unmute control on the Surprise view.
- Increase animation detail with additional micro-actions/overlays (e.g., stronger bite impact motion, subtle crumb shake, sparkle/impact accents) while keeping the current idle/anticipation/bite/chew/satisfied structure.
- Respect prefers-reduced-motion by disabling animation-added motion/overlays and preventing sound playback when reduced motion is enabled.
- Load audio (and any added overlay assets) as frontend static files, with no backend changes.

**User-visible outcome:** On the Surprise view, the teddy’s bite/chew sounds play in sync with the animation after starting or replaying it, users can mute/unmute the sound at any time, and the eating animation looks more detailed while still supporting reduced-motion preferences.
