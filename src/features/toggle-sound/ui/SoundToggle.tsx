import { Volume2, VolumeX } from 'lucide-react';
import { useSoundStore } from '../model/useSoundStore';

export const SoundToggle = () => {
  const { isMuted, toggleMute } = useSoundStore();

  return (
    <button
      onClick={toggleMute}
      title={isMuted ? 'Unmute' : 'Mute'}
      className="cursor-pointer transition-opacity hover:opacity-80 outline-none"
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-text-muted" />
      ) : (
        <Volume2 className="w-5 h-5 text-text-muted" />
      )}
    </button>
  );
};
