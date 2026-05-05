import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    hari: 0,
    jam: 0,
    menit: 0,
    detik: 0
  });

  useEffect(() => {
    // Target date: May 16, 2026, 10:00:00 WIB (UTC+7)
    // We can define it simply assuming local time for the invitation.
    const targetDate = new Date('2026-05-16T10:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
          jam: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          menit: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          detik: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary via-bg-main to-bg-main pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-3xl"
      >
        <p className="text-sm md:text-base text-secondary tracking-[0.2em] mb-4 uppercase">The Wedding Of</p>
        <h1 className="font-script text-6xl md:text-8xl text-accent mb-6">
          Ine & Tomi
        </h1>
        <div className="w-16 h-[1px] bg-secondary mx-auto mb-6"></div>
        <p className="font-serif text-lg text-text-main/80 mb-12">Sabtu, 16 Mei 2026</p>

        {/* Countdown */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center glass-panel rounded-xl text-2xl md:text-3xl font-serif text-accent mb-2">
                {value.toString().padStart(2, '0')}
              </div>
              <span className="text-xs uppercase tracking-widest text-text-main/60">{unit}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
