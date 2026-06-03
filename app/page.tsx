"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "@/lib/animation/framer-motion";

const whatsappLink = "https://wa.me/5519999999999?text=Ol%C3%A1%2C%20quero%20fazer%20um%20pedido%20no%20Mikan%20Sushi";

const heroImage =
  "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=2400&q=90";

const aboutImage =
  "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=1600&q=90";

const highlights = [
  {
    icon: "🍣",
    title: "Sushi Premium",
    text: "Cortes frios, arroz no ponto e finalização precisa para peças que chegam à mesa com brilho e frescor.",
  },
  {
    icon: "🌯",
    title: "Temaki Artesanal",
    text: "Cones montados na hora, alga crocante e recheios generosos com assinatura japonesa contemporânea.",
  },
  {
    icon: "🥗",
    title: "Poke Bowl",
    text: "Bowls leves, intensos e coloridos, combinando peixe, grãos, molhos e texturas em equilíbrio.",
  },
];

const menuItems = [
  {
    title: "À la Carte",
    kicker: "Nigiri · Sashimi · Uramaki",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1600&q=90",
    text: "Peças autorais e clássicas preparadas em pequenos lotes para preservar temperatura, textura e delicadeza.",
  },
  {
    title: "Combinados",
    kicker: "Seleções para compartilhar",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1600&q=90",
    text: "Sequências elegantes para duas ou mais pessoas, com variedade de peixe, contraste de molhos e apresentação minimalista.",
  },
  {
    title: "Temaki",
    kicker: "Salmão · Atum · Skin · Hot",
    image: "https://images.unsplash.com/photo-1562158074-d49fbeffcc91?auto=format&fit=crop&w=1600&q=90",
    text: "Montagem rápida, alga seca e recheios intensos para quem quer sabor japonês sem perder praticidade.",
  },
];

const reviews = [
  {
    name: "Camila R.",
    quote: "O peixe veio impecável, o ambiente é escuro e elegante, e o combinado parecia obra de arte.",
  },
  {
    name: "Lucas M.",
    quote: "Melhor japonês de Porto Ferreira. Temaki crocante, atendimento rápido e delivery chegou perfeito.",
  },
  {
    name: "Fernanda S.",
    quote: "Experiência premium de verdade: luz baixa, sushi fresco e apresentação muito acima da média.",
  },
  {
    name: "Rafael T.",
    quote: "Poke muito bem montado, peças delicadas e sabor equilibrado. Virei cliente do Mikan.",
  },
  {
    name: "Juliana P.",
    quote: "Preço justo pela qualidade. O combinado premium é lindo e dá vontade de pedir tudo de novo.",
  },
];

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Sobre", href: "#sobre" },
  { label: "Delivery", href: "#delivery" },
  { label: "Contato", href: "#contato" },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const reviewsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 42);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    async function loadMotion() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("@/lib/animation/gsap"),
        import("@/lib/animation/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 54 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.15,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 82%", once: true },
            },
          );
        });

        gsap.to(".hero-image", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.2 },
        });
      });
    }

    loadMotion();
    return () => ctx?.revert();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const track = reviewsRef.current;
      if (!track) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 20) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: 380, behavior: "smooth" });
      }
    }, 3300);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main>
      <header className={`navbar ${scrolled ? "is-solid" : ""}`}>
        <a className="logo" href="#top" aria-label="Mikan Sushi início">
          <span>MIKAN</span> <strong>SUSHI</strong>
        </a>
        <nav aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <section id="top" className="hero" ref={heroRef}>
        <div className="hero-image">
          <Image src={heroImage} alt="Sushi premium em restaurante japonês escuro" fill priority sizes="100vw" />
        </div>
        <div className="hero-overlay" />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
        >
          <p className="eyebrow">Porto Ferreira · SP</p>
          <h1>MIKAN SUSHI</h1>
          <p className="hero-subtitle">Gastronomia japonesa em Porto Ferreira.</p>
          <p className="rating-line">⭐ 4.8 no Google · 135 avaliações</p>
          <div className="hero-actions">
            <a className="button button-red" href="#menu">
              Ver Cardápio
            </a>
            <a className="button button-outline" href={whatsappLink} target="_blank" rel="noreferrer">
              Fazer Pedido
            </a>
          </div>
        </motion.div>
      </section>

      <section className="section highlights-section" aria-label="Destaques do Mikan Sushi">
        <div className="highlights-grid">
          {highlights.map((item) => (
            <article className="highlight-card" key={item.title} data-reveal>
              <span>{item.icon}</span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="sobre" className="section about-section">
        <div className="about-grid">
          <div data-reveal>
            <p className="eyebrow">Sobre</p>
            <h2>Sabor japonês com alma brasileira</h2>
            <div className="red-divider" />
            <p>
              O Mikan Sushi combina técnica japonesa, ingredientes frescos e um ritmo acolhedor de interior.
              A casa foi desenhada para noites de luz baixa, pedidos compartilhados e delivery que mantém a
              experiência premium até a sua mesa.
            </p>
            <p className="price-note">Ticket médio: R$120-140 por pessoa</p>
          </div>
          <figure className="about-image" data-reveal>
            <Image src={aboutImage} alt="Chef preparando sushi em ambiente escuro" fill sizes="(max-width: 860px) 100vw, 50vw" />
          </figure>
        </div>
      </section>

      <section id="menu" className="section menu-section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Cardápio</p>
          <h2>O peixe é o protagonista.</h2>
        </div>
        <div className="menu-list">
          {menuItems.map((item, index) => (
            <article className={`menu-row ${index % 2 ? "is-reverse" : ""}`} key={item.title} data-reveal>
              <figure className="menu-image">
                <Image src={item.image} alt={`${item.title} do Mikan Sushi`} fill sizes="(max-width: 860px) 100vw, 56vw" />
              </figure>
              <div className="menu-copy">
                <p>{item.kicker}</p>
                <h3>{item.title}</h3>
                <span>{item.text}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section reviews-section" aria-label="Avaliações do Mikan Sushi">
        <div className="reviews-heading" data-reveal>
          <strong>4.8</strong>
          <span>★★★★★</span>
          <p>135 avaliações no Google</p>
        </div>
        <div className="reviews-track" ref={reviewsRef}>
          {[...reviews, ...reviews].map((review, index) => (
            <article className="review-card" key={`${review.name}-${index}`}>
              <p>“{review.quote}”</p>
              <span>{review.name}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="delivery" className="section delivery-section">
        <div className="delivery-panel" data-reveal>
          <p className="eyebrow">Delivery</p>
          <h2>Japonês premium no seu tempo.</h2>
          <div className="delivery-metrics">
            <div>
              <strong>55-65 min</strong>
              <span>Entrega estimada</span>
            </div>
            <div>
              <strong>30 min</strong>
              <span>Retirada na casa</span>
            </div>
          </div>
          <a className="button button-red" href={whatsappLink} target="_blank" rel="noreferrer">
            Pedir pelo WhatsApp
          </a>
        </div>
      </section>

      <section id="contato" className="location-section">
        <div className="location-grid section">
          <div className="location-copy" data-reveal>
            <p className="eyebrow">Localização</p>
            <h2>Av. Eng. Nicolau De V. Forjaz, 1351</h2>
            <dl>
              <div>
                <dt>Endereço</dt>
                <dd>Porto Ferreira, SP</dd>
              </div>
              <div>
                <dt>Horários</dt>
                <dd>Terça a domingo · 18h às 23h</dd>
              </div>
              <div>
                <dt>Especialidades</dt>
                <dd>Sushi, temaki, poke, combinados e delivery japonês</dd>
              </div>
            </dl>
            <div className="inline-actions">
              <a className="button button-red" href={whatsappLink} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a className="button button-outline" href={whatsappLink} target="_blank" rel="noreferrer">
                Delivery
              </a>
            </div>
          </div>
          <div className="map-frame" data-reveal>
            <iframe
              title="Mapa do Mikan Sushi em Porto Ferreira"
              loading="lazy"
              src="https://www.google.com/maps?q=Av.%20Eng.%20Nicolau%20De%20V.%20Forjaz%2C%201351%2C%20Porto%20Ferreira%2C%20SP&output=embed"
            />
          </div>
        </div>
      </section>

      <footer className="footer">
        <div />
        <strong><span>MIKAN</span> SUSHI</strong>
        <p>Instagram · WhatsApp · Av. Eng. Nicolau De V. Forjaz, 1351, Porto Ferreira, SP</p>
      </footer>
    </main>
  );
}
