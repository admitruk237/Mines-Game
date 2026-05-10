import { useEffect, useMemo, useState } from 'react';
import type { Game, RevealedCell } from './types';
import { GRID_SIZE } from '@/shared/config';

const STAGGER_DELAY_MS = 100;

interface RevealState {
  index: number;
  gameId: string | null;
}

export const useStaggeredReveal = (game: Game | null) => {
  const [revealState, setRevealState] = useState<RevealState>({ index: 0, gameId: null });

  const hasFullBoard = Boolean(game?.fullBoard);
  const gameId = game?.gameId ?? null;

  const playerOpened = useMemo(() => {
    const set = new Set<string>();
    game?.revealedCells?.forEach((rc: RevealedCell) => set.add(`${rc.row}-${rc.col}`));
    return set;
  }, [game]);

  const animOrder = useMemo(() => {
    if (!hasFullBoard) return [];
    const order: string[] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const key = `${r}-${c}`;
        if (!playerOpened.has(key)) {
          order.push(key);
        }
      }
    }
    return order;
  }, [hasFullBoard, playerOpened]);

  useEffect(() => {
    if (hasFullBoard && gameId && revealState.gameId !== gameId) {
      setRevealState({ index: 0, gameId });
    } else if (!hasFullBoard && revealState.gameId !== null) {
      setRevealState({ index: 0, gameId: null });
    }
  }, [hasFullBoard, gameId]);

  useEffect(() => {
    if (!hasFullBoard || animOrder.length === 0) return;
    if (revealState.index >= animOrder.length) return;

    const timer = setTimeout(() => {
      setRevealState((prev) => ({ ...prev, index: prev.index + 1 }));
    }, STAGGER_DELAY_MS);
    return () => clearTimeout(timer);
  }, [hasFullBoard, revealState.index, animOrder.length]);

  const hiddenSet = useMemo(() => {
    const set = new Set<string>();
    if (!hasFullBoard) return set;

    if (animOrder.length > 0) {
      for (let i = revealState.index; i < animOrder.length; i++) {
        const item = animOrder[i];
        if (item !== undefined) set.add(item);
      }
    } else {
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          const key = `${r}-${c}`;
          if (!playerOpened.has(key)) set.add(key);
        }
      }
    }

    return set;
  }, [hasFullBoard, animOrder, revealState.index, playerOpened]);

  const isRevealComplete =
    hasFullBoard && animOrder.length > 0 && revealState.index >= animOrder.length;

  return { hiddenSet, isRevealComplete };
};
