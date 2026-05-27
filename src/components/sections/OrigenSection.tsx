'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.08 },
  }),
};

export default function OrigenSection() {
  const stats = [
    { value: '+15', label: 'Años de experiencia' },
    { value: '+500', label: 'Eventos realizados' },
    { value: '100%', label: 'Corte a cuchillo tradicional' },
  ];

  return (
    <section
      id="origen"
      className="relative py-32 px-6 section-overlay"
      style={{
        backgroundImage: 'url(/images/img1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <SectionHeader
        kicker="CORTADOR PROFESIONAL"
        title={
          <>
            Compromiso con la{" "}
            <span className="gradient-text">excelencia</span>
          </>
        }
        subtitle="Dedicación exclusiva al corte a cuchillo. Velocidad, precisión y conocimiento del producto para realzar la experiencia gastronómica en cualquier evento."
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
            className="text-center p-8 rounded-2xl card-legible"
          >
            <div className="text-5xl md:text-6xl font-bold gradient-text font-display text-legible">
              {s.value}
            </div>
            <div className="mt-3 text-xs tracking-[0.3em] text-negrin-cream/80 text-legible-light">
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
          className="text-negrin-cream/90 text-lg leading-relaxed text-legible-light"
        >
          Cada evento es una oportunidad para demostrar que el corte a cuchillo
          es mucho más que una técnica: es un espectáculo que despierta los sentidos.
          Desde la selección del punto de corte hasta la presentación final en el plato,
          cada detalle está cuidado para que tus invitados vivan una experiencia inolvidable.
        </motion.p>
      </div>
    </section>
  );
}
