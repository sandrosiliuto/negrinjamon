'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  kicker: string;
  title: React.ReactNode;
  subtitle?: string;
}

export default function SectionHeader({ kicker, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-xs tracking-[0.4em] text-negrin-warm/80 mb-4"
      >
        {kicker}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl md:text-6xl font-bold tracking-tight font-display"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-negrin-sand text-lg leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
