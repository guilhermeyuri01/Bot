"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const ribbonColors = ["#0057B8", "#FFD700", "#CC0000", "#228B22", "#FF6B00", "#6B21A8"];

const experiences = [
  { icon: "🎵", title: "Música ao vivo", text: "Noites com brasilidade, voz, violão e encontros que ficam na memória." },
  { icon: "🍹", title: "Drinks especiais", text: "Coquetelaria autoral com caju, limão, gengibre, frutas e temperos brasileiros." },
  { icon: "🍽️", title: "Gastronomia brasileira", text: "Receitas regionais em panelas de barro, sabores intensos e apresentação caprichada." },
  { icon: "🎨", title: "Ambiente artístico", text: "Murais, fitinhas e cores que transformam cada mesa em uma cena cultural." },
  { icon: "🌟", title: "Atendimento diferenciado", text: "Acolhimento de bar brasileiro com cuidado de restaurante premium." },
  { icon: "📍", title: "Porto Ferreira, SP", text: "Uma esquina vibrante na Av. Dr. José Ferreira Azambuja, 121." },
];

const dishes = [
  {
    name: "Baião Borogodó na panela de barro",
    tag: "Casa • Regional",
    image: "baião",
    text: "Arroz, feijão, carne suína, farofa dourada e vinagrete fresco em uma leitura generosa da cozinha nordestina.",
  },
  {
    name: "Moqueca baiana de tempero marcante",
    tag: "Bahia • Afeto",
    image: "moqueca",
    text: "Caldo aromático, pimenta discreta e textura envolvente para quem procura comida brasileira com alma.",
  },
  {
    name: "Batata trufada com pancetta",
    tag: "Bar • Compartilhar",
    image: "batata",
    text: "Crosta rústica, creme sedoso e pancetta crocante — perfeita para abrir a noite com chope gelado.",
  },
];

const gallery = [
  { label: "Fachada artística iluminada", theme: "facade", size: "lg" },
  { label: "Salão com cadeiras coloridas", theme: "salon", size: "sm" },
  { label: "Drink autoral de caju", theme: "drink", size: "md" },
  { label: "Panelas de barro", theme: "clay", size: "md" },
  { label: "Fitinhas e mural neon", theme: "ribbons", size: "lg" },
  { label: "Gastronomia regional", theme: "food", size: "sm" },
];

const testimonials = [
  {
    name: "CSM Diversões",
    quote: "Muito cativante, comida saborosa. Apresentação do prato caprichada, pimenta da casa muito saborosa e suco de caju delicioso.",
  },
  {
    name: "Renan Carvalho",
    quote: "Chegando em Porto Ferreira, paramos para conhecer — decisão acertada. Ótimas opções e ambiente com personalidade.",
  },
  {
    name: "Rose dos Véus Véus",
    quote: "Comida perfeita e muito gostosa. A salada gloriosa realmente é gloriosa, a parmegiana perfeita.",
  },
  {
    name: "Durval",
    quote: "Experiência bacana. Estávamos de passagem na cidade e paramos para almoçar; mesas disponíveis e clima acolhedor.",
  },
];

function RibbonDivider({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "ribbon-divider compact" : "ribbon-divider"} aria-hidden="true">
      {Array.from({ length: compact ? 18 : 34 }).map((_, index) => (
        <span
          key={index}
          style={{
            background: ribbonColors[index % ribbonColors.length],
            animationDelay: `${index * 0.09}s`,
          }}
        />
      ))}
    </div>
  );
}

function ArtImage({ theme, label }: { theme: string; label: string }) {
  return (
    <div className={`art-image art-${theme}`} role="img" aria-label={label}>
      <div className="grain" />
      <div className="ribbon-mat" />
      {theme === "facade" && (
        <div className="facade-illustration">
          <strong>Borogodó</strong>
          <span />
        </div>
      )}
      {theme !== "facade" && <div className="clay-plate" />}
    </div>
  );
}

export default function Home() {
  const [activeReview, setActiveReview] = useState(0);
  const [selectedImage, setSelectedImage] = useState<(typeof gallery)[number] | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);

  const counters = useMemo(() => [
    { value: "4.8", label: "média no Google" },
    { value: "+800", label: "avaliações" },
    { value: "6", label: "experiências em uma noite" },
  ], []);

  useEffect(() => {
    const nodes = rootRef.current?.querySelectorAll(".reveal");
    if (!nodes) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.16 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % testimonials.length);
    }, 4600);
    return () => window.clearInterval(timer);
  }, []);

  function handleReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsConfirmed(true);
  }

  return (
    <main ref={rootRef} className="site-shell">
      <nav className="top-nav" aria-label="Navegação principal">
        <a href="#inicio" className="brand-mark">Borogodó</a>
        <div>
          <a href="#sobre">Sobre</a>
          <a href="#experiencia">Experiência</a>
          <a href="#pratos">Pratos</a>
          <a href="#reservas">Reservas</a>
        </div>
      </nav>

      <section id="inicio" className="hero-section">
        <ArtImage theme="facade" label="Fachada artística do Borogodó com murais coloridos" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow cinematic">Porto Ferreira • Arte brasileira • Gastronomia regional</p>
          <h1 className="cinematic delay-1">BOROGODÓ</h1>
          <p className="hero-subtitle cinematic delay-2">Arte, sabor e tradição brasileira em um só lugar.</p>
          <div className="rating-pill cinematic delay-3">⭐⭐⭐⭐⭐ <strong>4.8 no Google</strong> — Mais de 800 avaliações</div>
          <div className="hero-actions cinematic delay-4">
            <a href="#reservas" className="button primary">Reservar Mesa</a>
            <a href="#pratos" className="button secondary">Ver Cardápio</a>
            <a href="https://wa.me/5519999999999" className="button ghost">WhatsApp</a>
          </div>
        </div>
        <RibbonDivider compact />
      </section>

      <section id="sobre" className="section about-grid reveal">
        <div className="copy-block">
          <p className="eyebrow">Sobre o Borogodó</p>
          <h2>Uma esquina onde a cultura brasileira senta à mesa.</h2>
          <p>
            O Borogodó Bar & Restaurante nasce do encontro entre comida de verdade, arte popular, música ao vivo e o
            calor de receber bem. A fachada muralizada anuncia a experiência: dentro, fitinhas coloridas, panelas de
            barro, cadeiras vibrantes e pratos regionais contam uma história de afeto, tempero e identidade.
          </p>
          <p>
            Não é apenas sobre almoço, jantar ou drink. É sobre chegar em Porto Ferreira e encontrar um lugar com alma,
            personalidade e aquele encanto brasileiro difícil de explicar — mas impossível de esquecer.
          </p>
        </div>
        <div className="about-art-stack">
          <ArtImage theme="salon" label="Ambiente interno com arte, mesas e cadeiras coloridas" />
          <ArtImage theme="ribbons" label="Fitinhas brasileiras e mural artístico" />
        </div>
      </section>

      <RibbonDivider />

      <section id="experiencia" className="section reveal">
        <div className="section-heading centered">
          <p className="eyebrow">Experiência Borogodó</p>
          <h2>O sabor chega com música, cor e presença.</h2>
        </div>
        <div className="experience-cloud">
          {experiences.map((item, index) => (
            <article className="experience-card" key={item.title} style={{ animationDelay: `${index * 0.08}s` }}>
              <span>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pratos" className="section dishes-section reveal">
        <div className="section-heading">
          <p className="eyebrow">Pratos em destaque</p>
          <h2>Gastronomia de revista, tempero de casa brasileira.</h2>
        </div>
        <div className="dish-list">
          {dishes.map((dish, index) => (
            <article className={index % 2 ? "dish-row reverse" : "dish-row"} key={dish.name}>
              <ArtImage theme={dish.image} label={dish.name} />
              <div>
                <span>{dish.tag}</span>
                <h3>{dish.name}</h3>
                <p>{dish.text}</p>
                <a href="#reservas">Experimentar no Borogodó →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section gallery-section reveal" aria-labelledby="galeria-title">
        <div className="section-heading centered">
          <p className="eyebrow">Galeria Premium</p>
          <h2 id="galeria-title">Um lugar feito para ser sentido — e fotografado.</h2>
        </div>
        <div className="masonry-gallery">
          {gallery.map((item) => (
            <button className={`gallery-tile ${item.size}`} key={item.label} onClick={() => setSelectedImage(item)} type="button">
              <ArtImage theme={item.theme} label={item.label} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section reviews-section reveal">
        <div className="trust-panel">
          <div>
            <p className="eyebrow">Avaliações</p>
            <h2>⭐⭐⭐⭐⭐ 4.8 média — +800 avaliações no Google</h2>
          </div>
          <div className="counter-row">
            {counters.map((counter) => (
              <div className="counter-card" key={counter.label}>
                <strong>{counter.value}</strong>
                <span>{counter.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="testimonial-carousel">
          {testimonials.map((item, index) => (
            <article className={index === activeReview ? "testimonial active" : "testimonial"} key={item.name}>
              <span>★★★★★</span>
              <p>“{item.quote}”</p>
              <strong>{item.name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section location-grid reveal">
        <div className="map-card">
          <div className="map-pin">Borogodó</div>
        </div>
        <div className="copy-block">
          <p className="eyebrow">Localização</p>
          <h2>Av. Dr. José Ferreira Azambuja, 121, Porto Ferreira - SP</h2>
          <p><strong>Horários:</strong> terça a domingo, almoço e noite. Consulte programação de música ao vivo.</p>
          <div className="hero-actions local-actions">
            <a className="button primary" href="https://maps.google.com/?q=Av.+Dr.+José+Ferreira+Azambuja,+121,+Porto+Ferreira+-+SP">Como chegar</a>
            <a className="button secondary" href="#reservas">Reservar agora</a>
            <a className="button ghost" href="https://wa.me/5519999999999">WhatsApp</a>
          </div>
        </div>
      </section>

      <section id="reservas" className="section reservation-section reveal">
        <div className="reservation-copy">
          <p className="eyebrow">Reservas</p>
          <h2>Garanta sua mesa para uma noite com borogodó.</h2>
          <p>Preencha os dados e receba uma confirmação elegante na tela. Para reservas imediatas, chame no WhatsApp.</p>
        </div>
        <form className="reservation-form" onSubmit={handleReservation}>
          <input aria-label="Nome" placeholder="Nome" required />
          <input aria-label="Email" placeholder="Email" type="email" required />
          <input aria-label="Telefone" placeholder="Telefone" type="tel" required />
          <input aria-label="Número de pessoas" placeholder="Número de pessoas" min="1" type="number" required />
          <input aria-label="Data" type="date" required />
          <input aria-label="Horário" type="time" required />
          <button className="button primary" type="submit">Confirmar reserva</button>
        </form>
      </section>

      <footer className="footer">
        <RibbonDivider compact />
        <p>Borogodó Bar & Restaurante — cultura, arte, música e gastronomia brasileira em Porto Ferreira.</p>
      </footer>

      {selectedImage && (
        <button className="lightbox" onClick={() => setSelectedImage(null)} type="button" aria-label="Fechar galeria">
          <div>
            <ArtImage theme={selectedImage.theme} label={selectedImage.label} />
            <strong>{selectedImage.label}</strong>
          </div>
        </button>
      )}

      {isConfirmed && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Reserva solicitada">
          <div className="modal-card">
            <span>✓</span>
            <h2>Reserva solicitada com borogodó.</h2>
            <p>Recebemos seus dados. Nossa equipe entrará em contato para confirmar todos os detalhes.</p>
            <button className="button primary" onClick={() => setIsConfirmed(false)} type="button">Perfeito</button>
          </div>
        </div>
      )}
    </main>
  );
}
