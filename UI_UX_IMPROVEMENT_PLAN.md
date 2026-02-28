# Cost of Success - Game Interface & UX Improvement Plan

> Deep audit of every UI layer: dialogue system, HUD, menus, dashboard, "Did You Know", text speed, tooltips, overlays, mobile, and visual hierarchy.

---

## EXECUTIVE SUMMARY: 12 Critical Issues Found

| # | Component | Issue | Severity |
|---|-----------|-------|----------|
| 1 | DialogueBox | "Did You Know" uses `Math.random()` in render - flickers on every re-render | **Critical Bug** |
| 2 | DialogueBox | Choices render ABOVE the dialogue (bottom-full) - off-screen on short viewports | **High** |
| 3 | GameHUD | 9 buttons in desktop dock - information overload, no grouping | **High** |
| 4 | GameHUD | Mobile dock conflicts with DialogueBox (both at bottom) | **High** |
| 5 | Text Speed | Only 3 fixed speeds (60ms/30ms/0ms), no smooth slider | **Medium** |
| 6 | Text Speed | Speed button on DialogueBox is tiny (10px font, gray) - most players won't find it | **Medium** |
| 7 | CostDashboard | All data is hardcoded mock values (65%, 88%, 12.5%) - not connected to game state | **High** |
| 8 | MarketTicker | Scrolling text moves too fast (25s for ~100 chars) and is hard to read | **Medium** |
| 9 | Tooltips | Hover-only tooltips are unusable on mobile/touch devices | **High** |
| 10 | Z-index chaos | 6 different z-index values (50, 100, 110, 200, 999) with no system | **Medium** |
| 11 | Phase Transition | Fixed 2.5s duration blocks gameplay even after assets loaded | **Medium** |
| 12 | Character Display | 82vh height clips on short screens, no portrait/landscape adaptation | **Medium** |

---

## 1. DIALOGUE BOX - Complete Redesign

### Current Layout (bottom-anchored, absolute positioned)
```
┌──────────────────────────────────────────┐
│                                          │
│            [Character Image]             │
│                                          │
│   ┌── Choice Buttons ──┐  ← ABOVE box   │
│   │ Option A            │  (can go       │
│   │ Option B            │   off-screen)  │
│   └─────────────────────┘                │
│   ┌── Speaker ──┐  ┌─ Speed ─┐          │
│   │ JULES       │  │ SPD:1x  │  ← tiny  │
│   ├─────────────────────────────────┤    │
│   │ Dialogue text here...           │    │
│   │ Click to Continue ▼             │    │
│   │                                 │    │
│   │ ┌ Did You Know? ┐ ← BROKEN     │    │
│   │ │ Random render  │  (flickers)  │    │
│   └─────────────────────────────────┘    │
└──────────────────────────────────────────┘
```

### Proposed Layout
```
┌──────────────────────────────────────────┐
│                                          │
│  [Character LEFT]      [Character RIGHT] │
│                                          │
│                                          │
│  ┌───────────────────────────────────┐   │
│  │ ┌SPEAKER─┐  ┌SPD──┐  ┌─DYK?──┐  │   │
│  │ │ JULES  │  │ ▶▶  │  │ 💡    │  │   │
│  │ ├─────────────────────────────┤   │   │
│  │ │ Dialogue text here...       │   │   │
│  │ │                             │   │   │
│  │ ├─────────────────────────────┤   │   │
│  │ │ [Choice A]  [Choice B]      │   │   │ ← INSIDE box
│  │ │               ▼ Continue    │   │   │
│  │ └─────────────────────────────┘   │   │
│  └───────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

### 1.1 Fix: "Did You Know" Random Render Bug (P0)
**File:** `DialogueBox.tsx:165`
```tsx
// BUG: Math.random() in render body - runs on EVERY re-render
{!isTyping && Math.random() > 0.7 && !choices?.length && (
    <div>...</div>  // This flickers because random changes each render
)}
```
**Fix:** Move random decision into a `useMemo` or `useState` that calculates once per dialogue node:
```tsx
const [showDYK] = useState(() => Math.random() > 0.7);
// Then in JSX:
{!isTyping && showDYK && !choices?.length && <DidYouKnow />}
```

### 1.2 Move Choices INSIDE the Dialogue Box (P0)
**Problem:** Choices use `absolute bottom-full mb-4` - they render ABOVE the dialogue box and can fly off the top of the viewport on small screens or when dialogue is short.
**Fix:** Move choices to render BELOW the text content, inside the glass panel. Stagger animation stays but direction changes to slide-up from within.

### 1.3 Promote Speed Control to a Visible Icon Row (P1)
**Problem:** Speed button is `text-[10px] text-gray-400` - barely visible, especially during gameplay.
**Fix:**
- Replace text label with icon-based speed indicator: `▶` (slow) `▶▶` (normal) `▶▶▶` (instant)
- Place in the speaker name bar at same visual weight as speaker name
- Add tooltip on hover explaining what it does
- Consider adding keyboard shortcut hint: `[Tab] Speed`

### 1.4 Extract "Did You Know" as a Dedicated Component (P1)
**Problem:** Inline in DialogueBox, uses `absolute -top-16` positioning (overlaps with elements above), and the random fact only shows during dialogue without choices (narrow window).
**Fix:**
- Create `<DidYouKnow />` component with its own state management
- Show it as a slide-in panel from the side (right edge) or top, not overlapping dialogue
- Trigger it once per phase transition (not per dialogue node)
- Add a small `💡` icon button in the dialogue header bar to toggle it manually
- Track which facts have been shown to avoid repetition

### 1.5 Add Click-to-Skip Safety for Choices (P1)
**Problem:** Clicking to skip typewriter also triggers `onComplete` if no choices. But the click target is the entire glass panel, so accidental double-clicks advance past important dialogue.
**Fix:**
- Add a brief cooldown (300ms) after typing completes before enabling advance
- Or require a distinct "Continue" button click rather than anywhere-click
- On mobile: support swipe-up gesture as alternative to click

### 1.6 Tooltip System Mobile Fix (P0)
**Problem:** `group-hover:opacity-100` tooltips are completely invisible on touch devices.
**Fix:**
- Add `group-active:opacity-100` (already partially there but unreliable)
- Better: convert tooltips to click/tap-to-show with a close button
- Add a small `ⓘ` icon next to highlighted terms to indicate they're interactive
- Use `position: fixed` for tooltip popup to prevent overflow clipping

---

## 2. GAME HUD - Declutter & Restructure

### Current Desktop HUD (9 buttons in one row)
```
[🔊] [EN] [?] [🆘] [👕] [📊] [📈] [🧋] [||]
```
**Problem:** 9 unlabeled emoji buttons with no grouping. Users can't tell 📊 (Share) from 📈 (Dashboard). The Discord button (🆘) pulses with `animate-pulse` which is distracting during gameplay.

### Proposed Desktop HUD - Grouped & Labeled
```
┌─ TOP BAR ──────────────────────────────────────────────┐
│                                                         │
│  [Sanity]         [Market Ticker]          [$Budget]    │
│                                                         │
│  ── Quick Actions (top-right, collapsed) ──             │
│  [⚙ Settings ▾]  → Sound, Language, Speed              │
│  [📖 Handbook]                                          │
│  [⏸ Pause]                                              │
│                                                         │
│  ── Bottom Center ──                                    │
│  [Phase: 5/35 ━━━━━━━━━━━━━━━━━━━━ 14%]               │
│                                                         │
│  ── Contextual (only when relevant) ──                  │
│  [🧋 Boba Shop] [👕 Wardrobe] [📊 Stats]               │
└─────────────────────────────────────────────────────────┘
```

### 2.1 Group Buttons into Categories (P0)
**Settings group** (collapse into dropdown): Sound toggle, Language, Text Speed
**Game actions** (always visible): Handbook, Pause
**Shop/Social** (contextual, show after Phase 3): Boba Shop, Wardrobe, Dashboard, Share

### 2.2 Stop the Discord Button Pulsing (P0)
**File:** `GameHUD.tsx:75`
The `animate-pulse` on the Discord button is visually aggressive during gameplay. Reserve pulse for urgent states only (low sanity, achievement unlock).

### 2.3 Add Labels to HUD Buttons (P1)
On desktop, show a tiny label below each icon on hover. On mobile, use a bottom sheet with labeled rows instead of icon-only dock.

### 2.4 Mobile Dock: Move Above DialogueBox (P0)
**Problem:** Mobile dock is at `mb-6` (bottom), DialogueBox is at `bottom-4`. They overlap.
**Fix:**
- Move mobile dock to TOP of screen (below sanity/budget)
- Or convert to a hamburger menu that opens a slide-out panel
- Keep only 3 essential buttons visible: Pause, Handbook, Sound

### 2.5 Market Ticker - Slow Down & Make Readable (P1)
**File:** `MarketTicker.tsx:45`
```tsx
animate={{ x: [400, -1000] }}
transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
```
**Problems:**
- Text starts at x:400 (off-screen right) and goes to x:-1000 (off-screen left) in 25s
- Most of the animation the text is invisible or partially visible
- Hard-coded OAR "12.5%" and "HYPE: STABLE" values are static fake data

**Fix:**
- Use CSS `marquee` or slower scroll with pause-on-hover
- Or replace with a static banner that swaps content every 20s with fade transition
- Remove fake OAR/HYPE values from the ticker - use actual game state

---

## 3. TEXT SPEED SYSTEM - Full Overhaul

### Current Implementation
```
Three fixed values:
  60ms → "SLOW" (0.5x)
  30ms → "NORMAL" (1x)
  0ms  → "INSTANT" (MAX)
```

### Problems Found
1. **Cycle order is confusing:** Normal(30) → Instant(0) → Slow(60) → Normal. Users expect Slow → Normal → Fast → Instant
2. **No visual feedback** during speed change (no toast, no animation)
3. **Speed persists in localStorage** but there's no indicator showing current speed when resuming a session
4. **PauseMenu speed buttons** and **DialogueBox speed button** are disconnected UX - users find one but not the other
5. **No keyboard shortcut** to change speed during dialogue

### Proposed Speed System
```
Speeds:    SLOW (60ms)  →  NORMAL (30ms)  →  FAST (15ms)  →  INSTANT (0ms)
Labels:    ▶            →  ▶▶             →  ▶▶▶          →  ⏩
Keys:      [1]             [2]               [3]              [4]
```

### 3.1 Add a 4th Speed: FAST (15ms) (P1)
Gap between 30ms and 0ms is too large. 15ms gives a "speed reader" option that still shows typing animation.

### 3.2 Unify Speed Controls (P1)
- Show speed indicator in DialogueBox header (always visible)
- Show speed in PauseMenu settings
- Both update the same state, both show current selection
- Add keyboard shortcuts: `1/2/3/4` or `Tab` to cycle

### 3.3 Add Speed Change Feedback (P2)
When speed changes, briefly flash the new speed label on screen (micro-toast, 500ms).

---

## 4. "DID YOU KNOW" - From Broken to Brilliant

### Current Problems
1. **Math.random() in render** - shows/hides randomly on every React re-render (critical bug)
2. **Only 5 facts total** (EN) / 5 facts (VI) - repetitive quickly
3. **Appears as `absolute -top-16`** - overlaps content above the dialogue box
4. **Only shows when no choices** - narrow appearance window
5. **No way to dismiss** or see it again
6. **Not connected to current phase topic** - shows random generic facts regardless of what chapter the player is in

### Proposed Design
```
┌─────────────────────────────────┐
│ 💡 DID YOU KNOW?           [×] │
│ ─────────────────────────────── │
│ Absorption costing is required  │
│ by IFRS for external reporting. │
│                                 │
│ RELATED: Phase 9               │
│         ──────── 3/47 facts     │
└─────────────────────────────────┘
```

### 4.1 Phase-Contextual Facts (P1)
Instead of a global random pool, organize facts by phase topic:
```ts
const PHASE_FACTS: Record<string, string[]> = {
  'PHASE_1': ["Prime Cost = Direct Materials + Direct Labor.", ...],
  'PHASE_9': ["Absorption costing includes fixed overheads in unit cost.", ...],
  // ...
};
```
Show facts relevant to the current or most recent phase.

### 4.2 Dedicated DYK Trigger (P1)
- Add a `💡` button in the dialogue header bar
- Clicking it shows the current phase's fact in a slide-in panel
- Auto-show once per phase (first dialogue node), then manual thereafter
- Track seen facts in state to avoid repeats

### 4.3 Expand Fact Pool (P2)
Current: 5 facts per language. Target: 3-5 facts per phase (105-175 total for 35 phases).

---

## 5. COST DASHBOARD - Connect to Reality

### Current State: All Fake Data
```tsx
const primeCostPercent = 65;      // hardcoded
const periodCostPercent = 35;     // hardcoded
const breakEvenPoint = 1200;      // hardcoded
const currentEfficiency = 88;     // hardcoded
const dataPoints = [40, 60, 45, 70, 55, 80, 75];  // hardcoded
```
The dashboard looks beautiful but shows zero real game data.

### 5.1 Connect Charts to Game State (P1)
```tsx
// Derive from actual game progress
const primeCostPercent = calculateFromPhaseScores(state);
const efficiencyTrend = state.phaseScores.map(s => s.score / s.maxScore * 100);
const budgetHistory = state.budgetHistory; // need to track this in reducer
```
Required state additions:
- `phaseScores: { phase: string, score: number, maxScore: number }[]`
- `budgetHistory: number[]` (snapshot budget at each phase end)
- `sanityHistory: number[]`

### 5.2 Add Meaningful Sections (P2)
- **Phase Completion Map:** Visual grid showing completed/current/locked phases
- **Performance Breakdown:** Score per phase as bar chart
- **Budget Over Time:** Line chart using actual budget snapshots
- **Streak History:** Best streaks per phase

### 5.3 Make Dashboard Read-Only During Gameplay (P2)
Currently opens as a full-screen overlay that pauses nothing. Sanity still decays while browsing the dashboard. Either pause decay while dashboard is open, or show a mini-dashboard in the HUD.

---

## 6. BOBA SHOP - Minor Polish

### Currently Working Well
The Boba Shop is one of the most polished components. Minor improvements:

### 6.1 Add Quantity Feedback (P2)
After purchase, show a brief "gulp" animation or confetti burst. Currently only a toast message.

### 6.2 Add Purchase History (P3)
Track total boba purchased for achievement tracking:
- "Boba Connoisseur" - Buy all 3 types
- "Boba Dependent" - Buy 10 bobas total

### 6.3 Dynamic Pricing Based on Market Events (P2)
When "FABRIC SHORTAGE" market event is active, boba prices should increase. Ties the shop into the market volatility system.

---

## 7. Z-INDEX ARCHITECTURE - Establish a System

### Current Chaos
```
z-50   → DialogueBox, CostDashboard, BobaShop (CONFLICT)
z-100  → GameHUD, LoadingScreen, XPToast
z-110  → ComboCounter
z-200  → PauseMenu, Handbook, FeedbackModal, WardrobeModal, AchievementPopup
z-999  → PhaseTransition
```
**Problem:** DialogueBox, CostDashboard, and BobaShop all share z-50. If multiple are open simultaneously, they stack unpredictably.

### Proposed Z-Index Scale
```
Layer 0:   z-0     Background, parallax
Layer 1:   z-10    Game content (characters, gameplay components)
Layer 2:   z-20    DialogueBox, quiz interfaces
Layer 3:   z-30    HUD elements (sanity, budget, market ticker)
Layer 4:   z-40    Toasts, combo counter, "Did You Know"
Layer 5:   z-50    Modals (Dashboard, BobaShop, Wardrobe, Share)
Layer 6:   z-60    Critical modals (PauseMenu, Handbook, Feedback)
Layer 7:   z-70    Achievement popups
Layer 8:   z-80    Phase transitions
Layer 9:   z-90    Loading screen (absolute top)
```
Define as CSS custom properties or a constants file for consistency.

---

## 8. OVERLAY & MODAL MANAGEMENT

### 8.1 Prevent Multiple Modal Stacking (P0)
**Problem:** Nothing prevents opening BobaShop while Dashboard is open, or Handbook while Wardrobe is open. All modals render independently.

**Fix:** Add `activeModal` state to GameContext:
```ts
type ModalType = 'HANDBOOK' | 'PAUSE' | 'FEEDBACK' | 'WARDROBE' |
                 'SHARE' | 'DASHBOARD' | 'BOBA_SHOP' | null;

// In state:
activeModal: ModalType;

// In reducer:
case 'OPEN_MODAL':
  return { ...state, activeModal: action.payload };
case 'CLOSE_MODAL':
  return { ...state, activeModal: null };
```
Only one modal can be open at a time. Opening a new one closes the previous.

### 8.2 Add Escape Key to Close Any Modal (P1)
Currently no keyboard dismiss. Add global `keydown` listener:
```tsx
useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') dispatch({ type: 'CLOSE_MODAL' });
  };
  window.addEventListener('keydown', handleEsc);
  return () => window.removeEventListener('keydown', handleEsc);
}, []);
```

### 8.3 Click-Outside-to-Close for All Modals (P1)
Some modals have this (WardrobeModal), most don't. Standardize: clicking the backdrop overlay closes the modal.

### 8.4 Pause Sanity Decay When Any Modal is Open (P1)
**File:** `GameContext.tsx:265`
Currently only pauses for `isMenuOpen || isHandbookOpen || isFeedbackOpen`. Should also pause for Dashboard, BobaShop, Wardrobe, and Share modal. With the proposed `activeModal` state, this becomes:
```tsx
const isPaused = state.activeModal !== null;
```

---

## 9. PHASE TRANSITION - Tighten the Experience

### 9.1 Reduce Fixed Duration (P1)
**File:** `PhaseTransition.tsx:44`
```tsx
const timer = setTimeout(() => setIsActive(false), 2500);
```
2.5 seconds of unskippable transition is too long after the first few phases. Reduce to 1.5s, or better: make it skippable with a click/tap after 0.8s minimum display.

### 9.2 Remove Unused `systemLogs` (P2)
Lines 15-23 generate 5 system log strings but never render them. Dead code.

### 9.3 Show Phase Number + Short Description (P1)
Currently shows only the phase title. Add:
```
PHASE 12 OF 35
THE BEHAVIOR SORT
"Classify costs by how they move"
```

---

## 10. CHARACTER DISPLAY - Viewport Adaptation

### 10.1 Reduce Character Height on Short Viewports (P1)
**File:** `CharacterDisplay.tsx:104`
```tsx
className="h-[60vh] md:h-[82vh]"
```
82vh means the character takes 82% of viewport height on desktop. On a 768px height laptop, that's 630px for the character, leaving only 138px for dialogue + HUD.

**Fix:** Use a dynamic calculation:
```tsx
className="h-[50vh] md:h-[65vh] lg:h-[75vh] max-h-[600px]"
```

### 10.2 Hide Characters During Quiz/Gameplay Subphases (P2)
Characters only show during `subPhase === 'DIALOGUE'` (already implemented in Phase1). Verify all 35 phases follow this pattern.

---

## 11. MOBILE-SPECIFIC FIXES

### 11.1 Touch Target Sizes (P0)
Several buttons are below the 44x44px minimum:
- Speed control button: `px-3 py-1 text-[10px]` (~30x20px)
- Phase select buttons in PauseMenu: `px-4 py-3` (OK height, narrow width)
- Rating buttons in FeedbackModal: `w-10 h-10` (40x40, nearly OK)

**Fix:** Ensure minimum 44x44px touch targets on all interactive elements.

### 11.2 Dialogue Box on Mobile (P0)
```tsx
className="absolute bottom-4 left-4 right-4 md:left-20 md:right-20 lg:left-40 lg:right-40"
```
On mobile: 4px margins on all sides. With character taking 60vh and HUD at top, the dialogue gets squeezed.

**Fix:**
- On mobile, make dialogue box take full width (no side margins)
- Reduce padding from `p-7` to `p-4`
- Reduce font from `text-lg` to `text-base`

### 11.3 PauseMenu Level Select Scrollable Area (P1)
```tsx
<div className="max-h-40 overflow-y-auto">
```
160px for 35 phase buttons means heavy scrolling. On mobile this is frustrating.

**Fix:** Use a collapsible accordion grouped by chapter, or a grid layout:
```
[Ch.1-5] [Ch.6-11] [Ch.12-23] [Ch.24-35]
```

---

## 12. KEYBOARD SHORTCUTS - Game Feel Enhancement

### Proposed Keyboard Map
| Key | Action |
|-----|--------|
| `Space` / `Enter` | Advance dialogue / Skip typing |
| `Escape` | Close current modal / Open pause menu |
| `Tab` | Cycle text speed |
| `1-4` | Set text speed directly |
| `H` | Toggle handbook |
| `M` | Toggle mute |
| `B` | Toggle boba shop |
| `P` | Pause/unpause |

None of these exist currently. Adding them dramatically improves game feel for keyboard users.

---

## IMPLEMENTATION PRIORITY

### Sprint 1: Critical Bugs & Blockers (1 day)
- [ ] Fix "Did You Know" Math.random() render bug
- [ ] Move choices inside dialogue box
- [ ] Fix mobile dock / dialogue overlap
- [ ] Prevent multiple modal stacking
- [ ] Add Escape key to close modals

### Sprint 2: HUD & Navigation (2 days)
- [ ] Group HUD buttons into categories
- [ ] Stop Discord button pulsing
- [ ] Slow down market ticker
- [ ] Establish z-index system
- [ ] Pause sanity decay for all modals
- [ ] Reduce phase transition to 1.5s + skippable

### Sprint 3: Text Speed & Dialogue Polish (1 day)
- [ ] Add 4th speed (FAST / 15ms)
- [ ] Unify speed controls
- [ ] Add keyboard shortcuts
- [ ] Promote speed indicator visibility
- [ ] Add advance cooldown to prevent double-click skipping

### Sprint 4: Dashboard & DYK (2 days)
- [ ] Connect dashboard to real game data
- [ ] Add phaseScores tracking to reducer
- [ ] Create phase-contextual DYK facts
- [ ] Extract DYK as dedicated component with toggle button
- [ ] Add budget/sanity history tracking

### Sprint 5: Mobile & Polish (2 days)
- [ ] Touch target audit (44x44px minimum)
- [ ] Mobile dialogue box full-width
- [ ] Character height responsive scaling
- [ ] PauseMenu level select grid
- [ ] Click-outside-to-close on all modals
- [ ] Tooltip tap-to-show for mobile
