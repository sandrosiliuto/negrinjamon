'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';

export default function EnAccionSection() {
  return (
    <section
      id="en-accion"
      className="relative py-32 px-6"
      style={{ backgroundColor: '#0F0A06' }}
    >
      <SectionHeader
        kicker="EN ACCIÓN"
        title={
          <>
            El arte del corte{" "}
            <span className="gradient-text">en vivo</span>
          </>
        }
        subtitle="Descubre cómo transformo cada jamón en una experiencia sensorial única."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
        style={{ minHeight: '400px' }}
      >
        <div
          style={{
            width: '100%',
            minHeight: '480px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <iframe
            src="https://www.instagram.com/reel/DWbjnCWij1a/embed/"
            width="100%"
            height="480"
            frameBorder="0"
            scrolling="no"
            allowTransparency={true}
            title="Cortador de jamón en acción – Instagram Reel"
            style={{
              maxWidth: '540px',
              borderRadius: '12px',
              border: '1px solid rgba(201, 168, 124, 0.15)',
            }}
          />
        </div>

        <p className="text-center mt-6 text-negrin-cream/60 text-sm text-legible-light">
          ¿Quieres ver más?{' '}
          <a
            href="https://www.instagram.com/reel/DWbjnCWij1a/?igsh=ZmJmc29pM3FqNmFs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-negrin-warm hover:text-negrin-gold transition-colors"
          >
            Abre el reel en Instagram →
          </a>
        </p>
      </motion.div>
    </section>
  );
}
