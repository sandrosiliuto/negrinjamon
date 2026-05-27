'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '@/components/ui/Navbar';
import ScrollProgress from '@/components/ui/ScrollProgress';
import CustomCursor from '@/components/ui/CustomCursor';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import HeroSection from '@/components/sections/HeroSection';
import OrigenSection from '@/components/sections/OrigenSection';
import CuracionSection from '@/components/sections/CuracionSection';
import CalidadSection from '@/components/sections/CalidadSection';
import FooterSection from '@/components/sections/FooterSection';

const HamCanvas3D = dynamic(() => import('@/components/three/HamCanvas3D'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center text-negrin-warm text-sm tracking-widest z-0">
      CARGANDO EXPERIENCIA…
    </div>
  ),
});

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = ['#origen', '#curacion', '#calidad', '#contacto'];
    sections.forEach((id) => {
      gsap.from(id + ' .gsap-reveal', {
        scrollTrigger: {
          trigger: id,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <HamCanvas3D />
      <CustomCursor />
      <WhatsAppButton />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <OrigenSection />
        <CuracionSection />
        <CalidadSection />
        <FooterSection />
      </main>
    </>
  );
}
