# Code Review — Mines-Game

> Real stack: Vite 8 + React 19 + TypeScript 6 (strict, noUncheckedIndexedAccess) + TanStack Query 5 + Zustand 5 + Tailwind 4 + shadcn/ui + Vitest 4.
> `.claude/doc-mapping.json` does not exist in this repo — no project rule files to verify against; review is based on the skill categories and the real ESLint config.

## Summary

The project is in good shape overall: FSD slices are mostly clean, Zustand is used with selectors everywhere, server state lives in TanStack Query, there is no `any`, no `!important`, no inline styles, and money math is centralized in `mulCents`. The two structural problems are **upward/cross-entity imports** (`entities/balance → features/out-of-funds`, `entities/cell ↔ entities/game` circular dependency) and a couple of real runtime defects (error state unreachable in `HistoryList`, `OutOfFundsModal` mounted twice). Tooling note: the repo has CRLF line endings while Prettier expects LF, so `eslint .` reports ~3000 `Delete ␍` errors on every file — lint is effectively unusable until this is fixed.

## Rules compliance

`.claude/doc-mapping.json` is absent, so there are no project rule files to check. Verdict table is limited to the ESLint config as the only in-repo rule source:

| Rule file           | Applies to   | Verdict | Notes                                                                                                                        |
| ------------------- | ------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `eslint.config.mjs` | all `src/**` | ❌ FAIL | `prettier/prettier` fails repo-wide (CRLF, issue #1); `react-hooks/exhaustive-deps` warn in `useStaggeredReveal` (issue #12) |

## Issues

1. **tooling**: repo-wide — CRLF line endings make `prettier/prettier` fail with ~3000 `Delete ␍` errors; lint gate is dead.
2. **architecture (FSD)**: `src/entities/balance/ui/BalanceDisplay.tsx:4` — entity imports a feature (`@/features/out-of-funds`), an upward dependency that inverts the FSD layer order.
3. **bug**: `src/widgets/control-panel/ui/ControlPanel.tsx:40,55` — `BalanceDisplay` is rendered twice (mobile + desktop), and since it renders `OutOfFundsModal` internally, two dialogs mount and open simultaneously when balance hits 0.
4. **architecture (FSD)**: `src/entities/cell/ui/CellIcon.tsx:1`, `src/entities/cell/ui/Cell.tsx:6` — `entities/cell` imports the `@/entities/game` barrel while `entities/game/lib/buildBoardState.ts:1` imports `@/entities/cell` — a cross-entity **circular dependency** (it already breaks module init under Vitest: `CELL_TYPE` is `undefined` in `CellIcon` when the cycle is entered from the game side).
5. **architecture (FSD)**: `src/entities/history/model/types.ts:1`, `src/entities/history/ui/HistoryItem.tsx:2` — `entities/history` imports from `entities/game` (`GameStatus`, `GAME_STATUS`), another cross-entity dependency.
6. **bug**: `src/entities/history/ui/HistoryList.tsx:15-29` — the `isError` branch is unreachable: on error `data` is `undefined` → `history.length === 0` matches first and the user sees "No games yet" instead of "Failed to load history".
7. **TypeScript**: `src/app/providers/AppInitializer.tsx:1`, `src/widgets/control-panel/ui/InfoStats.tsx:1`, `src/shared/ui/types.ts:1` — statements importing ONLY types use inline `import { type X }` instead of `import type { X }`.
8. **TypeScript**: `src/widgets/control-panel/ui/ControlPanel.tsx:10` — props type named `ActiveGamePanelProps` instead of the conventional `Props`.
9. **TypeScript**: `src/entities/game/api/queries.ts:8` — non-null assertion `gameApi.getById(gameId!)`; `enabled` does not narrow the type. (`@typescript-eslint/no-non-null-assertion` is `warn` in this config.)
10. **dead code**: `src/shared/lib/playerId.ts:16` — `resetPlayerId` is exported but never imported anywhere.
11. **dead code**: unused barrel exports — `useBetStore` (`features/place-bet/index.ts:4`), `validateBet` (`features/place-bet/index.ts:6`), `useMinesStore` (`features/select-mines/index.ts:2`), `useSoundStore` (`features/toggle-sound/index.ts:2`), `HistoryEntry`/`HistoryResponse` (`entities/history/index.ts:5`), `CountUpProps` re-export (`shared/ui/CountUp.tsx:30`) — none are consumed outside their slices.
12. **ESLint (exhaustive-deps)**: `src/entities/game/model/useStaggeredReveal.ts:38-44` — the effect reads `revealState.gameId` but deps are `[hasFullBoard, gameId]`; stale-closure risk and a `react-hooks/exhaustive-deps` warning.
13. **hardcoded**: `src/features/place-bet/ui/BetAmountInput.tsx:65` — Tailwind palette class `text-slate-600` instead of a semantic token (`text-text-muted`).
14. **hardcoded**: `src/app/App.tsx:7` — palette class `selection:bg-blue-500/30` instead of a semantic token (`--color-active-blue` exists in the theme).
15. **hardcoded**: `src/shared/lib/sounds/soundManager.ts:5-9` — `volume: 0.4` repeated 5×; `src/features/place-bet/model/useBetStore.ts:13,21,27` — default bet `10.0` repeated 3×; `src/shared/ui/LoadingOverlay.tsx:15` — magic `z-[100]` while the theme defines `--z-header`.
16. **DRY**: `queryClient.setQueryData(balanceKeys.all, { balance })` repeated 3× — `useCashOut.ts:19`, `useStartGame.ts:21`, `useRevealCellAction.ts:35`.
17. **a11y / correctness**: `src/features/toggle-sound/ui/SoundToggle.tsx:9` — `<button>` without `type="button"` (defaults to `submit`).
18. **state (Zustand persist)**: `src/features/select-mines/model/useMinesStore.ts:16`, `src/features/toggle-sound/model/useSoundStore.ts:17` — persisted stores without `partialize`/`version` (bet store has both); persisted shape is untyped and inconsistent across stores.

## Recommendations

### 1) Normalize line endings so lint works

`#PR:` chore: enforce LF line endings via gitattributes

`#CODE:`

```gitattributes
# .gitattributes (new file, repo root)
# Prettier expects LF; Windows checkouts currently produce CRLF and ~3000 lint errors
* text=auto eol=lf
```

Then re-normalize once: `git add --renormalize . && npx prettier --write .`

### 2 + 3) Lift OutOfFundsModal out of the entity and mount it once

`#PR:` refactor(balance): remove feature import from entity, mount OutOfFundsModal once at page level

`#CODE:`

```tsx
// src/entities/balance/ui/BalanceDisplay.tsx
// Remove: import { OutOfFundsModal } from '@/features/out-of-funds';
// Remove <OutOfFundsModal /> from JSX — entity must not know about features.

// src/pages/game/ui/GamePage.tsx — single mount point
import { OutOfFundsModal } from '@/features/out-of-funds';
// ...inside the root div, once:
<OutOfFundsModal />;
```

### 4) Break the cell ↔ game entity cycle

`#PR:` refactor(entities): move CellType to shared to break cell/game circular dependency

`#CODE:`

```ts
// src/shared/config/game.ts — CELL_TYPE is a grid primitive, not game-API state
export const CELL_TYPE = { GEM: 'gem', MINE: 'mine' } as const;
export type CellType = (typeof CELL_TYPE)[keyof typeof CELL_TYPE];

// src/entities/game/model/types.ts — re-export for API types:
import { CELL_TYPE, type CellType } from '@/shared/config/game';

// src/entities/cell/ui/CellIcon.tsx / Cell.tsx — import from shared, not entities/game:
import { CELL_TYPE, type CellType } from '@/shared/config/game';
```

This also lets `GameBoard.test.tsx` drop its `@/entities/cell` mock.

### 5) Decouple history from game

`#PR:` refactor(history): stop importing entities/game

`#CODE:`

```ts
// src/entities/history/model/types.ts
// GameStatus is a shared domain primitive — move it next to CELL_TYPE:
import type { GameStatus } from '@/shared/config/game';
```

(Move `GAME_STATUS`/`GameStatus` to `shared/config/game.ts` alongside `CELL_TYPE`; `entities/game` re-exports them for its API.)

### 6) Fix unreachable error state in HistoryList

`#PR:` fix(history): show error state before empty state

`#CODE:`

```tsx
// src/entities/history/ui/HistoryList.tsx — check isError BEFORE emptiness
if (isLoading) {
  /* skeletons */
}
if (isError) {
  /* "Failed to load history" */
}
if (history.length === 0) {
  /* "No games yet" */
}
```

### 7) Use `import type` for type-only imports

`#PR:` style(ts): use import type for type-only import statements

`#CODE:`

```ts
// src/app/providers/AppInitializer.tsx:1
import type { ReactNode } from 'react';
// src/widgets/control-panel/ui/InfoStats.tsx:1
import type { Game } from '@/entities/game';
// src/shared/ui/types.ts:1
import type { ComponentProps } from 'react';
```

### 8) Rename ActiveGamePanelProps → Props

`#PR:` style(control-panel): conventional Props naming

`#CODE:`

```tsx
// src/widgets/control-panel/ui/ControlPanel.tsx:10
interface Props { gameId: string }
const ActiveGamePanel = ({ gameId }: Props) => { ... }
```

(Or extract `ActiveGamePanel` to its own file — it uses hooks and is a full component.)

### 9) Remove non-null assertion in useGame

`#PR:` refactor(game): drop gameId! assertion

`#CODE:`

```ts
// src/entities/game/api/queries.ts
queryFn: () => {
  if (!gameId) return Promise.reject(new Error('gameId required'));
  return gameApi.getById(gameId);
},
```

### 10 + 11) Delete dead exports

`#PR:` chore: remove unused exports

`#CODE:`

```ts
// src/shared/lib/playerId.ts — delete resetPlayerId (unused)
// src/features/place-bet/index.ts — drop useBetStore, validateBet from barrel
// src/features/select-mines/index.ts — drop useMinesStore
// src/features/toggle-sound/index.ts — drop useSoundStore
// src/entities/history/index.ts — drop HistoryEntry, HistoryResponse re-exports
// src/shared/ui/CountUp.tsx — drop `export type { CountUpProps }`
```

### 12) Fix stale dep in useStaggeredReveal

`#PR:` fix(game): correct effect deps in useStaggeredReveal

`#CODE:`

```ts
// src/entities/game/model/useStaggeredReveal.ts:44
}, [hasFullBoard, gameId, revealState.gameId]);
```

### 13 + 14) Replace palette classes with semantic tokens

`#PR:` style: semantic color tokens instead of raw palette

`#CODE:`

```tsx
// src/features/place-bet/ui/BetAmountInput.tsx:65
<div className="... text-text-muted">$</div>
// src/app/App.tsx:7
<div className="text-white selection:bg-active-blue/30">
```

### 15) Extract magic numbers

`#PR:` refactor(config): extract sound volume, default bet, overlay z-index

`#CODE:`

```ts
// src/shared/lib/constants/sounds.ts
export const SOUND_VOLUME = 0.4;
// soundManager.ts: volume: SOUND_VOLUME (одна константа замість 5 копій)

// src/shared/config/game.ts
export const DEFAULT_BET = 10;
// useBetStore.ts: використати DEFAULT_BET у initial state і в migrate (3 місця)
```

### 16) Single helper for balance cache updates

`#PR:` refactor(balance): setBalanceCache helper

`#CODE:`

```ts
// src/entities/balance/model/setBalanceCache.ts
import type { QueryClient } from '@tanstack/react-query';
import { balanceKeys } from './queryKeys';

export const setBalanceCache = (qc: QueryClient, balance: number | undefined) => {
  if (balance !== undefined) qc.setQueryData(balanceKeys.all, { balance });
};
// Використати в useCashOut, useStartGame, useRevealCellAction замість 3 копій
```

### 17) Add type="button" to SoundToggle

`#PR:` fix(a11y): explicit button type in SoundToggle

`#CODE:`

```tsx
// src/features/toggle-sound/ui/SoundToggle.tsx:9
<button type="button" onClick={toggleMute} ...>
```

### 18) Consistent persisted-store shape

`#PR:` refactor(stores): partialize + version for mines and sound stores

`#CODE:`

```ts
// src/features/select-mines/model/useMinesStore.ts
type PersistedMines = Pick<MinesState, 'minesCount'>;
persist((set) => ({ ... }), {
  name: 'mines-count-storage',
  version: 1,
  partialize: (s): PersistedMines => ({ minesCount: s.minesCount }),
});
// Аналогічно для useSoundStore (isMuted)
```

## Checklist

| Requirement       | Before                                                                       | After                                  |
| ----------------- | ---------------------------------------------------------------------------- | -------------------------------------- |
| FSD shape         | ❌ entity→feature import; cell↔game cycle; history→game                      | ✅ layers strictly downward, no cycles |
| DRY               | ⚠️ balance cache ×3, volume ×5, default bet ×3                               | ✅ single helpers/constants            |
| Dead code         | ⚠️ `resetPlayerId` + 6 unused barrel exports                                 | ✅ removed                             |
| No hard-coded     | ⚠️ `text-slate-600`, `blue-500/30`, `z-[100]`, `0.4`, `10.0`                 | ✅ semantic tokens + config constants  |
| State             | ✅ selectors everywhere, render-phase adjust pattern used correctly          | ✅ + typed persisted shape             |
| TypeScript strict | ✅ no `any`; ⚠️ 2 non-null assertions, 3 inline type-imports, 1 Props naming | ✅ clean                               |
| Lint gate         | ❌ ~3000 CRLF prettier errors                                                | ✅ LF enforced via .gitattributes      |
