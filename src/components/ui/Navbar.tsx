'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-negrin-ink/80 backdrop-blur-xl py-3 border-b border-white/5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#inicio" className="flex items-center gap-2 group">
          <div className="w-3 h-3 rotate-45 bg-negrin-gold group-hover:bg-negrin-warm transition-colors" />
          <span className="text-xl font-bold tracking-[0.2em] text-negrin-cream font-display">
            NEGRÍN
          </span>
        </a>
        <div className="hidden md:flex gap-8 text-sm tracking-wider">
          {[
            ['Inicio', '#inicio'],
            ['Origen', '#origen'],
            ['Servicios', '#curacion'],
            ['En acción', '#en-accion'],
            ['Precios', '#precios'],
            ['Calidad', '#calidad'],
            ['Contacto', '#contacto'],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-negrin-sand hover:text-negrin-warm transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
