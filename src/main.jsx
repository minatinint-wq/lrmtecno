import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  Code2,
  Cpu,
  ExternalLink,
  Globe2,
  Headphones,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  MonitorCog,
  Moon,
  PanelTop,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Users,
  X,
  Zap
} from 'lucide-react';
import './styles.css';

const ASSETS = {
  logo: '/assets/lrm-logo.png',
  logoVideo: '/assets/lrm-logo-animada.mp4',
  leadio: '/assets/leadio-dashboard.png',
  partnerIcon: '/assets/partner-icon.png',
  primeiraChave: '/assets/primeira-chave.png'
};

const services = [
  {
    slug: 'design-web',
    title: 'Design Web',
    icon: PanelTop,
    tag: 'Interfaces premium',
    desc: 'Experiências visuais modernas, responsivas e pensadas para transmitir confiança no primeiro clique.',
    bullets: ['Direção visual', 'Landing pages', 'UI responsiva', 'Copy de conversão'],
    price: 'Sob análise',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&auto=format&fit=crop',
    packages: [
      { name: 'Landing Page', price: 'R$ 997', period: '', tag: 'Avulso', desc: 'Página única com design premium e formulário de captura.', features: ['Design exclusivo', 'Responsivo', 'Formulário integrado', 'Animação sutil'], popular: false },
      { name: 'Site Completo', price: 'R$ 2.497', period: '', tag: 'Avulso', desc: 'Site institucional com identidade visual, blog e contato.', features: ['Identidade visual', 'Múltiplas páginas', 'Blog integrado', 'SEO base'], popular: true },
      { name: 'Portal Sob Medida', price: 'Sob análise', period: '', tag: 'Projeto', desc: 'Design system + múltiplos módulos com painel.', features: ['Sistema de design', 'Dashboards', 'Copy profissional', 'Hospedagem'], popular: false }
    ]
  },
  {
    slug: 'sites-responsivos',
    title: 'Sites Responsivos',
    icon: Globe2,
    tag: 'Presença digital',
    desc: 'Sites institucionais rápidos, elegantes e preparados para celular, desktop e publicação profissional.',
    bullets: ['Mobile-first', 'Performance', 'SEO base', 'Hospedagem orientada'],
    price: 'A partir do briefing',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&auto=format&fit=crop',
    packages: [
      { name: 'Landpage', price: 'R$ 1.497', period: '', tag: 'Avulso', desc: 'Landing page responsiva com performance e SEO.', features: ['Mobile-first', 'Performance otimizada', 'SEO base', 'Hospedagem 1 ano'], popular: false },
      { name: 'Site Institucional', price: 'R$ 2.997', period: '', tag: 'Avulso', desc: 'Site completo com blog, galeria e formulários.', features: ['Responsivo', 'Blog integrado', 'Galeria de imagens', 'Suporte 3 meses'], popular: true },
      { name: 'Portal + CMS', price: 'Sob análise', period: '', tag: 'Projeto', desc: 'Portal completo com sistema de gerenciamento próprio.', features: ['CMS personalizado', 'Painel admin', 'Múltiplos idiomas', 'Treinamento'], popular: false }
    ]
  },
  {
    slug: 'sistemas',
    title: 'Sistemas Personalizados',
    icon: Code2,
    tag: 'Operação sob medida',
    desc: 'Painéis, fluxos, cadastros, automações e ferramentas internas feitas para o processo real da empresa.',
    bullets: ['Dashboards', 'Cadastros', 'Controle interno', 'Relatórios'],
    price: 'Projeto personalizado',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop',
    packages: [
      { name: 'Módulo Único', price: 'R$ 3.497', period: '', tag: 'Avulso', desc: 'Módulo específico para automatizar um processo.', features: ['Cadastro inteligente', 'Relatórios básicos', 'Exportação dados', 'Suporte 30 dias'], popular: false },
      { name: 'Sistema Completo', price: 'R$ 7.497', period: '', tag: 'Avulso', desc: 'Sistema com múltiplos módulos e painel admin.', features: ['Múltiplos módulos', 'Dashboard gerencial', 'Controle de acesso', 'Suporte 6 meses'], popular: true },
      { name: 'Plataforma', price: 'Sob análise', period: '', tag: 'Projeto', desc: 'Plataforma integrada com API e app.', features: ['API REST', 'App mobile', 'Escalável', 'Treinamento equipe'], popular: false }
    ]
  },
  {
    slug: 'crm',
    title: 'CRM e Automação',
    icon: BarChart3,
    tag: 'Vendas e atendimento',
    desc: 'Gestão de leads, funil comercial, follow-up, integração com WhatsApp e rotina de vendas mais previsível.',
    bullets: ['Leads', 'Funil', 'Comissões', 'Automações'],
    price: 'Plano consultivo',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop',
    packages: [
      { name: 'CRM Básico', price: 'R$ 1.997', period: '', tag: 'Avulso', desc: 'Gestão de leads e funil comercial simplificado.', features: ['Captura de leads', 'Funil visual', 'Etiquetas', 'Integração WhatsApp'], popular: false },
      { name: 'CRM Profissional', price: 'R$ 4.997', period: '', tag: 'Avulso', desc: 'CRM completo com automação e comissões.', features: ['Automação de follow-up', 'Comissões', 'Relatórios', 'API para integração'], popular: true },
      { name: 'CRM Enterprise', price: 'Sob análise', period: '', tag: 'Projeto', desc: 'CRM + automação + painel exclusivo.', features: ['Módulo financeiro', 'BI integrado', 'App mobile', 'Suporte prioritário'], popular: false }
    ]
  },
  {
    slug: 'manutencao',
    title: 'Manutenção de Computadores',
    icon: MonitorCog,
    tag: 'Suporte técnico',
    desc: 'Diagnóstico, limpeza, formatação, upgrade e otimização para manter equipamentos funcionando bem.',
    bullets: ['Desktop', 'Notebook', 'Upgrade', 'Otimização'],
    price: 'Conforme diagnóstico',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=900&auto=format&fit=crop',
    packages: [
      { name: 'Limpeza', price: 'R$ 99', period: '', tag: 'Avulso', desc: 'Limpeza preventiva completa para aumentar a vida útil.', features: ['Limpeza interna', 'Troca pasta térmica', 'Limpeza conectores', 'Teste temperatura'], popular: false },
      { name: 'Limpeza + Formatação', price: 'R$ 149', period: '', tag: 'Avulso', desc: 'Limpeza + formatação com instalação de SO e drivers.', features: ['Limpeza completa', 'Formatação + SO', 'Drivers atualizados', 'Backup de arquivos'], popular: true },
      { name: 'Plano Mensal', price: 'R$ 69', period: '/mês', tag: 'Mensal', desc: 'Manutenção preventiva mensal com suporte remoto ilimitado.', features: ['Limpeza mensal', 'Verificação hardware', 'Suporte remoto', 'Desconto avulsos'], popular: false }
    ]
  },
  {
    slug: 'consultoria',
    title: 'Consultoria de TI',
    icon: Cpu,
    tag: 'Decisão técnica',
    desc: 'Planejamento de ferramentas, estrutura, processos digitais e decisões técnicas para reduzir desperdício.',
    bullets: ['Diagnóstico', 'Roadmap', 'Infraestrutura', 'Custos'],
    price: 'Por escopo',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop',
    packages: [
      { name: 'Diagnóstico', price: 'R$ 497', period: '', tag: 'Avulso', desc: 'Diagnóstico técnico completo com relatório e recomendações.', features: ['Análise infraestrutura', 'Mapeamento processos', 'Relatório executivo', 'Recomendações'], popular: false },
      { name: 'Projeto', price: 'R$ 1.497', period: '', tag: 'Avulso', desc: 'Projeto de TI com roadmap, orçamento e cronograma.', features: ['Roadmap técnico', 'Orçamento detalhado', 'Cronograma', 'Apresentação'], popular: true },
      { name: 'Acompanhamento', price: 'R$ 2.497', period: '', tag: 'Mensal', desc: 'Consultoria mensal para acompanhamento e ajustes.', features: ['Suporte mensal', 'Ajustes processos', 'Relatórios periódicos', 'Disponibilidade'], popular: false }
    ]
  }
];

const workItems = [
  {
    title: 'Leadio',
    tag: 'CRM proprietário',
    desc: 'Sistema de gestão de leads com métricas em tempo real, distribuição automática, comissões e funil comercial.',
    image: ASSETS.leadio,
    url: 'https://leadio.base44.app/'
  }
];

const partners = [
  { name: 'Primeira Chave', sub: 'Parceira estratégica', image: ASSETS.primeiraChave },
  { name: 'LRM Labs', sub: 'Produto e automação', image: ASSETS.partnerIcon }
];

const defaultAdmin = {
  id: 1,
  name: 'Lucas Mondadori',
  email: 'admin@lrmtecno.com',
  phone: '(12) 98707-6691',
  password: 'admin123',
  role: 'admin'
};

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function initStore() {
  const users = read('lrm_react_users', []);
  if (!users.length) {
    write('lrm_react_users', [defaultAdmin]);
    localStorage.setItem('lrm_react_next_id', '2');
  }
}

function nextId() {
  const id = Number(localStorage.getItem('lrm_react_next_id') || '2');
  localStorage.setItem('lrm_react_next_id', String(id + 1));
  return id;
}

function getCurrentUser() {
  return read('lrm_react_session', null);
}

function setCurrentUser(user) {
  write('lrm_react_session', user);
}

function clearCurrentUser() {
  localStorage.removeItem('lrm_react_session');
}

function useRoute() {
  const [route, setRoute] = useState(() => location.hash.replace('#', '') || '/');
  useEffect(() => {
    const onHash = () => setRoute(location.hash.replace('#', '') || '/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const go = (to) => {
    location.hash = to;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return [route, go];
}

const pageVariants = {
  initial: { opacity: 0, y: 18, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, filter: 'blur(8px)', transition: { duration: 0.24 } }
};

function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

function MagneticButton({ children, className = '', onClick, href, target }) {
  const Comp = href ? motion.a : motion.button;
  return (
    <Comp
      href={href}
      target={target}
      onClick={onClick}
      className={`btn ${className}`}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </Comp>
  );
}

function Shell({ children, route, go, user, setUser }) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('lrm_react_theme') === 'dark');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('lrm_react_theme', dark ? 'dark' : 'light');
  }, [dark]);

  const nav = [
    ['/', 'Home'],
    ['/servicos', 'Serviços'],
    ['/trabalhos', 'Trabalhos'],
    ['/referencias', 'Referências'],
    ['/parceiras', 'Parceiras'],
    ['/contato', 'Contato']
  ];

  const logout = () => {
    clearCurrentUser();
    setUser(null);
    go('/');
  };

  const navLink = ([to, label]) => (
    <button key={to} className={route === to ? 'nav-link active' : 'nav-link'} onClick={() => go(to)}>
      {label}
    </button>
  );

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <header className="nav">
        <button className="brand" onClick={() => go('/')}>
          <span className="brand-mark">LRM</span>
          <span>TECNO</span>
        </button>
        <nav className="nav-links">{nav.map(navLink)}</nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Alternar tema">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user ? (
            <>
              <button className="ghost-link" onClick={() => go(user.role === 'admin' ? '/admin' : '/dashboard')}>
                {user.role === 'admin' ? 'Admin' : 'Portal'}
              </button>
              <button className="nav-cta" onClick={logout}>Sair</button>
            </>
          ) : (
            <>
              <button className="ghost-link" onClick={() => go('/login')}>Área do Cliente</button>
              <button className="nav-cta" onClick={() => go('/login')}>Solicitar Orçamento</button>
            </>
          )}
          <button className="icon-btn menu-btn" onClick={() => setOpen(true)} aria-label="Menu">
            <Menu size={20} />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="drawer-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.aside className="drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 250, damping: 28 }}>
              <div className="drawer-head">
                <strong>LRM TECNO</strong>
                <button className="icon-btn" onClick={() => setOpen(false)}><X size={20} /></button>
              </div>
              {[...nav, ['/login', user ? 'Portal' : 'Área do Cliente']].map(([to, label]) => (
                <button key={to} onClick={() => { setOpen(false); go(to); }} className="drawer-link">{label}</button>
              ))}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
      <footer className="footer">
        <div>
          <strong>LRM TECNO</strong>
          <span>Soluções digitais, CRM, sistemas e suporte de TI.</span>
        </div>
        <div className="footer-links">
          <a href="https://wa.me/5512987076691" target="_blank">WhatsApp</a>
          <a href="https://instagram.com/lrm_tecno" target="_blank">Instagram</a>
          <a href="mailto:lucas-mondadori@hotmail.com">Email</a>
        </div>
      </footer>
    </>
  );
}

function HeroScene({ go }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);
  const scale = useTransform(scrollY, [0, 700], [1, 1.14]);
  return (
    <section className="home-hero">
      <motion.div className="hero-video-wrap" style={{ y, scale }}>
        <video src={ASSETS.logoVideo} poster={ASSETS.logo} autoPlay muted loop playsInline preload="metadata" />
      </motion.div>
      <div className="hero-shield" />
      <div className="hero-content">
        <motion.div className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Sparkles size={16} /> Tecnologia premium para empresas
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.7 }}>
          LRM TECNO
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.7 }}>
          Sites, sistemas, CRM, automações e suporte técnico com uma experiência digital à altura de uma empresa de tecnologia.
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}>
          <MagneticButton className="primary" onClick={() => go('/login')}>Entrar e solicitar orçamento <ArrowRight size={18} /></MagneticButton>
          <MagneticButton className="outline" onClick={() => go('/servicos')}>Ver soluções</MagneticButton>
          <MagneticButton className="whatsapp" href="https://wa.me/5512987076691" target="_blank"><MessageCircle size={18} /> WhatsApp</MagneticButton>
        </motion.div>
      </div>
      <motion.div className="hero-dashboard" initial={{ opacity: 0, y: 40, rotateX: 12 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.52, duration: 0.8 }}>
        <div className="dash-top"><span /><span /><span /><strong>portal.lrmtecno</strong></div>
        <div className="hero-metrics">
          <div><strong>24h</strong><span>triagem</span></div>
          <div><strong>CRM</strong><span>funil</span></div>
          <div><strong>Web</strong><span>premium</span></div>
        </div>
      </motion.div>
    </section>
  );
}

function Home({ go }) {
  return (
    <Page>
      <HeroScene go={go} />
      <section className="trust-strip">
        {['Atendimento online', 'Portal do cliente', 'Orçamento estruturado', 'Suporte pós-entrega'].map((item) => (
          <span key={item}><BadgeCheck size={16} /> {item}</span>
        ))}
      </section>
      <section className="section">
        <Reveal className="section-head">
          <span className="eyebrow">Especialidades</span>
          <h2>Uma operação digital com cara de empresa grande</h2>
          <p>Visual premium, processos claros e ferramentas criadas para resolver o que realmente trava seu negócio.</p>
        </Reveal>
        <div className="service-grid">
          {services.slice(0, 4).map((s, i) => <ServiceCard key={s.slug} service={s} delay={i * 0.07} go={go} />)}
        </div>
      </section>
      <PortalPreview go={go} />
      <ProcessSection />
      <CTA go={go} title="Crie sua conta e peça um orçamento com contexto." text="O cliente entra, descreve o projeto e acompanha a resposta da LRM no portal." />
    </Page>
  );
}

function Page({ children }) {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.main>
  );
}

function PageHero({ label, title, text, children }) {
  return (
    <section className="page-hero-react">
      <motion.div className="orb orb-a" animate={{ y: [0, -28, 0], x: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity }} />
      <motion.div className="orb orb-b" animate={{ y: [0, 24, 0], x: [0, -22, 0] }} transition={{ duration: 9, repeat: Infinity }} />
      <div className="page-hero-inner">
        <Reveal>
          <span className="eyebrow">{label}</span>
          <h1>{title}</h1>
          <p>{text}</p>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCard({ service, delay = 0, go }) {
  const Icon = service.icon;
  return (
    <Reveal delay={delay} className="service-card" as="article">
      <div className="service-card-top">
        <div className="service-icon"><Icon size={24} /></div>
        <span>{service.tag}</span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.desc}</p>
      <ul>
        {service.bullets.map((b) => <li key={b}><Check size={14} /> {b}</li>)}
      </ul>
      <button onClick={() => go(`/servicos/${service.slug}`)}>Detalhes <ChevronRight size={16} /></button>
    </Reveal>
  );
}

function ServicesPage({ go }) {
  return (
    <Page>
      <PageHero label="Serviços" title="Soluções que parecem premium porque funcionam como premium" text="Escolha uma frente de tecnologia e solicite orçamento pelo portal do cliente." />
      <section className="section">
        <div className="service-grid all">
          {services.map((s, i) => <ServiceCard key={s.slug} service={s} delay={i * 0.06} go={go} />)}
        </div>
      </section>
      <CTA go={go} title="Quer orçamento sem conversa solta?" text="Entre no portal, envie o briefing e acompanhe a resposta." />
    </Page>
  );
}

function ServiceDetail({ slug, go }) {
  const service = services.find((s) => s.slug === slug) || services[0];
  const Icon = service.icon;
  return (
    <Page>
      <section className="detail-hero">
        <div className="detail-hero-bg" style={{ backgroundImage: `url(${service.image})` }} />
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          <Reveal>
            <button className="detail-back" onClick={() => go('/servicos')}>&larr; Voltar para Serviços</button>
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,.5)' }}>{service.tag}</span>
            <h1>{service.title}</h1>
            <p>{service.desc}</p>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <Reveal className="detail-panel-compact">
          <div className="service-icon large"><Icon size={32} /></div>
          <div className="chips">{service.bullets.map((b) => <span key={b}>{b}</span>)}</div>
        </Reveal>
      </section>
      <section className="section section-pricing">
        <Reveal className="section-head" style={{ marginBottom: '1rem' }}>
          <h2>Preços</h2>
          <p>Valores de referência — cada orçamento é personalizado conforme o escopo.</p>
        </Reveal>
        <div className="pricing-grid packages-grid">
          {service.packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.08} className={pkg.popular ? 'price-card featured' : 'price-card'}>
              {pkg.popular && <div className="popular-badge">Mais popular</div>}
              <span className="pkg-tier">{pkg.tag}</span>
              <h3>{pkg.name}</h3>
              <div className="pkg-price">
                <strong>{pkg.price}</strong>
                {pkg.period && <small>{pkg.period}</small>}
              </div>
              <p>{pkg.desc}</p>
              <ul className="pkg-features">
                {pkg.features.map((f) => <li key={f}><Check size={14} /> {f}</li>)}
              </ul>
              <a href={`https://wa.me/5512987076691?text=${encodeURIComponent('Olá, vim pelo site LRM TECNO e gostaria de solicitar ' + service.title + ' - ' + pkg.name + '.')}`} target="_blank" className="btn-whatsapp-pkg">
                <MessageCircle size={16} /> Solicitar via WhatsApp
              </a>
            </Reveal>
          ))}
        </div>
        <div className="center-block" style={{ marginTop: '2rem' }}>
          <Reveal>
            <div className="hero-actions center">
              <MagneticButton className="primary" onClick={() => go('/login')}>Solicitar orçamento no portal <ArrowRight size={18} /></MagneticButton>
              <MagneticButton className="outline" href={`https://wa.me/5512987076691?text=${encodeURIComponent('Olá, vim pelo site LRM TECNO e gostaria de saber mais sobre ' + service.title + '.')}`} target="_blank">Falar no WhatsApp</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}

function WorksPage({ go }) {
  return (
    <Page>
      <PageHero label="Trabalhos" title="Projetos com produto, operação e presença" text="A vitrine da LRM combina sistemas próprios e soluções criadas para clientes." />
      <section className="section works-section">
        {workItems.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08} className="work-showcase">
            <div className="browser">
              <div className="browser-bar"><span /><span /><span /><strong>{item.url.replace('https://', '')}</strong></div>
              <img src={item.image} alt={item.title} />
            </div>
            <div className="work-copy">
              <span className="eyebrow">{item.tag}</span>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <div className="hero-actions">
                <MagneticButton className="primary" href={item.url} target="_blank">Abrir projeto <ExternalLink size={18} /></MagneticButton>
                <MagneticButton className="outline" onClick={() => go('/login')}>Quero algo assim</MagneticButton>
              </div>
            </div>
          </Reveal>
        ))}
      </section>
    </Page>
  );
}

function ReferencesPage({ go }) {
  const reviews = read('lrm_react_reviews', []);
  const fallback = [
    { name: 'Cliente LRM', role: 'Sistema web', text: 'Atendimento direto, proposta clara e entrega com visual muito acima do esperado.', rating: 5 },
    { name: 'Operação Comercial', role: 'CRM', text: 'A organização do funil e dos leads mudou nossa rotina de acompanhamento.', rating: 5 }
  ];
  const data = reviews.length ? reviews : fallback;
  return (
    <Page>
      <PageHero label="Referências" title="Confiança construída em entrega" text="Depoimentos e avaliações aparecem no portal depois que um serviço é concluído." />
      <section className="section">
        <div className="refs-grid">
          {data.map((r, i) => (
            <Reveal key={`${r.name}-${i}`} delay={i * 0.08} className="ref-card-react">
              <div className="stars">{Array.from({ length: r.rating || 5 }).map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}</div>
              <p>“{r.text}”</p>
              <strong>{r.name || r.clientName}</strong>
              <span>{r.role || 'Cliente LRM'}</span>
            </Reveal>
          ))}
        </div>
        <div className="center-block">
          <MagneticButton className="primary" onClick={() => go('/login')}>Acessar portal</MagneticButton>
        </div>
      </section>
    </Page>
  );
}

function PartnersPage({ go }) {
  return (
    <Page>
      <PageHero label="Parceiras" title="Ecossistema para construir soluções melhores" text="Parceiros e produtos conectados à operação digital da LRM TECNO." />
      <section className="section">
        <div className="partners-grid">
          {partners.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="partner-card">
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <span>{p.sub}</span>
            </Reveal>
          ))}
        </div>
        <CTA go={go} title="Quer construir com a LRM?" text="Solicite orçamento e descreva o projeto no portal." compact />
      </section>
    </Page>
  );
}

function ContactPage({ go }) {
  return (
    <Page>
      <PageHero label="Contato" title="Fale com a LRM TECNO" text="Para orçamento estruturado use o portal. Para conversa rápida, WhatsApp, email e Instagram continuam disponíveis." />
      <section className="section contact-layout">
        <Reveal className="contact-card">
          <h2>Canais diretos</h2>
          <ContactRow icon={Phone} label="WhatsApp" value="(12) 98707-6691" href="https://wa.me/5512987076691" />
          <ContactRow icon={Mail} label="Email" value="lucas-mondadori@hotmail.com" href="mailto:lucas-mondadori@hotmail.com" />
          <ContactRow icon={Globe2} label="Atendimento" value="Online em todo Brasil" />
          <MagneticButton className="primary full" onClick={() => go('/login')}>Solicitar orçamento no portal</MagneticButton>
        </Reveal>
        <Reveal delay={0.1} className="contact-visual">
          <LayoutDashboard size={54} />
          <h3>Portal do cliente</h3>
          <p>Crie a conta, envie briefing, acompanhe resposta, abra tickets e avalie serviços concluídos.</p>
        </Reveal>
      </section>
    </Page>
  );
}

function ContactRow({ icon: Icon, label, value, href }) {
  const body = <><Icon size={20} /><div><span>{label}</span><strong>{value}</strong></div></>;
  return href ? <a className="contact-row" href={href} target={href.startsWith('http') ? '_blank' : undefined}>{body}</a> : <div className="contact-row">{body}</div>;
}

function PortalPreview({ go }) {
  return (
    <section className="portal-section">
      <Reveal className="portal-copy">
        <span className="eyebrow">Área do Cliente</span>
        <h2>Orçamento, tickets e serviços no mesmo painel</h2>
        <p>O site deixa de ser só vitrine. O cliente entra, descreve o projeto, acompanha status e recebe resposta do admin.</p>
        <MagneticButton className="primary" onClick={() => go('/login')}>Abrir portal <ArrowRight size={18} /></MagneticButton>
      </Reveal>
      <Reveal delay={0.12} className="portal-glass">
        {['Orçamento solicitado', 'Proposta técnica', 'Ticket aberto', 'Serviço para avaliar'].map((item, i) => (
          <motion.div key={item} className={i === 0 ? 'portal-line active' : 'portal-line'} whileHover={{ x: 8 }}>
            <span>{item}</span><strong>{i === 0 ? 'Novo' : 'OK'}</strong>
          </motion.div>
        ))}
      </Reveal>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="section process">
      {['Briefing', 'Proposta', 'Execução', 'Entrega'].map((step, i) => (
        <Reveal key={step} delay={i * 0.08} className="process-step">
          <span>0{i + 1}</span>
          <h3>{step}</h3>
          <p>{['Entendemos a necessidade.', 'Registramos escopo e próximos passos.', 'Construímos com acompanhamento.', 'Finalizamos e abrimos suporte.'][i]}</p>
        </Reveal>
      ))}
    </section>
  );
}

function CTA({ go, title, text, compact = false }) {
  return (
    <section className={compact ? 'cta compact' : 'cta'}>
      <Reveal>
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="hero-actions center">
          <MagneticButton className="primary" onClick={() => go('/login')}>Solicitar orçamento</MagneticButton>
          <MagneticButton className="outline" href="https://wa.me/5512987076691" target="_blank">WhatsApp</MagneticButton>
        </div>
      </Reveal>
    </section>
  );
}

function LoginPage({ go, setUser }) {
  const [tab, setTab] = useState('login');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  const submit = (e) => {
    e.preventDefault();
    setError('');
    const users = read('lrm_react_users', []);
    if (tab === 'register') {
      if (!form.name || !form.email || form.password.length < 6) return setError('Preencha nome, email e senha com mínimo de 6 caracteres.');
      if (users.some((u) => u.email === form.email)) return setError('Este email já está cadastrado.');
      const user = { id: nextId(), name: form.name, email: form.email, phone: form.phone, password: form.password, role: 'client' };
      write('lrm_react_users', [...users, user]);
      setCurrentUser(user);
      setUser(user);
      go('/dashboard');
      return;
    }
    const user = users.find((u) => u.email === form.email && u.password === form.password);
    if (!user) return setError('Email ou senha inválidos. Admin: admin@lrmtecno.com / admin123');
    setCurrentUser(user);
    setUser(user);
    go(user.role === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <Page>
      <section className="auth-react">
        <Reveal className="auth-brand">
          <video src={ASSETS.logoVideo} poster={ASSETS.logo} autoPlay muted loop playsInline />
          <h1>Portal LRM</h1>
          <p>Solicite orçamento, acompanhe proposta, abra tickets e veja serviços registrados.</p>
        </Reveal>
        <Reveal delay={0.1} className="auth-box">
          <div className="tabs">
            <button className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>Entrar</button>
            <button className={tab === 'register' ? 'active' : ''} onClick={() => setTab('register')}>Cadastrar</button>
          </div>
          <form onSubmit={submit}>
            {tab === 'register' && <Input label="Nome completo" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />}
            <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            {tab === 'register' && <Input label="Telefone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />}
            <Input label="Senha" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
            {error && <div className="error">{error}</div>}
            <MagneticButton className="primary full">{tab === 'login' ? 'Entrar' : 'Criar conta'}</MagneticButton>
          </form>
        </Reveal>
      </section>
    </Page>
  );
}

function Input({ label, value, onChange, type = 'text', textarea = false, options }) {
  return (
    <label className="field">
      <span>{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} />
      ) : options ? (
        <select value={value} onChange={(e) => onChange(e.target.value)}>{options.map((o) => <option key={o}>{o}</option>)}</select>
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function DashboardPage({ user, go, setUser }) {
  if (!user) return <RequireLogin go={go} />;
  const [quotes, setQuotes] = useState(read('lrm_react_quotes', []).filter((q) => q.userId === user.id));
  const [tickets, setTickets] = useState(read('lrm_react_tickets', []).filter((t) => t.userId === user.id));
  const [servicesList] = useState(read(`lrm_react_services_${user.id}`, []));
  const [quote, setQuote] = useState({ type: 'Site premium', project: '', budget: 'A definir', timeline: 'Até 30 dias', details: '' });
  const [ticket, setTicket] = useState({ subject: '', message: '' });

  const refreshQuotes = () => setQuotes(read('lrm_react_quotes', []).filter((q) => q.userId === user.id));
  const refreshTickets = () => setTickets(read('lrm_react_tickets', []).filter((t) => t.userId === user.id));

  const submitQuote = (e) => {
    e.preventDefault();
    if (!quote.project || quote.details.length < 12) return;
    const all = read('lrm_react_quotes', []);
    write('lrm_react_quotes', [{ ...quote, id: nextId(), userId: user.id, clientName: user.name, clientEmail: user.email, status: 'new', createdAt: new Date().toISOString(), reply: '', price: '' }, ...all]);
    setQuote({ type: 'Site premium', project: '', budget: 'A definir', timeline: 'Até 30 dias', details: '' });
    refreshQuotes();
  };

  const submitTicket = (e) => {
    e.preventDefault();
    if (!ticket.subject || ticket.message.length < 8) return;
    const all = read('lrm_react_tickets', []);
    write('lrm_react_tickets', [{ ...ticket, id: nextId(), userId: user.id, status: 'open', createdAt: new Date().toISOString(), reply: '' }, ...all]);
    setTicket({ subject: '', message: '' });
    refreshTickets();
  };

  const logout = () => {
    clearCurrentUser();
    setUser(null);
    go('/');
  };

  return (
    <Page>
      <PortalHeader user={user} logout={logout} title="Portal do Cliente" />
      <section className="portal-dashboard">
        <Metric label="Orçamentos" value={quotes.length} />
        <Metric label="Serviços" value={servicesList.length} />
        <Metric label="Tickets" value={tickets.length} />
        <Metric label="Em aberto" value={quotes.filter((q) => q.status !== 'approved').length + tickets.filter((t) => t.status === 'open').length} />
        <Reveal className="panel quote-panel">
          <h2>Solicitar orçamento</h2>
          <form onSubmit={submitQuote} className="grid-form">
            <Input label="Tipo" value={quote.type} onChange={(v) => setQuote({ ...quote, type: v })} options={services.map((s) => s.title)} />
            <Input label="Investimento" value={quote.budget} onChange={(v) => setQuote({ ...quote, budget: v })} options={['A definir', 'Até R$ 1.000', 'R$ 1.000 a R$ 3.000', 'R$ 3.000 a R$ 7.000', 'Acima de R$ 7.000']} />
            <Input label="Projeto" value={quote.project} onChange={(v) => setQuote({ ...quote, project: v })} />
            <Input label="Prazo" value={quote.timeline} onChange={(v) => setQuote({ ...quote, timeline: v })} options={['Até 7 dias', 'Até 15 dias', 'Até 30 dias', 'Sem urgência']} />
            <Input label="Detalhes" value={quote.details} onChange={(v) => setQuote({ ...quote, details: v })} textarea />
            <MagneticButton className="primary full">Enviar solicitação</MagneticButton>
          </form>
        </Reveal>
        <ListPanel title="Meus orçamentos" items={quotes} type="quote" />
        <ListPanel title="Serviços" items={servicesList} type="service" />
        <Reveal className="panel">
          <h2>Tickets</h2>
          <ListItems items={tickets} type="ticket" />
          <form onSubmit={submitTicket} className="ticket-form">
            <Input label="Assunto" value={ticket.subject} onChange={(v) => setTicket({ ...ticket, subject: v })} />
            <Input label="Mensagem" value={ticket.message} onChange={(v) => setTicket({ ...ticket, message: v })} textarea />
            <MagneticButton className="primary full">Abrir ticket</MagneticButton>
          </form>
        </Reveal>
      </section>
    </Page>
  );
}

function PortalHeader({ user, logout, title }) {
  return (
    <section className="portal-header">
      <div className="avatar">{user.name?.[0] || 'L'}</div>
      <div>
        <span className="eyebrow">{title}</span>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
      <button onClick={logout}><LogOut size={16} /> Sair</button>
    </section>
  );
}

function Metric({ label, value }) {
  return <Reveal className="metric"><strong>{value}</strong><span>{label}</span></Reveal>;
}

function ListPanel({ title, items, type }) {
  return <Reveal className="panel"><h2>{title}</h2><ListItems items={items} type={type} /></Reveal>;
}

function ListItems({ items, type }) {
  if (!items.length) return <div className="empty">Nada por aqui ainda.</div>;
  return (
    <div className="list">
      {items.map((item) => (
        <div className="list-row" key={item.id}>
          <div>
            <strong>{item.project || item.subject || item.service_name || item.type || 'Registro'}</strong>
            <p>{item.details || item.message || item.description || item.type}</p>
            {(item.reply || item.adminReply) && <em>{item.reply || item.adminReply}</em>}
          </div>
          <span className={`status ${item.status || 'new'}`}>{statusLabel(item.status)}</span>
        </div>
      ))}
    </div>
  );
}

function statusLabel(status) {
  return { new: 'Novo', reviewed: 'Em análise', proposed: 'Proposta', approved: 'Aprovado', open: 'Aberto', closed: 'Fechado', completed: 'Concluído', in_progress: 'Em andamento', pending: 'Pendente' }[status] || 'Novo';
}

function AdminPage({ user, go, setUser }) {
  if (!user || user.role !== 'admin') return <RequireLogin go={go} />;
  const [users] = useState(read('lrm_react_users', []).filter((u) => u.role === 'client'));
  const [quotes, setQuotes] = useState(read('lrm_react_quotes', []));
  const [tickets, setTickets] = useState(read('lrm_react_tickets', []));
  const [tab, setTab] = useState('quotes');

  const saveQuote = (id, patch) => {
    const all = read('lrm_react_quotes', []).map((q) => q.id === id ? { ...q, ...patch, updatedAt: new Date().toISOString() } : q);
    write('lrm_react_quotes', all);
    setQuotes(all);
  };
  const replyTicket = (id, reply) => {
    const all = read('lrm_react_tickets', []).map((t) => t.id === id ? { ...t, reply, status: 'closed' } : t);
    write('lrm_react_tickets', all);
    setTickets(all);
  };
  const logout = () => {
    clearCurrentUser();
    setUser(null);
    go('/');
  };

  return (
    <Page>
      <PortalHeader user={user} logout={logout} title="Painel Administrativo" />
      <section className="admin-dashboard">
        <Metric label="Clientes" value={users.length} />
        <Metric label="Orçamentos" value={quotes.length} />
        <Metric label="Tickets" value={tickets.filter((t) => t.status === 'open').length} />
        <div className="admin-tabs">
          {['quotes', 'clients', 'tickets'].map((t) => <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t === 'quotes' ? 'Orçamentos' : t === 'clients' ? 'Clientes' : 'Tickets'}</button>)}
        </div>
        {tab === 'quotes' && <AdminQuotes quotes={quotes} saveQuote={saveQuote} />}
        {tab === 'clients' && <AdminClients users={users} />}
        {tab === 'tickets' && <AdminTickets tickets={tickets} replyTicket={replyTicket} />}
      </section>
    </Page>
  );
}

function AdminQuotes({ quotes, saveQuote }) {
  return (
    <Reveal className="panel admin-panel">
      <h2>Solicitações de orçamento</h2>
      {!quotes.length && <div className="empty">Nenhuma solicitação.</div>}
      {quotes.map((q) => <AdminQuoteRow key={q.id} q={q} saveQuote={saveQuote} />)}
    </Reveal>
  );
}

function AdminQuoteRow({ q, saveQuote }) {
  const [reply, setReply] = useState(q.reply || '');
  const [price, setPrice] = useState(q.price || '');
  const [status, setStatus] = useState(q.status || 'new');
  return (
    <div className="admin-row">
      <div>
        <strong>{q.project}</strong>
        <p>{q.clientName} · {q.clientEmail} · {q.type} · {q.budget}</p>
        <small>{q.details}</small>
      </div>
      <div className="admin-form">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="new">Novo</option><option value="reviewed">Em análise</option><option value="proposed">Proposta</option><option value="approved">Aprovado</option>
        </select>
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Valor R$" />
        <textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Resposta para o cliente" />
        <button onClick={() => saveQuote(q.id, { reply, price, status })}>Salvar</button>
      </div>
    </div>
  );
}

function AdminClients({ users }) {
  return <Reveal className="panel admin-panel"><h2>Clientes</h2>{users.map((u) => <div className="admin-row compact" key={u.id}><strong>{u.name}</strong><p>{u.email} · {u.phone || 'sem telefone'}</p></div>)}</Reveal>;
}

function AdminTickets({ tickets, replyTicket }) {
  return <Reveal className="panel admin-panel"><h2>Tickets</h2>{tickets.map((t) => <AdminTicketRow key={t.id} t={t} replyTicket={replyTicket} />)}</Reveal>;
}

function AdminTicketRow({ t, replyTicket }) {
  const [reply, setReply] = useState(t.reply || '');
  return <div className="admin-row"><div><strong>{t.subject}</strong><p>{t.message}</p></div><div className="admin-form"><textarea value={reply} onChange={(e) => setReply(e.target.value)} /><button onClick={() => replyTicket(t.id, reply)}>Responder e fechar</button></div></div>;
}

function RequireLogin({ go }) {
  return <Page><section className="section center-block"><Lock size={40} /><h1>Acesso restrito</h1><p>Entre para acessar esta área.</p><MagneticButton className="primary" onClick={() => go('/login')}>Entrar</MagneticButton></section></Page>;
}

function App() {
  const [route, go] = useRoute();
  const [user, setUser] = useState(getCurrentUser());
  useEffect(initStore, []);

  const page = useMemo(() => {
    if (route === '/') return <Home go={go} />;
    if (route === '/servicos') return <ServicesPage go={go} />;
    if (route.startsWith('/servicos/')) return <ServiceDetail slug={route.split('/').pop()} go={go} />;
    if (route === '/trabalhos') return <WorksPage go={go} />;
    if (route === '/referencias') return <ReferencesPage go={go} />;
    if (route === '/parceiras') return <PartnersPage go={go} />;
    if (route === '/contato') return <ContactPage go={go} />;
    if (route === '/login') return <LoginPage go={go} setUser={setUser} />;
    if (route === '/dashboard') return <DashboardPage user={user} go={go} setUser={setUser} />;
    if (route === '/admin') return <AdminPage user={user} go={go} setUser={setUser} />;
    return <Home go={go} />;
  }, [route, user]);

  return (
    <Shell route={route} go={go} user={user} setUser={setUser}>
      <AnimatePresence mode="wait">{React.cloneElement(page, { key: route })}</AnimatePresence>
    </Shell>
  );
}

createRoot(document.getElementById('root')).render(<App />);
