'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center"
    >
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-xs md:text-sm tracking-[0.5em] text-negrin-warm/80 mb-8"
        >
          ARTESANÍA · TRADICIÓN · EXCELENCIA
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.95] font-display text-legible"
        >
          Negrín
          <br />
          <span className="gradient-text">Aljamón</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 text-negrin-cream/90 max-w-xl mx-auto text-base md:text-lg text-legible"
        >
          Jamón ibérico de bellota, curado en la Sierra de Huelva.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <a
            href="#origen"
            className="px-7 py-3 rounded-full border border-negrin-gold/60 text-negrin-gold hover:bg-negrin-gold hover:text-negrin-ink transition-colors text-sm tracking-widest"
          >
            Descubrir
          </a>
          <a
            href="#calidad"
            className="px-7 py-3 rounded-full text-negrin-sand hover:text-negrin-cream text-sm tracking-widest"
          >
            Nuestra calidad →
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-negrin-warm/70 text-xs tracking-[0.4em]"
      >
        <div className="flex flex-col items-center gap-3">
          <span>SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-negrin-warm to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
