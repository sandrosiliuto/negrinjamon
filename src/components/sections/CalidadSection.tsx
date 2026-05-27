'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';

const features = [
  {
    title: 'Denominación de Origen',
    desc: 'Certificación que garantiza el origen y la calidad de cada pieza.',
  },
  {
    title: 'Ibérico 100%',
    desc: 'Cerdos de raza pura ibérica, criados en libertad en la Dehesa.',
  },
  {
    title: 'Alimentación Bellota',
    desc: 'Durante la montanera, nuestras piezas se nutren de lo mejor de la encina.',
  },
  {
    title: 'Curación +36 Meses',
    desc: 'Tiempo suficiente para desarrollar aromas y sabores incomparables.',
  },
];

export default function CalidadSection() {
  return (
    <section
      id="calidad"
      className="relative py-32 px-6 section-overlay"
      style={{
        backgroundImage: 'url(/images/img2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <SectionHeader
        kicker="EXCELENCIA CERTIFICADA"
        title={
          <>
            Cada corte, una{" "}
            <span className="gradient-text">obra</span>
          </>
        }
        subtitle="Nuestro compromiso con la calidad se refleja en cada etapa del proceso, desde la selección hasta el empaque final."
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <motion.article
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="group relative p-8 rounded-2xl card-legible overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-opacity bg-negrin-warm" />
            <div className="relative">
              <h3 className="text-2xl font-bold font-display mb-3 text-legible">{f.title}</h3>
              <p className="text-negrin-cream/80 leading-relaxed text-legible-light">{f.desc}</p>
              <div className="mt-6 h-px w-12 bg-gradient-to-r from-negrin-wood to-negrin-warm group-hover:w-full transition-all duration-500" />
            </div>
          </motion.article>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="p-8 rounded-2xl card-legible border border-negrin-gold/20"
        >
          <blockquote className="text-2xl md:text-3xl font-light leading-snug font-display text-legible">
            “El jamón es nuestro legado. Cada pieza que sale de nuestra bodega
            lleva consigo el sabor de tres generaciones de dedicación.”
          </blockquote>
          <div className="mt-6 text-negrin-warm text-sm tracking-widest text-legible-light">
            — FAMILIA NEGRÍN
          </div>
        </motion.div>
      </div>
    </section>
  );
}
