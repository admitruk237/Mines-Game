import { useEffect, useState } from 'react';
import type { Game, RevealedCell } from './types';
import { GRID_SIZE } from '@/shared/config';

const STAGGER_DELAY_MS = 100;

interface AnimationState {
  order: string[];
  revealIndex: number;
  gameId: string | null;
}

export const useStaggeredReveal = (game: Game | null) => {
  const [animState, setAnimState] = useState<AnimationState>({
    order: [],
    revealIndex: 0,
    gameId: null,
  });

  const [playerOpened, setPlayerOpened] = useState<Set<string>>(new Set());

  const hasFullBoard = Boolean(game?.fullBoard);
  const gameId = game?.gameId ?? null;

  if (game?.status === 'active') {
    const currentCount = game.revealedCells.length;
    if (currentCount !== playerOpened.size) {
      const newSet = new Set<string>();
      game.revealedCells.forEach((rc: RevealedCell) => newSet.add(`${rc.row}-${rc.col}`));
      setPlayerOpened(newSet);
    }
  }

  if (hasFullBoard && gameId && animState.gameId !== gameId) {
    const newOrder: string[] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const key = `${r}-${c}`;
        if (!playerOpened.has(key)) {
          newOrder.push(key);
        }
      }
    }

    setAnimState({
      order: newOrder,
      revealIndex: 0,
      gameId: gameId,
    });
  } else if (game?.status === 'active' && animState.gameId !== null) {
    setAnimState({
      order: [],
      revealIndex: 0,
      gameId: null,
    });
  }

  useEffect(() => {
    if (!hasFullBoard || animState.order.length === 0) return;
    if (animState.revealIndex >= animState.order.length) return;

    const timer = setTimeout(() => {
      setAnimState((prev) => ({
        ...prev,
        revealIndex: prev.revealIndex + 1,
      }));
    }, STAGGER_DELAY_MS);
    return () => clearTimeout(timer);
  }, [hasFullBoard, animState.revealIndex, animState.order.length]);

  const hiddenSet = new Set<string>();
  if (hasFullBoard) {
    if (animState.order.length > 0) {
      for (let i = animState.revealIndex; i < animState.order.length; i++) {
        const item = animState.order[i];
        if (item !== undefined) {
          hiddenSet.add(item);
        }
      }
    } else {
      const currentRevealed = new Set(
        game?.revealedCells.map((rc: RevealedCell) => `${rc.row}-${rc.col}`)
      );
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          const key = `${r}-${c}`;
          if (!currentRevealed.has(key)) {
            hiddenSet.add(key);
          }
        }
      }
    }
  }

  const isRevealComplete =
    hasFullBoard && animState.order.length > 0 && animState.revealIndex >= animState.order.length;

  return { hiddenSet, isRevealComplete };
};
