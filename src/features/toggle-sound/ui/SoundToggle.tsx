import { Volume2, VolumeX } from 'lucide-react';
import { useIsMuted, useToggleMute } from '../model/useSoundStore';
import { SOUND_TOGGLE_LABELS } from '../model/constants';

export const SoundToggle = () => {
  const isMuted = useIsMuted();
  const toggleMute = useToggleMute();
  const label = isMuted ? SOUND_TOGGLE_LABELS.UNMUTE : SOUND_TOGGLE_LABELS.MUTE;

  return (
    <button
      type="button"
      onClick={toggleMute}
      title={label}
      aria-label={label}
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
