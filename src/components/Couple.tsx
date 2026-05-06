import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import IneImage from '../Assets/Foto-Ine.png';
import TomiImage from '../Assets/Foto-Tomi.png';

export function Couple() {
  return (
    <section className="py-24 px-6 bg-white relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-secondary mb-4">Maha Suci Allah</p>
          <p className="text-text-main/80 leading-relaxed italic md:px-12">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
          </p>
          <p className="text-sm text-text-main/60 mt-4">(QS. Ar-Rum: 21)</p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mt-12">
          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col items-center"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary shadow-xl mb-6 bg-primary/30 flex items-center justify-center">
              <img src={IneImage} alt="Ine Hidayati" className="w-full h-full object-cover object-top" />
            </div>
            <h2 className="font-script text-4xl text-accent mb-2">Ine Hidayati</h2>
            <p className="text-sm text-text-main/70 mb-1">Putri dari</p>
            <p className="font-medium text-text-main">Bpk. Sugeng Siswanto</p>
            <p className="font-medium text-text-main">& Ibu Lina Asmiatun</p>
          </motion.div>

          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-shrink-0 text-secondary"
          >
            <Heart className="w-8 h-8 md:w-12 md:h-12 fill-current" />
          </motion.div>

          {/* Groom */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="flex-1 flex flex-col items-center"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary shadow-xl mb-6 bg-primary/30 flex items-center justify-center">
               <img src={TomiImage} alt="Tomi Jepi" className="w-full h-full object-cover object-top" />
            </div>
            <h2 className="font-script text-4xl text-accent mb-2">Tomi Jepi</h2>
            <p className="text-sm text-text-main/70 mb-1">Putra dari</p>
            <p className="font-medium text-text-main">Bpk. H. Kadisa</p>
            <p className="font-medium text-text-main">& Ibu Hj. Misti</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
