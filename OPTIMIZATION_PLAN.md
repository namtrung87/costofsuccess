# Cost of Success - Optimization & UX Excellence Plan

## Current State Assessment

| Metric | Current | Target |
|--------|---------|--------|
| Main JS bundle | 465 KB (raw) | < 300 KB |
| CSS bundle | 116 KB | < 80 KB |
| Image assets | 33 MB (28 PNGs, 1-1.8 MB each) | < 8 MB |
| Total dist | 34 MB | < 12 MB |
| Initial load time | ~5-8s (all assets preloaded upfront) | < 2s interactive |
| Build status | Passing | Passing |
| Lighthouse score (est.) | ~55-65 | 90+ |

---

## TIER 1: Critical Fixes & Quick Wins (1-2 days)

### 1.1 Image Optimization (Biggest Single Impact)
**Problem:** 28 PNG images averaging 1.2 MB each = 33 MB total. PNGs are uncompressed for this use case.
**Solution:**
- Convert all PNGs to **WebP** format (70-80% size reduction)
- Generate **AVIF** variants for modern browsers (90% reduction)
- Resize backgrounds to max 1920x1080 (many are likely oversized)
- Resize character sprites to max 512px height
- Add `<picture>` with `<source>` fallbacks: AVIF > WebP > PNG
- **Expected:** 33 MB → ~5-7 MB

### 1.2 Progressive Asset Loading (Replace Block-All Preloader)
**Problem:** `useAssetPreloader` loads ALL 70+ assets before showing anything. User stares at loading screen.
**Solution:**
- Load only **critical-path assets** upfront (current phase BG + active characters)
- Use **intersection observer** or phase-aware preloading for upcoming assets
- Show start screen immediately, preload remaining in background
- Implement `loading="lazy"` on non-critical images
- **Expected:** Time-to-interactive from ~5-8s → < 2s

### 1.3 ErrorBoundary Fix
**Problem:** Current `ErrorBoundary` in App.tsx uses `useState` + `window.addEventListener('error')` which misses React render errors.
**Solution:**
- Convert to proper class component with `componentDidCatch` + `getDerivedStateFromError`
- Add error reporting/logging hook
- Add "Copy Error" button for bug reports

---

## TIER 2: Bundle & Performance Optimization (2-3 days)

### 2.1 Vite Build Configuration
**Problem:** No build optimization configured. Single vendor chunk, no compression, no tree-shaking hints.
**Solution:**
```
vite.config.ts additions:
- build.rollupOptions.output.manualChunks: Split vendor (react, framer-motion, lucide-react)
- build.cssCodeSplit: true
- build.minify: 'terser' with drop console/debugger
- Enable gzip/brotli pre-compression via vite-plugin-compression
- Set build.target: 'es2020' for modern-only output
```
- **Expected:** 465 KB → ~280-320 KB main bundle

### 2.2 Lucide React Tree-Shaking
**Problem:** `lucide-react` (575+ icons) may bundle entirely if imported from barrel.
**Solution:**
- Audit all icon imports across components
- Switch to direct imports: `import { Play } from 'lucide-react/dist/esm/icons/play'`
- Or use `@iconify/react` with on-demand loading
- **Expected:** Save ~20-30 KB

### 2.3 Framer Motion Bundle Reduction
**Problem:** Framer Motion is ~58 KB gzipped. Many features unused.
**Solution:**
- Use `framer-motion/m` (lighter motion components) where AnimatePresence isn't needed
- Import only used features: `import { motion, AnimatePresence } from 'framer-motion'` (already doing this)
- Consider `LazyMotion` + `domAnimation` features for reduced bundle
- **Expected:** Save ~15-20 KB

### 2.4 Constants/Data Code-Splitting
**Problem:** `constants.ts` (963 lines) and 36 phase data files are all eagerly imported into the main bundle.
**Solution:**
- Move phase data (`data/phase1.ts` - `data/phase35.ts`) to dynamic imports within each Phase component
- Split `constants.ts` into: `constants/assets.ts`, `constants/game.ts`, `constants/handbook.ts`
- Only import what each module actually needs
- **Expected:** Reduce main chunk by ~50-80 KB

### 2.5 React.memo & useMemo Audit
**Problem:** Only `DialogueBox` uses React.memo. Many components re-render on every state change because `useGame()` returns the entire state object.
**Solution:**
- Add **selector hooks** instead of exposing full state:
  ```ts
  const useGameSelector = <T>(selector: (s: GameState) => T) => {
    const { state } = useGame();
    return useMemo(() => selector(state), [selector, state]);
  };
  ```
- Memoize expensive components: `GameHUD`, `CharacterDisplay`, `BackgroundParallax`
- Use `useCallback` for dispatch wrappers passed as props
- Profile with React DevTools to find unnecessary re-renders

---

## TIER 3: User Experience Enhancements (3-5 days)

### 3.1 Perceived Performance
- Add **skeleton screens** instead of generic loading spinners during phase transitions
- Implement **optimistic UI** for quiz answers (animate immediately, validate in background)
- Add micro-animations on interactive elements (button press depth, card flip)
- Prefetch next phase assets 1 phase ahead using `requestIdleCallback`

### 3.2 Mobile Responsiveness Audit
- Test all 41 gameplay components on mobile viewport (375px)
- Fix touch targets (minimum 44x44px for buttons)
- Add swipe gestures for dialogue advancement
- Responsive font scaling for quiz text
- Ensure no horizontal overflow on any phase

### 3.3 Accessibility (a11y)
- Add `aria-live="polite"` regions for dynamic content (sanity changes, budget updates, toast notifications)
- Keyboard navigation for all interactive elements
- Focus management during phase transitions and modal opens
- Screen reader support for game state changes
- Color contrast check (neon on dark can be low-contrast)
- Add `prefers-reduced-motion` media query to disable animations

### 3.4 Audio UX Polish
- Add **volume slider** (not just mute toggle)
- Smooth fade transitions between intensity levels (currently instant switch)
- Add brief SFX for phase transitions, achievement unlocks
- Implement audio ducking when modals open
- Add haptic feedback on mobile (navigator.vibrate) for key moments

### 3.5 Save/Load System Enhancement
- Show **"Save Successful"** toast when progress persists
- Add manual save slots (3 slots)
- Add **"New Game"** with confirmation dialog
- Export/Import save data as JSON for backup
- Add save data migration strategy for future schema changes (currently GAME_PROGRESS_V1)

### 3.6 Onboarding & Tutorial
- Add first-time tutorial overlay explaining HUD elements
- Contextual tooltips for new mechanics as they appear
- "Story so far" recap when resuming a saved game
- Skip-able cutscenes with confirmation

---

## TIER 4: Production Readiness (2-3 days)

### 4.1 Error & Analytics
- Add global error tracking (Sentry or similar)
- Track key metrics: phase completion rates, average time per phase, drop-off points
- Monitor asset load failures
- Track audio initialization success rate

### 4.2 PWA Support
- Add `manifest.json` for installable PWA
- Implement service worker for offline asset caching
- Cache critical assets (current phase) for offline play
- Add "Install App" prompt on mobile

### 4.3 SEO & Social Sharing
- Add proper meta tags (Open Graph, Twitter Card)
- Generate dynamic share images per phase/score
- Add structured data for educational game schema

### 4.4 Build Pipeline
- Add `vite-plugin-compression` for brotli/gzip
- Add bundle analyzer (`rollup-plugin-visualizer`)
- Set up CI/CD with Netlify/Vercel
- Add Lighthouse CI threshold checks
- Add TypeScript strict mode (`strict: true` in tsconfig)

### 4.5 Testing
- Add unit tests for `gameReducer` (critical business logic)
- Add integration tests for phase transitions
- Add visual regression tests for key UI components
- Test LocalStorage persistence round-trips
- Test audio service initialization across browsers

---

## TIER 5: Advanced Optimizations (Optional, High Impact)

### 5.1 Virtual Scrolling for Long Lists
- If any gameplay component renders 50+ items, use virtual list
- Relevant for: Handbook entries, achievement lists, leaderboards

### 5.2 Web Worker for Game Logic
- Move market volatility calculations to a Web Worker
- Move sanity decay timer to a Web Worker (prevents tab-throttling issues)
- Offload heavy computations from main thread

### 5.3 GPU Acceleration Audit
- Ensure all animations use `transform` and `opacity` only (composited layers)
- Avoid animating `width`, `height`, `margin`, `padding` (layout triggers)
- Use `will-change` sparingly on animated elements
- Profile with Chrome Performance tab for jank

### 5.4 Memory Leak Prevention
- Audit all `useEffect` cleanup functions
- Ensure `setInterval`/`setTimeout` are cleared (most are already)
- Profile memory with Chrome DevTools over a full playthrough
- Watch for growing arrays (toasts, achievements) that never get trimmed

---

## Implementation Priority Matrix

| Priority | Item | Impact | Effort | ROI |
|----------|------|--------|--------|-----|
| P0 | 1.1 Image optimization (WebP/AVIF) | Very High | Low | Best |
| P0 | 1.2 Progressive asset loading | Very High | Medium | Best |
| P1 | 2.1 Vite build config | High | Low | Great |
| P1 | 2.4 Constants code-splitting | High | Medium | Great |
| P1 | 1.3 ErrorBoundary fix | Medium | Low | Great |
| P2 | 2.5 React.memo audit | Medium | Medium | Good |
| P2 | 3.1 Perceived performance | High | Medium | Good |
| P2 | 3.2 Mobile responsiveness | High | High | Good |
| P3 | 3.3 Accessibility | Medium | High | Good |
| P3 | 3.4 Audio polish | Medium | Medium | Okay |
| P3 | 4.1 Error tracking | Medium | Low | Okay |
| P4 | 4.2 PWA support | Medium | Medium | Okay |
| P4 | 5.1-5.4 Advanced | Low-Med | High | Low |

---

## Expected Results After Full Optimization

| Metric | Before | After |
|--------|--------|-------|
| First Contentful Paint | ~3-5s | < 1s |
| Time to Interactive | ~5-8s | < 2s |
| Main JS Bundle (gzipped) | ~120 KB | < 80 KB |
| Total Assets | 34 MB | < 8 MB |
| Lighthouse Performance | ~55-65 | 90+ |
| Lighthouse Accessibility | ~60-70 | 95+ |
| Mobile Experience | Untested | Fully responsive |
| Offline Support | None | Core gameplay cached |
