'use client';

import { motion } from 'framer-motion';

export default function FooterSection() {
  return (
    <footer
      id="contacto"
      className="relative py-20 px-6 border-t border-white/10 bg-negrin-earth/60 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rotate-45 bg-negrin-gold" />
            <span className="text-lg font-bold tracking-[0.2em] font-display">
              NEGRÍN ALJAMÓN
            </span>
          </div>

          <div className="flex gap-6 text-sm text-negrin-sand/60">
            <a href="#inicio" className="hover:text-negrin-warm transition-colors">Inicio</a>
            <a href="#origen" className="hover:text-negrin-warm transition-colors">Origen</a>
            <a href="#curacion" className="hover:text-negrin-warm transition-colors">Curación</a>
            <a href="#calidad" className="hover:text-negrin-warm transition-colors">Calidad</a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-negrin-sand/50">
            © {new Date().getFullYear()} Negrín Aljamón · Todos los derechos reservados.
          </p>
          <p className="text-xs text-negrin-sand/40 tracking-widest">
            NEXT.JS · THREE.JS · ARTESANÍA
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
