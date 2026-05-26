'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export default function OrigenSection() {
  const stats = [
    { value: '+70', label: 'Años de tradición' },
    { value: '3', label: 'Generaciones' },
    { value: '100%', label: 'Ibérico de bellota' },
  ];

  return (
    <section id="origen" className="relative py-32 px-6">
      <SectionHeader
        kicker="DESDE 1954"
        title={
          <>
            Raíces en la{" "}
            <span className="gradient-text">Sierra de Huelva</span>
          </>
        }
        subtitle="Tres generaciones dedicadas al arte del jamón ibérico. En el corazón de la Dehesa, donde las encinas dan sombra y sabor a nuestras piezas."
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm"
          >
            <div className="text-5xl md:text-6xl font-bold gradient-text font-display">
              {s.value}
            </div>
            <div className="mt-3 text-xs tracking-[0.3em] text-negrin-sand">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-negrin-sand/80 text-lg leading-relaxed"
        >
          Cada pieza cuenta una historia que comienza en los pastos de la Dehesa,
          donde nuestros cerdos ibéricos se alimentan de bellotas durante la montanera.
          El resultado es un jamón de sabor incomparable, con vetas de grasa que se derriten
          en el paladar y un aroma que evoca la tradición más pura.
        </motion.p>
      </div>
    </section>
  );
}
