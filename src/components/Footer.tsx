import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="py-16 px-6 bg-white text-center border-t border-black/5">
      <div className="max-w-2xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <p className="font-script text-3xl text-accent mb-6">Wassalamu'alaikum Warahmatullahi Wabarakatuh</p>
          <p className="text-sm text-text-main/70 mb-4 px-4">
            Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan doa restu kepada kami.
          </p>
          <p className="text-secondary tracking-widest text-sm uppercase my-8">Kami yang berbahagia</p>
          
          <div className="space-y-4 mb-12">
            <div>
              <p className="font-medium text-text-main">Kel. Bpk. Sugeng Siswanto</p>
              <p className="text-sm text-text-main/70">& Ibu Lina Asmiatun</p>
            </div>
            <div className="text-accent">~</div>
            <div>
              <p className="font-medium text-text-main">Kel. Bpk. H. Kadisa</p>
              <p className="text-sm text-text-main/70">& Ibu Hj. Misti</p>
            </div>
          </div>

          <h2 className="font-script text-4xl text-accent">Ine & Tomi</h2>
          
          <div className="mt-16 text-xs text-text-main/40 uppercase tracking-widest">
            <p>&copy; 2026 Ine & Tomi. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
