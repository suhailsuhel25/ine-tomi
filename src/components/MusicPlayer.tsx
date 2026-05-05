import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Disc3, Pause } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  togglePlay: () => void;
  audioUrl: string;
}

export function MusicPlayer({ isPlaying, togglePlay, audioUrl }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn("Auto-play was prevented by browser.", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop />
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-40 bg-accent text-white p-3 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-transform glass-panel border-accent/20"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
            <Disc3 className="w-6 h-6" />
          </motion.div>
        ) : (
          <Pause className="w-6 h-6" />
        )}
      </motion.button>
    </>
  );
}
