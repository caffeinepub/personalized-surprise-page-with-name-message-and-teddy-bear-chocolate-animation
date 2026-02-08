# Specification

## Summary
**Goal:** Fix the teddy-eating-chocolate animation so the chocolate bar is consistently visible in/between the teddy’s hands during the early (idle/anticipation) and bite/chew phases without changing any other visuals, timing, or UI.

**Planned changes:**
- Adjust the teddy/chocolate render layering and positioning so the chocolate bar is not hidden behind the teddy and does not render off-screen during idle/anticipation.
- Ensure the chocolate remains visible through bite/chew phases by preventing occlusion/z-index issues with the teddy sprites and existing overlays.

**User-visible outcome:** On the Surprise view, the chocolate bar is clearly visible in the teddy’s hands throughout the early animation and continues to render correctly during bite/chew without disappearing, while everything else looks and behaves the same.
