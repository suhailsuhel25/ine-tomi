import { motion } from 'motion/react';
import { MailOpen } from 'lucide-react';

interface CoverProps {
  onOpen: () => void;
  isOpen: boolean;
}

export function Cover({ onOpen, isOpen }: CoverProps) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={isOpen ? { opacity: 0, y: '-100%', transitionEnd: { display: 'none' } } : { opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-main overflow-hidden"
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-secondary rounded-tl-3xl m-8 opacity-50" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-secondary rounded-tr-3xl m-8 opacity-50" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-secondary rounded-bl-3xl m-8 opacity-50" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-secondary rounded-br-3xl m-8 opacity-50" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center px-6 max-w-lg z-10"
      >
        <p className="text-secondary tracking-widest text-sm uppercase mb-4">Undangan Pernikahan</p>
        <h1 className="font-script text-5xl md:text-7xl text-accent mb-6">
          Ine & Tomi
        </h1>
        <p className="text-text-main text-sm lg:text-base mb-12 italic">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri..."
        </p>

        <button
          onClick={onOpen}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent text-white rounded-full overflow-hidden transition-all hover:bg-opacity-90 hover:scale-105 active:scale-95 shadow-lg"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
          <MailOpen className="w-5 h-5 relative z-10" />
          <span className="relative z-10 text-sm font-medium tracking-wide">Buka Undangan</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
