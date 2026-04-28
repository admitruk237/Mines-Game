import { Volume2, VolumeX } from 'lucide-react';
import { useSoundStore } from '../model/useSoundStore';
import { Button } from '@/shared/ui/button';

export const SoundToggle = () => {
  const { isMuted, toggleMute } = useSoundStore();

  return (
    <Button
      variant="secondary-dark"
      size="icon-sm"
      onClick={toggleMute}
      title={isMuted ? 'Unmute' : 'Mute'}
      className="rounded-full w-8 h-8"
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4 text-slate-500" />
      ) : (
        <Volume2 className="w-4 h-4 text-emerald-500" />
      )}
    </Button>
  );
};
