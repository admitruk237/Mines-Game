import { useState } from 'react';
import { useBalance } from '@/entities/balance';
import { useGameId } from '@/entities/game';
import { Button, GameModal } from '@/shared/ui';
import { incrementPlayerId } from '@/shared/lib/playerId';

export const OutOfFundsModal = () => {
  const { data, isLoading } = useBalance();
  const gameId = useGameId();
  const balance = data?.balance ?? 0;
  const [showModal, setShowModal] = useState(false);
  const [wasTriggered, setWasTriggered] = useState(false);

  const shouldShow = !isLoading && data !== undefined && balance <= 0 && !gameId;

  if (shouldShow && !wasTriggered) {
    setWasTriggered(true);
    setShowModal(true);
  } else if (!shouldShow && wasTriggered) {
    setWasTriggered(false);
    setShowModal(false);
  }

  const handleStartFresh = () => {
    setShowModal(false);
    incrementPlayerId();
  };

  return (
    <GameModal
      open={showModal}
      onOpenChange={setShowModal}
      onReset={handleStartFresh}
      variant="info"
      height="lg:h-[306px] h-auto"
    >
      <span className="text-[40px] lg:text-[48px] leading-tight filter drop-shadow-md">💳</span>

      <div className="flex flex-col gap-1 lg:gap-2">
        <h2 className="text-white text-center font-sans text-[18px] lg:text-[20px] font-bold leading-tight tracking-tight">
          Out of Funds
        </h2>
        <p className="text-text-info text-center font-mono text-[14px] lg:text-[16px] font-medium leading-tight px-4">
          Your balance has reached zero. Would you like to start fresh with a new balance?
        </p>
      </div>

      <div className="w-full mt-6 flex justify-center">
        <Button variant="primary-blue" size="play" onClick={handleStartFresh} className="w-full">
          Start Fresh
        </Button>
      </div>
    </GameModal>
  );
};
