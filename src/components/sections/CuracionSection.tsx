'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';

const steps = [
  {
    n: '01',
    title: 'Fiestas y Celebraciones',
    desc: 'Amenizo cumpleaños, fiestas privadas y reuniones familiares con corte en vivo.',
  },
  {
    n: '02',
    title: 'Bautizos y Comuniones',
    desc: 'Un detalle elegante que sorprende a tus invitados en días tan señalados.',
  },
  {
    n: '03',
    title: 'Eventos Corporativos',
    desc: 'Cócteles de empresa, ferias y presentaciones con un plus de distinción.',
  },
  {
    n: '04',
    title: 'Catas y Showcookings',
    desc: 'Experiencias guiadas para aprender a distinguir matices y disfrutar del ibérico como un experto.',
  },
];

export default function CuracionSection() {
  return (
    <section
      id="curacion"
      className="relative py-32 px-6 section-overlay"
      style={{
        backgroundImage: 'url(/images/img5.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <SectionHeader
        kicker="SERVICIOS PERSONALIZADOS"
        title={
          <>
            Servicios{" "}
            <span className="gradient-text">personalizados</span>
          </>
        }
        subtitle="Me desplazo a tu evento con todo lo necesario para convertir el jamón en el centro de atención."
      />

      <div className="max-w-5xl mx-auto">
        <div className="relative">
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
                  <div className="text-negrin-warm text-sm tracking-[0.3em] mb-2 text-legible-light">
                    SERVICIO {step.n}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-display mb-3 text-legible">
                    {step.title}
                  </h3>
                  <p className="text-negrin-cream/80 leading-relaxed text-legible-light">
                    {step.desc}
                  </p>
                </div>

                <div className="hidden md:flex w-12 h-12 rounded-full bg-negrin-earth/90 border border-negrin-gold/40 items-center justify-center z-10 shrink-0">
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
