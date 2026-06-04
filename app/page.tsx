"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "@/lib/animation/framer-motion";

const featureImage =
  "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1800&q=92";
const parallaxImage =
  "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=2400&q=92";

const pillars = [
  {
    title: "Silêncio visual",
    text: "Interface reduzida ao essencial para que cada detalhe respire.",
    icon: "M12 3.5v17M3.5 12h17",
  },
  {
    title: "Movimento preciso",
    text: "Transições lentas, suaves e intencionais, sem distrações.",
    icon: "M4 16.5C7 8 13 8 20 4.5M4 19.5C10 15 14 15 20 12",
  },
  {
    title: "Presença premium",
    text: "Contraste profundo, tipografia ampla e um azul que guia a ação.",
    icon: "M12 4.75 14.3 9.4 19.4 10.15 15.7 13.75 16.55 18.8 12 16.45 7.45 18.8 8.3 13.75 4.6 10.15 9.7 9.4 12 4.75Z",
  },
];

export default function Home() {
  const pageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    async function initScrollExperience() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("@/lib/animation/gsap"),
        import("@/lib/animation/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-fade-up]").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 64 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 82%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-fade-left]").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, x: -72 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 1.45,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 76%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-fade-right]").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, x: 72 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 1.45,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 76%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-scale-image]").forEach((element) => {
          gsap.fromTo(
            element,
            { scale: 1.08 },
            {
              scale: 1,
              duration: 1.6,
              ease: "power2.out",
              scrollTrigger: { trigger: element, start: "top 88%", once: true },
            },
          );
        });

        gsap.to("[data-parallax-image]", {
          yPercent: -10,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-parallax-section]",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }, pageRef);
    }

    initScrollExperience();
    return () => ctx?.revert();
  }, []);

  return (
    <main ref={pageRef} className="site-shell">
      <section className="hero-section" id="top" data-pin>
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Showcase 01</p>
          <h1>Experiência. Redefinida.</h1>
          <p className="hero-subtitle">Design que você sente antes de entender.</p>
        </motion.div>
        <a className="scroll-indicator" href="#feature" aria-label="Rolar para a próxima seção">
          <span />
        </a>
      </section>

      <section className="feature-section cinematic-section" id="feature" data-pin>
        <figure className="feature-media" data-fade-left>
          <Image
            src={featureImage}
            alt="Produto premium em ambiente minimalista escuro"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            priority
            data-scale-image
          />
        </figure>
        <div className="feature-copy" data-fade-right>
          <p className="eyebrow accent">Precisão absoluta</p>
          <h2>Uma presença que ocupa o espaço sem pedir atenção.</h2>
          <p>
            Superfícies profundas, reflexos controlados e hierarquia tipográfica clara constroem uma narrativa premium,
            lenta e memorável.
          </p>
        </div>
      </section>

      <section className="image-section" aria-label="Imagem cinematográfica em largura total" data-parallax-section>
        <div className="parallax-frame">
          <Image
            src={parallaxImage}
            alt="Luz azul atravessando um cenário preto minimalista"
            fill
            sizes="100vw"
            data-parallax-image
          />
        </div>
        <div className="image-caption" data-fade-up>
          <p className="eyebrow accent">Cinemático</p>
          <h2>Escuro por escolha. Luminoso por detalhe.</h2>
        </div>
      </section>

      <section className="pillars-section cinematic-section" data-pin>
        <div className="section-heading" data-fade-up>
          <p className="eyebrow">Essencial</p>
          <h2>Três princípios. Nenhum ruído.</h2>
        </div>
        <div className="pillars-grid">
          {pillars.map((pillar, index) => (
            <article className="pillar-card" data-fade-up key={pillar.title} style={{ transitionDelay: `${index * 120}ms` }}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={pillar.icon} />
              </svg>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-section cinematic-section" data-pin>
        <blockquote data-fade-up>
          “Quando tudo é removido, o que permanece precisa ser inesquecível.”
        </blockquote>
      </section>

      <section className="cta-section cinematic-section" id="contato">
        <div data-fade-up>
          <p className="eyebrow accent">Comece agora</p>
          <h2>Crie uma experiência que parece inevitável.</h2>
          <a className="cta-button" href="mailto:hello@example.com">Solicitar showcase</a>
        </div>
      </section>
    </main>
  );
}
