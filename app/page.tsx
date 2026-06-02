"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "@/lib/animation/framer-motion";
import Image from "next/image";

const heroImage = "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?auto=format&fit=crop&w=2200&q=85";

const aboutImage =
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=85";

const experiences = [
  { icon: "♫", title: "Música ao vivo", text: "Programação intimista para noites de voz, violão e brasilidade em Porto Ferreira." },
  { icon: "✦", title: "Gastronomia brasileira", text: "Receitas de raiz, ingredientes nacionais e apresentação precisa para compartilhar sem pressa." },
  { icon: "◐", title: "Murais artísticos", text: "Um salão envolvente, marcado por arte autoral, luz baixa e atmosfera de encontro." },
  { icon: "✧", title: "Drinks artesanais", text: "Coquetelaria com frutas, especiarias e camadas aromáticas pensadas para a mesa." },
  { icon: "★", title: "4.8 no Google", text: "Mais de 800 avaliações reconhecem o cuidado da casa, do salão ao último gole." },
  { icon: "⌖", title: "Porto Ferreira", text: "Um destino contemporâneo para jantar, brindar e ouvir música ao vivo no interior paulista." },
];

const dishes = [
  {
    name: "Moqueca de tempero brasileiro",
    tag: "Mar • Dendê • Coentro",
    image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=1400&q=85",
    text: "Caldo profundo, perfume de ervas frescas e textura cremosa em uma leitura elegante de um clássico nacional.",
  },
  {
    name: "Carne braseada com mandioca",
    tag: "Brasa • Raiz • Molho escuro",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=85",
    text: "Cocção lenta, brilho de redução e acompanhamentos da terra para uma mesa generosa sem perder a sofisticação.",
  },
  {
    name: "Peixe, limão e ervas do Brasil",
    tag: "Fresco • Cítrico • Autoral",
    image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1400&q=85",
    text: "Um prato de contraste delicado: acidez, fumaça leve e final aromático para harmonizar com drinks da casa.",
  },
];

const gallery = [
  { alt: "salão escuro com mesas elegantes", src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=85", size: "tall" },
  { alt: "bar sofisticado com luz baixa", src: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1000&q=85", size: "wide" },
  { alt: "drink artesanal em balcão escuro", src: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=1000&q=85", size: "small" },
  { alt: "prato brasileiro em fundo escuro", src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1000&q=85", size: "tall" },
  { alt: "mesa posta para jantar", src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1000&q=85", size: "small" },
  { alt: "cozinha autoral com acabamento premium", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85", size: "wide" },
];

const reviews = [
  { name: "Marina A.", quote: "Ambiente lindo, comida brasileira muito bem executada e música ao vivo na medida certa." },
  { name: "Renan C.", quote: "Parada obrigatória em Porto Ferreira. Atendimento cuidadoso, drinks ótimos e salão com personalidade." },
  { name: "Bianca S.", quote: "A casa tem clima sofisticado sem ser fria. Pratos bem apresentados e sabores marcantes." },
  { name: "Eduardo M.", quote: "Experiência completa: jantar, arte nas paredes, bons drinks e uma energia muito especial." },
];

const navLinks = ["Sobre", "Experiência", "Pratos", "Galeria", "Reservas"];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<(typeof gallery)[number] | null>(null);
  const [sent, setSent] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 36);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    async function loadGsap() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("@/lib/animation/gsap"),
        import("@/lib/animation/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 48 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.35,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 82%", once: true },
            },
          );
        });

        gsap.to(".hero-bg", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.2 },
        });
      });
    }

    loadGsap();
    return () => ctx?.revert();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      carouselRef.current?.scrollBy({ left: 360, behavior: "smooth" });
      if (carouselRef.current && carouselRef.current.scrollLeft > carouselRef.current.scrollWidth / 2) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3600);

    return () => window.clearInterval(timer);
  }, []);

  function submitReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <header className={`navbar ${scrolled ? "is-solid" : ""}`}>
        <a className="logo" href="#top" aria-label="Borogodó Bar & Restaurante">
          Borogodó
        </a>
        <nav aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}>
              {link}
            </a>
          ))}
        </nav>
      </header>

      <section id="top" ref={heroRef} className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="hero-overlay" />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Porto Ferreira • Gastronomia Brasileira</p>
          <h1>Borogodó</h1>
          <p className="hero-subtitle">Arte, sabor e tradição brasileira em um só lugar</p>
          <div className="rating-line" aria-label="Avaliação 4.8 no Google com mais de 800 avaliações">
            <span>★★★★★</span>
            <strong>4.8 no Google</strong>
            <em>800+ avaliações</em>
          </div>
          <div className="hero-actions">
            <a className="button button-outline" href="#pratos">Ver Cardápio</a>
            <a className="button button-gold" href="#reservas">Reservar Mesa</a>
          </div>
        </motion.div>
      </section>

      <section id="sobre" className="section about-section">
        <div className="about-grid" data-reveal>
          <div>
            <p className="eyebrow">Sobre a casa</p>
            <h2>Um restaurante brasileiro com luz baixa, mesa farta e alma artística.</h2>
            <div className="gold-line" />
            <p>
              O Borogodó Bar & Restaurante nasce em Porto Ferreira como um endereço para viver o Brasil com calma:
              gastronomia de referência, drinks feitos à mão, murais que conduzem o olhar e música ao vivo em uma
              atmosfera escura, editorial e acolhedora.
            </p>
          </div>
          <figure className="about-image">
            <Image src={aboutImage} alt="Interior de restaurante brasileiro escuro e sofisticado" fill sizes="(max-width: 860px) 100vw, 50vw" />
          </figure>
        </div>
      </section>

      <section id="experiencia" className="section experience-section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Experiência</p>
          <h2>Cada detalhe pensado para prolongar a noite.</h2>
        </div>
        <div className="experience-grid">
          {experiences.map((item) => (
            <article key={item.title} className="experience-item" data-reveal>
              <span aria-hidden="true">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pratos" className="section dishes-section">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">Pratos</p>
          <h2>Gastronomia brasileira com presença e silêncio visual.</h2>
        </div>
        <div className="dish-list">
          {dishes.map((dish, index) => (
            <article key={dish.name} className={`dish-row ${index % 2 ? "is-reverse" : ""}`} data-reveal>
              <figure className="dish-image">
                <Image src={dish.image} alt={dish.name} fill sizes="(max-width: 860px) 100vw, 55vw" />
              </figure>
              <div className="dish-copy">
                <p className="dish-tag">{dish.tag}</p>
                <h3>{dish.name}</h3>
                <p>{dish.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="galeria" className="section gallery-section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Galeria</p>
          <h2>Texturas, sombras e o brilho discreto da casa.</h2>
        </div>
        <div className="masonry">
          {gallery.map((image) => (
            <button key={image.src} className={`gallery-tile ${image.size}`} onClick={() => setLightbox(image)} data-reveal>
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 860px) 50vw, 25vw" />
            </button>
          ))}
        </div>
      </section>

      <section className="section reviews-section" aria-label="Avaliações de clientes">
        <div className="reviews-heading" data-reveal>
          <p className="eyebrow">Avaliações</p>
          <strong>4.8</strong>
          <span>★★★★★</span>
          <p>Mais de 800 avaliações no Google</p>
        </div>
        <div className="review-carousel" ref={carouselRef} data-reveal>
          {[...reviews, ...reviews].map((review, index) => (
            <article className="review-card" key={`${review.name}-${index}`}>
              <p>“{review.quote}”</p>
              <span>{review.name}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="localizacao" className="section location-section">
        <div className="location-grid" data-reveal>
          <div className="map-frame">
            <iframe
              title="Mapa Borogodó Bar & Restaurante em Porto Ferreira"
              src="https://www.google.com/maps?q=Porto%20Ferreira%20SP%20Borogod%C3%B3%20Bar%20e%20Restaurante&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="location-copy">
            <p className="eyebrow">Localização</p>
            <h2>Porto Ferreira, SP</h2>
            <p>Um ponto de encontro para jantar, brindar e ouvir música ao vivo no interior de São Paulo.</p>
            <dl>
              <div><dt>Endereço</dt><dd>Porto Ferreira, São Paulo</dd></div>
              <div><dt>Horários</dt><dd>Almoço e jantar • consulte a programação da semana</dd></div>
            </dl>
            <div className="inline-actions">
              <a className="button button-gold" href="#reservas">Reservar</a>
              <a className="button button-outline" href="https://www.google.com/maps/search/?api=1&query=Borogod%C3%B3%20Bar%20e%20Restaurante%20Porto%20Ferreira%20SP" target="_blank" rel="noreferrer">Como chegar</a>
            </div>
          </div>
        </div>
      </section>

      <section id="reservas" className="section reservations-section">
        <div className="reservation-grid" data-reveal>
          <div>
            <p className="eyebrow">Reservas</p>
            <h2>Escolha a noite. A casa cuida do resto.</h2>
            <p>Reserve uma mesa para jantar, celebrar ou acompanhar a programação de música ao vivo.</p>
          </div>
          <form onSubmit={submitReservation}>
            <label>Nome<input required name="name" placeholder="Seu nome" /></label>
            <label>Telefone<input required name="phone" placeholder="WhatsApp" /></label>
            <label>Data<input required name="date" type="date" /></label>
            <label>Pessoas<input required name="guests" type="number" min="1" placeholder="2" /></label>
            <button className="button button-gold" type="submit">Enviar reserva</button>
            {sent && <p className="form-note">Recebemos seu pedido. A equipe entrará em contato para confirmar.</p>}
          </form>
        </div>
      </section>

      <footer className="footer">
        <div />
        <strong>Borogodó Bar & Restaurante</strong>
        <p>Instagram • WhatsApp • Porto Ferreira, SP • Almoço e jantar</p>
      </footer>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="lightbox" onClick={() => setLightbox(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.img src={lightbox.src} alt={lightbox.alt} initial={{ scale: 0.96 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
