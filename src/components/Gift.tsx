import { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Gift as GiftIcon, CheckCircle2 } from 'lucide-react';

export function Gift() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const bankAccount = {
    bank: "BCA",
    accountNumber: "1234567890",
    name: "INE HIDAYATI"
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAccount(text);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <section className="py-24 px-6 bg-primary relative">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-12"
        >
          <div className="flex justify-center mb-4 text-accent">
            <GiftIcon className="w-10 h-10" />
          </div>
          <h2 className="font-script text-5xl text-accent mb-4">Ungkapan Tanda Kasih</h2>
          <p className="text-text-main/70 text-sm md:text-base px-4">
            Doa dan restu Anda merupakan karunia yang sangat berarti bagi kami. 
            Namun, jika Anda hendak memberikan tanda kasih, Anda dapat melalui fitur di bawah ini:
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="w-full bg-white p-8 rounded-3xl shadow-sm border border-secondary/20 flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <h3 className="font-bold text-xl text-accent mb-2">BANK {bankAccount.bank}</h3>
          <p className="text-3xl font-mono tracking-widest text-text-main mb-2">
            {bankAccount.accountNumber}
          </p>
          <p className="text-sm text-text-main/70 uppercase tracking-widest mb-8">
            a.n {bankAccount.name}
          </p>

          <button
            onClick={() => copyToClipboard(bankAccount.accountNumber)}
            className="group flex Items-center justify-center gap-2 px-6 py-2.5 bg-bg-main border border-secondary/50 text-accent rounded-full hover:bg-secondary hover:text-white transition-all text-sm font-medium tracking-wide"
          >
            {copiedAccount === bankAccount.accountNumber ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Berhasil Disalin</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Nomor Rekening</span>
              </>
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
