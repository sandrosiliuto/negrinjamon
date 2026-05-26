'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';

const steps = [
  {
    n: '01',
    title: 'Selección',
    desc: 'Elegimos únicamente cerdos ibéricos puros criados en libertad en la Dehesa.',
  },
  {
    n: '02',
    title: 'Salazón',
    desc: 'Curado tradicional con sal marina natural durante el tiempo justo.',
  },
  {
    n: '03',
    title: 'Secado',
    desc: 'Descanso en secaderos naturales donde el clima de la Sierra hace su magia.',
  },
  {
    n: '04',
    title: 'Bodega',
    desc: 'Afinamiento lento en nuestras bodegas hasta alcanzar la excelencia.',
  },
];

export default function CuracionSection() {
  return (
    <section id="curacion" className="relative py-32 px-6">
      <SectionHeader
        kicker="EL ARTE DEL TIEMPO"
        title={
          <>
            Curación{" "}
            <span className="gradient-text">natural</span>
          </>
        }
        subtitle="Un proceso que no se puede apresurar. Cada etapa requiere paciencia, experiencia y respeto por la tradición."
      />

      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {/* Línea vertical conectora */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-negrin-wood via-negrin-warm to-negrin-wine hidden md:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="text-negrin-warm text-sm tracking-[0.3em] mb-2">
                    PASO {step.n}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-display mb-3">
                    {step.title}
                  </h3>
                  <p className="text-negrin-sand/70 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="hidden md:flex w-12 h-12 rounded-full bg-negrin-earth border border-negrin-gold/40 items-center justify-center z-10 shrink-0">
                  <span className="text-negrin-warm font-bold text-sm">{step.n}</span>
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
