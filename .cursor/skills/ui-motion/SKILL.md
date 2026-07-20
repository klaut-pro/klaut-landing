# UI motion (Majico)

Apply when implementing motion on klaut.pro surfaces.

- Durations from DESIGN.md: micro 140ms, fast 200ms, normal 320ms, emphasis 600ms, choreography 2800ms.
- Easing: standard `cubic-bezier(0.22, 1, 0.36, 1)`, expressive `cubic-bezier(0.16, 1, 0.3, 1)`.
- Stagger sibling 100ms, stream 280ms.
- Patterns: atmosphere drift, staggered hero entrance, scroll reveals, reading progress on articles.
- Always respect `prefers-reduced-motion: reduce` (disable animations/transitions, show content immediately).
