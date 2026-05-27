'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';

const products = [
  { name: 'Jamón bellota 100% raza ibérica', price: '46,90 €/kg' },
  { name: 'Jamón bellota 50% raza ibérica', price: '41,50 €/kg' },
  { name: 'Jamón cebo campo 50% raza ibérica', price: '29,00 €/kg' },
  { name: 'Jamón cebo 50% raza ibérica', price: '27,00 €/kg' },
  { name: 'Jamón duroc gran reserva', price: '20,00 €/kg' },
  { name: 'Jamón serrano gran reserva', price: '14,60 €/kg' },
];

export default function PreciosSection() {
  return (
    <section
      id="precios"
      className="relative py-32 px-6 section-overlay"
      style={{
        backgroundImage: 'url(/images/img4.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <SectionHeader
        kicker="BAJO PEDIDO"
        title={
          <>
            Jamones{" "}
            <span className="gradient-text">bajo pedido</span>
          </>
        }
        subtitle="Selecciono las mejores piezas para garantizar la máxima calidad en cada evento. Consulte disponibilidad y gastos de envío."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <div className="rounded-2xl card-legible overflow-hidden">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`flex justify-between items-center px-8 py-5 ${
                i < products.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <span className="text-negrin-cream/90 text-base text-legible-light">{p.name}</span>
              <span className="text-negrin-warm font-bold text-lg whitespace-nowrap ml-4">{p.price}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center text-negrin-cream/60 text-sm text-legible-light"
        >
          Precios orientativos. Consulte disponibilidad y gastos de envío por WhatsApp.
        </motion.p>
      </motion.div>
    </section>
  );
}
