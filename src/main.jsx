import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useHeroAnimation, useSectionReveal, useCardReveal, WordReveal, AnimatedMetric } from './animation.jsx';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  Code2,
  Cpu,
  DollarSign,
  ExternalLink,
  Globe2,
  Headphones,
  LayoutDashboard,
  Layers,
  Lock,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Monitor,
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
    tag: 'Branding & Interface',
    desc: 'Sistema visual completo — logotipo, interface, landing pages e copy de posicionamento. Cada elemento projetado para comunicar autoridade no mercado da marca.',
    bullets: ['Direção de arte', 'Landing pages', 'Sistemas de UI', 'Copy de posicionamento'],
    price: 'Sob análise',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&auto=format&fit=crop',
    packages: [],
    subCategories: [
      { slug: 'direcao-visual', label: 'Direção visual', packages: [
        { name: 'Logotipo + Paleta', price: 'R$ 397', period: '', tag: 'Avulso', desc: 'Logotipo, paleta de cores e tipografia para sua marca.', features: ['Logotipo vetorizado', 'Paleta de cores', 'Tipografia definida', 'Arquivos entregues'], popular: false },
        { name: 'Identidade Completa', price: 'R$ 897', period: '', tag: 'Avulso', desc: 'Identidade visual completa com manual e aplicações.', features: ['Logotipo + variações', 'Manual de marca', 'Cartão/papelaria', 'Aplicações digitais'], popular: true },
        { name: 'Brand System', price: 'R$ 1.497', period: '', tag: 'Projeto', desc: 'Sistema de marca com guidelines e assets para equipe.', features: ['Guidelines completas', 'Componentes de marca', 'Assets para dev', 'Workshop presencial'], popular: false }
      ]},
      { slug: 'landing-pages', label: 'Landing pages', packages: [
        { name: 'Landing Page Simples', price: 'R$ 597', period: '', tag: 'Avulso', desc: 'Página única responsiva com formulário de captura.', features: ['Design premium', 'Responsivo', 'Formulário integrado', 'Animação sutil'], popular: false },
        { name: 'Landing + Automação', price: 'R$ 997', period: '', tag: 'Avulso', desc: 'Landing page com integração de CRM e disparo de email.', features: ['Design exclusivo', 'CRM integrado', 'Email automático', 'Métricas'], popular: true },
        { name: 'Landing + Copy', price: 'R$ 1.497', period: '', tag: 'Projeto', desc: 'Landing page com copy de conversão e teste A/B.', features: ['Copy profissional', 'Teste A/B', 'SEO otimizado', 'Relatório'], popular: false }
      ]},
      { slug: 'ui-responsiva', label: 'UI responsiva', packages: [
        { name: 'UI Kit (Figma)', price: 'R$ 597', period: '', tag: 'Avulso', desc: 'Kit de componentes no Figma com telas responsivas.', features: ['Sistema de componentes', 'Tipografia e paleta', 'Grid responsivo', 'Arquivo Figma'], popular: false },
        { name: 'UI + Protótipo', price: 'R$ 1.197', period: '', tag: 'Avulso', desc: 'UI responsiva completa com protótipo navegável.', features: ['Componentes reutilizáveis', 'Todas as telas', 'Protótipo linkado', 'Handoff para dev'], popular: true },
        { name: 'Design System', price: 'R$ 1.997', period: '', tag: 'Projeto', desc: 'Sistema de design completo com documentação e código.', features: ['Design tokens', 'Componentes CSS/React', 'Documentação', 'Suporte implementação'], popular: false }
      ]},
      { slug: 'copy-conversao', label: 'Copy de conversão', packages: [
        { name: 'Copy Landing', price: 'R$ 197', period: '', tag: 'Avulso', desc: 'Textos persuasivos para landing page ou anúncio.', features: ['Headline + sub', 'Benefícios', 'CTA persuasivo', '2 revisões'], popular: false },
        { name: 'Copy Completo', price: 'R$ 397', period: '', tag: 'Avulso', desc: 'Copy para site completo, blog e redes sociais.', features: ['Todas as páginas', 'Blog posts (3)', 'Redes sociais (5)', 'SEO textual'], popular: true },
        { name: 'Estratégia + Redação', price: 'R$ 697', period: '', tag: 'Projeto', desc: 'Estratégia de conteúdo + redação com calendário editorial.', features: ['Estratégia definida', 'Calendário mensal', 'Redação semanal', 'Relatórios'], popular: false }
      ]}
    ]
  },
  {
    slug: 'sites-modernos',
    title: 'Sites Modernos',
    icon: Globe2,
    tag: 'Presença Corporativa',
    desc: 'Sites institucionais com arquitetura de informação, performance monitorada e experiência consistente em qualquer dispositivo — sem compromissos.',
    bullets: ['Arquitetura de informação', 'Performance monitorada', 'SEO estrutural', 'Infraestrutura gerenciada'],
    price: 'A partir do briefing',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&auto=format&fit=crop',
    packages: [],
    subCategories: [
      { slug: 'pagina-estatica', label: 'Página Estática', packages: [
        { name: 'Landing Page', price: 'R$ 397', period: '', tag: 'Avulso', desc: 'Página única de alta conversão, responsiva e otimizada.', features: ['Design focado em conversão', 'Responsiva', 'SEO base', 'Hospedagem 1 ano'], popular: false },
        { name: 'Página Única Premium', price: 'R$ 797', period: '', tag: 'Avulso', desc: 'Landing page com animações, formulário inteligente e analytics.', features: ['Animações premium', 'Formulário inteligente', 'Analytics integrado', 'Hospedagem 1 ano'], popular: true },
      ]},
      { slug: 'pagina-responsiva', label: 'Página Responsiva', packages: [
        { name: 'Site Básico', price: 'R$ 1.197', period: '', tag: 'Avulso', desc: 'Site responsivo com múltiplas seções e navegação fluida.', features: ['Multi-seções', 'Navegação fluida', 'SEO completo', 'Hospedagem 1 ano'], popular: false },
        { name: 'Site Premium', price: 'R$ 1.997', period: '', tag: 'Avulso', desc: 'Site completo com blog, galeria, formulários e painel.', features: ['Blog integrado', 'Galeria de imagens', 'Formulários', 'Painel simples'], popular: true },
      ]},
      { slug: 'portal-automatizado', label: 'Portal + Painel', packages: [
        { name: 'Portal Automatizado', price: 'R$ 2.497', period: '', tag: 'Projeto', desc: 'Site com área do cliente, notificações e dashboard.', features: ['Área do cliente', 'Notificações', 'Dashboard gerencial', 'Suporte 6 meses'], popular: false },
        { name: 'Portal Completo', price: 'R$ 3.997', period: '', tag: 'Projeto', desc: 'Portal institucional + CRM + automação de disparos.', features: ['CRM integrado', 'Automação de email', 'Múltiplos dashboards', 'Suporte 12 meses'], popular: true },
      ]}
    ]
  },
  {
    slug: 'sistemas',
    title: 'Sistemas Personalizados',
    icon: Code2,
    tag: 'Engenharia de Software',
    desc: 'Painéis executivos, cadastros inteligentes e automações desenvolvidos sob medida a partir do processo real da operação — sem adaptações de prateleira.',
    bullets: ['Dashboards executivos', 'Cadastros inteligentes', 'Processos automatizados', 'Relatórios gerenciais'],
    price: 'Projeto personalizado',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop',
    packages: [
        { name: 'Módulo Único', price: 'R$ 2.497', period: '', tag: 'Avulso', desc: 'Módulo específico para automatizar um processo.', features: ['Cadastro inteligente', 'Relatórios básicos', 'Exportação dados', 'Suporte 30 dias'], popular: false },
      { name: 'Sistema Completo', price: 'R$ 4.997', period: '', tag: 'Avulso', desc: 'Sistema com múltiplos módulos e painel administrativo.', features: ['Múltiplos módulos', 'Dashboard gerencial', 'Controle de acesso', 'Suporte 6 meses'], popular: true },
      { name: 'Plataforma', price: 'Sob análise', period: '', tag: 'Projeto', desc: 'Plataforma integrada com API e aplicativo mobile.', features: ['API REST', 'App mobile', 'Escalável', 'Treinamento equipe'], popular: false }
    ]
  },
  {
    slug: 'crm',
    title: 'CRM e Automação',
    icon: BarChart3,
    tag: 'Inteligência Comercial',
    desc: 'Captura de leads, funil visual, comissões e follow-up automatizado — previsibilidade comercial com integração direta a WhatsApp e e-mail.',
    bullets: ['Leads qualificados', 'Funil visual', 'Comissões', 'Automação de follow-up'],
    price: 'Plano consultivo',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop',
    packages: [
        { name: 'CRM Básico', price: 'R$ 1.497', period: '', tag: 'Avulso', desc: 'Gestão de leads e funil comercial simplificado.', features: ['Captura de leads', 'Funil visual', 'Etiquetas', 'Integração WhatsApp'], popular: false },
        { name: 'CRM Profissional', price: 'R$ 2.997', period: '', tag: 'Avulso', desc: 'CRM completo com automação e comissões.', features: ['Automação de follow-up', 'Comissões', 'Relatórios', 'API para integração'], popular: true },
      { name: 'CRM Enterprise', price: 'Sob análise', period: '', tag: 'Projeto', desc: 'CRM + automação + painel exclusivo.', features: ['Módulo financeiro', 'BI integrado', 'App mobile', 'Suporte prioritário'], popular: false }
    ]
  },
  {
    slug: 'manutencao',
    title: 'Manutenção de Computadores',
    icon: MonitorCog,
    tag: 'Suporte Técnico',
    desc: 'Diagnóstico, manutenção e upgrade de equipamentos corporativos. Máquinas auditadas, limpas e otimizadas — com foco em continuidade operacional.',
    bullets: ['Desktop empresarial', 'Notebook corporativo', 'Upgrade de hardware', 'Otimização de sistema'],
    price: 'Conforme diagnóstico',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=900&auto=format&fit=crop',
    packages: [
      { name: 'Limpeza', price: 'R$ 79', period: '', tag: 'Avulso', desc: 'Limpeza preventiva completa para desktop.', features: ['Limpeza interna', 'Troca pasta térmica', 'Limpeza conectores', 'Teste temperatura'], popular: false },
      { name: 'Limpeza + Formatação', price: 'R$ 119', period: '', tag: 'Avulso', desc: 'Limpeza + formatação com SO e drivers atualizados.', features: ['Limpeza completa', 'Formatação + SO', 'Drivers atualizados', 'Backup de arquivos'], popular: true },
      { name: 'Plano Mensal', price: 'R$ 49', period: '/mês', tag: 'Mensal', desc: 'Manutenção preventiva mensal com suporte remoto ilimitado.', features: ['Limpeza mensal', 'Verificação hardware', 'Suporte remoto', 'Desconto avulsos'], popular: false }
    ],
    subCategories: [
      { slug: 'desktop', label: 'Desktop', packages: [
        { name: 'Limpeza', price: 'R$ 79', period: '', tag: 'Avulso', desc: 'Limpeza preventiva completa para desktop.', features: ['Limpeza interna', 'Troca pasta térmica', 'Limpeza conectores', 'Teste temperatura'], popular: false },
        { name: 'Limpeza + Formatação', price: 'R$ 119', period: '', tag: 'Avulso', desc: 'Limpeza + formatação com SO e drivers atualizados.', features: ['Limpeza completa', 'Formatação + SO', 'Drivers atualizados', 'Backup de arquivos'], popular: true },
        { name: 'Plano Mensal', price: 'R$ 49', period: '/mês', tag: 'Mensal', desc: 'Manutenção preventiva mensal com suporte remoto ilimitado.', features: ['Limpeza mensal', 'Verificação hardware', 'Suporte remoto', 'Desconto avulsos'], popular: false }
      ]},
      { slug: 'notebook', label: 'Notebook', packages: [
        { name: 'Limpeza', price: 'R$ 119', period: '', tag: 'Avulso', desc: 'Limpeza preventiva completa para notebook.', features: ['Desmontagem parcial', 'Limpeza interna', 'Troca pasta térmica', 'Teste temperatura'], popular: false },
        { name: 'Limpeza + Formatação', price: 'R$ 169', period: '', tag: 'Avulso', desc: 'Limpeza + formatação com SO e drivers.', features: ['Limpeza completa', 'Formatação + SO', 'Drivers atualizados', 'Backup de arquivos'], popular: true },
        { name: 'Plano Mensal', price: 'R$ 69', period: '/mês', tag: 'Mensal', desc: 'Manutenção mensal com suporte prioritário.', features: ['Limpeza mensal', 'Verificação hardware', 'Suporte remoto', 'Desconto avulsos'], popular: false }
      ]},
      { slug: 'upgrade', label: 'Upgrade', packages: [
        { name: 'Memória RAM', price: 'R$ 79', period: '+ peça', tag: 'Mão de obra', desc: 'Instalação de memória RAM com teste de compatibilidade.', features: ['Instalação RAM', 'Teste compatibilidade', 'Teste estabilidade', 'Otimização BIOS'], popular: false },
        { name: 'SSD + Clonagem', price: 'R$ 99', period: '+ peça', tag: 'Mão de obra', desc: 'Instalação de SSD com clonagem de disco.', features: ['Clonagem disco', 'Instalação SSD', 'Ativação TRIM', 'Teste velocidade'], popular: true },
        { name: 'Geral (CPU/GPU)', price: 'Sob análise', period: '', tag: 'Projeto', desc: 'Upgrade completo de hardware sob consulta.', features: ['Análise compatibilidade', 'Instalação completa', 'Teste desempenho', 'Otimização sistema'], popular: false }
      ]},
      { slug: 'otimizacao', label: 'Otimização', packages: [
        { name: 'Otimização de SO', price: 'R$ 59', period: '', tag: 'Avulso', desc: 'Limpeza de disco, inicialização e serviços.', features: ['Limpeza disco', 'Desfragmentação', 'Startup otimizada', 'Remoção malware'], popular: false },
        { name: 'Pacote Completo', price: 'R$ 99', period: '', tag: 'Avulso', desc: 'Otimização completa + diagnóstico de hardware.', features: ['Otimização SO', 'Diagnóstico HW', 'Configuração SSD', 'Atualização drivers'], popular: true },
        { name: 'Plano Trimestral', price: 'R$ 39', period: '/mês', tag: 'Trimestral', desc: 'Otimização trimestral com suporte remoto.', features: ['Otimização trimestral', 'Monitoramento', 'Suporte remoto', 'Desconto avulsos'], popular: false }
      ]}
    ]
  },
  {
    slug: 'consultoria',
    title: 'Consultoria de TI',
    icon: Cpu,
    tag: 'Estratégia Tecnológica',
    desc: 'Mapeamento de processos, escolha de ferramentas, infraestrutura e segurança da informação — com diagnóstico e plano de ação, sem achismo.',
    bullets: ['Diagnóstico estratégico', 'Projetos de TI', 'Infraestrutura', 'Segurança da informação'],
    price: 'Por escopo',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop',
    packages: [],
    subCategories: [
      { slug: 'diagnostico', label: 'Diagnóstico', packages: [
        { name: 'Consultoria Básica', price: 'R$ 997', period: '', tag: 'Avulso', desc: 'Diagnóstico rápido e recomendações estratégicas.', features: ['Diagnóstico inicial', 'Relatório de recomendações', 'Mapeamento de processos', 'Sugestão de ferramentas', '1 reunião de alinhamento'], popular: false },
        { name: 'Diagnóstico Avançado', price: 'R$ 1.497', period: '', tag: 'Avulso', desc: 'Análise aprofundada com plano de ação detalhado.', features: ['Auditoria completa', 'Mapeamento de riscos', 'Plano de ação', 'Apresentação executiva'], popular: true },
        { name: 'Diagnóstico + Roadmap', price: 'R$ 2.497', period: '', tag: 'Avulso', desc: 'Diagnóstico completo com roadmap técnico de 12 meses.', features: ['Diagnóstico total', 'Roadmap mensal', 'Orçamento projetado', 'Suporte 30 dias'], popular: false }
      ]},
      { slug: 'projetos', label: 'Projetos', packages: [
        { name: 'Projeto Simples', price: 'R$ 1.497', period: '', tag: 'Avulso', desc: 'Projeto de TI com escopo definido e cronograma.', features: ['Escopo detalhado', 'Cronograma', 'Orçamento', 'Apresentação'], popular: false },
        { name: 'Projeto Completo', price: 'R$ 2.497', period: '', tag: 'Avulso', desc: 'Implantação completa com ferramentas e treinamento.', features: ['Implantação ferramentas', 'Treinamento equipe', 'Documentação', 'Suporte 2 meses'], popular: true },
        { name: 'Transformação Digital', price: 'R$ 3.997', period: '', tag: 'Projeto', desc: 'Projeto de transformação digital com automação e cultura data-driven.', features: ['Automação processos', 'Data-driven', 'Integrações', 'Gestão de mudança'], popular: false }
      ]},
      { slug: 'infraestrutura', label: 'Infraestrutura', packages: [
        { name: 'Consultoria Infra', price: 'R$ 2.997', period: '', tag: 'Avulso', desc: 'Planejamento completo de infraestrutura de TI.', features: ['Diagnóstico infra', 'Cloud', 'Segurança', 'Governança'], popular: false },
        { name: 'Migração Cloud', price: 'Sob análise', period: '', tag: 'Projeto', desc: 'Migração de servidores on-premise para cloud.', features: ['Análise ambiente', 'Plano migração', 'Execução', 'Suporte pós-migração'], popular: true },
        { name: 'Infra Gerenciada', price: 'R$ 1.497', period: '/mês', tag: 'Mensal', desc: 'Gerenciamento contínuo de infraestrutura de TI.', features: ['Monitoramento 24/7', 'Backups', 'Suporte N1/N2', 'Relatórios mensais'], popular: false }
      ]},
      { slug: 'seguranca', label: 'Segurança', packages: [
        { name: 'Auditoria Segurança', price: 'R$ 1.497', period: '', tag: 'Avulso', desc: 'Auditoria de segurança da informação e adequação LGPD.', features: ['Análise vulnerabilidades', 'LGPD', 'Políticas', 'Relatório'], popular: false },
        { name: 'Adequação LGPD', price: 'R$ 1.997', period: '', tag: 'Projeto', desc: 'Projeto completo de adequação à LGPD.', features: ['Mapeamento dados', 'Políticas privacidade', 'Processos LGPD', 'Treinamento equipe'], popular: true },
        { name: 'Segurança Contínua', price: 'R$ 997', period: '/mês', tag: 'Mensal', desc: 'Monitoramento e gestão contínua de segurança.', features: ['Monitoramento', 'Patch management', 'Resposta incidentes', 'Relatórios'], popular: false }
      ]}
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
  { name: 'Leadio', sub: 'Sistema próprio', tier: 'system', desc: 'Plataforma de gestão de leads e funil de vendas desenvolvida internamente pela LRM TECNO.', image: ASSETS.leadio, site: 'https://leadio.base44.app/' },
  { name: 'Primeira Chave', sub: 'Parceira estratégica', tier: 'gold', desc: 'Consultoria em regularização de imóveis e financiamento habitacional. Parceria em sistemas de gestão documental.', image: ASSETS.primeiraChave, site: '#' },
  { name: 'LRM Labs', sub: 'Produto e automação', tier: 'system', desc: 'Laboratório interno de produtos, automações e ferramentas de suporte à operação digital.', image: ASSETS.partnerIcon, site: '#' }
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

function getReviews() {
  try {
    return JSON.parse(localStorage.getItem('lrm_reviews') || '[]').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch { return []; }
}

function submitReview(userId, userName, serviceId, rating, text) {
  if (!userId || !rating || rating < 1 || rating > 5 || !text || text.trim().length < 10) return false;
  try {
    const reviews = JSON.parse(localStorage.getItem('lrm_reviews') || '[]');
    if (reviews.some(r => r.userId === userId && r.serviceId === serviceId)) return false;
    reviews.push({ userId, clientName: userName.split(' ')[0], serviceId, rating: Math.round(rating), text: text.trim(), createdAt: new Date().toISOString() });
    localStorage.setItem('lrm_reviews', JSON.stringify(reviews));
    return true;
  } catch { return false; }
}

function hasReviewedService(userId, serviceId) {
  try {
    return JSON.parse(localStorage.getItem('lrm_reviews') || '[]').some(r => r.userId === userId && r.serviceId === serviceId);
  } catch { return false; }
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
  initial: { opacity: 0, y: 24, filter: 'blur(12px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, filter: 'blur(8px)', transition: { duration: 0.3 } }
};

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } })
};

function RefsSection({ children, className = '' }) {
  const ref = useRef(null);
  useSectionReveal(ref);
  return <div ref={ref} className={`section-reveal ${className}`}>{children}</div>;
}

function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay]);
  const Component = as === 'section' ? 'section' : as === 'article' ? 'article' : as === 'div' ? 'div' : motion[as] || motion.div;
  if (typeof Component === 'string') {
    return <Component ref={ref} className={className}>{children}</Component>;
  }
  return <Component ref={ref} className={className}>{children}</Component>;
}

function MagneticButton({ children, className = '', onClick, href, target }) {
  const Comp = href ? motion.a : motion.button;
  return (
    <Comp
      href={href}
      target={target}
      onClick={onClick}
      className={`btn ${className}`}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </Comp>
  );
}

function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);
  return (
    <motion.div
      style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 9999, left: -4, top: -4, width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 16px color-mix(in srgb var(--accent) 40%,transparent)'
      }}
    />
  );
}

function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9998, background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,8vw,5rem)', fontWeight: 500, color: 'var(--accent)', letterSpacing: '-0.02em' }}
      >
        LRM
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 120 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: 1, background: 'var(--accent)', opacity: 0.4 }}
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 400 }}
      >
        Tecnologia premium
      </motion.span>
    </motion.div>
  );
}

function Shell({ children, route, go, user, setUser }) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('lrm_react_theme');
    if (stored) return stored === 'dark';
    return true;
  });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 24 });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    document.getElementById('theme-color')?.setAttribute('content', dark ? '#0b0e1a' : '#f2efe8');
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
      <CursorFollower />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <header className="nav">
        <button className="brand" onClick={() => go('/')}>
          <span className="brand-mark">LRM</span>
          <span>TECNO</span>
        </button>
        <nav className="nav-links">{nav.map(navLink)}</nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Alternar tema">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
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
            <Menu size={18} />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="drawer-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.aside className="drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 250, damping: 28 }}>
              <div className="drawer-head">
                <strong>LRM TECNO</strong>
                <button className="icon-btn" onClick={() => setOpen(false)}><X size={18} /></button>
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
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 100]);
  const scale = useTransform(scrollY, [0, 700], [1, 1.12]);
  useHeroAnimation(heroRef);
  return (
    <section ref={heroRef} className="home-hero hero-gsap">
      <div className="hero-shield" data-hero="shield" />
      <motion.div className="hero-video-wrap" style={{ y, scale }} data-hero="video">
        <video src={ASSETS.logoVideo} poster={ASSETS.logo} autoPlay muted loop playsInline preload="metadata" />
      </motion.div>
      <div className="orb orb-a" data-hero="orb" />
      <div className="orb orb-b" data-hero="orb" />
      <div className="hero-content">
        <div className="eyebrow" data-hero="eyebrow">
          Tecnologia premium para empresas
        </div>
        <h1 data-hero="title">
          LRM TECNO
        </h1>
        <p data-hero="desc">
          Projetamos, construímos e sustentamos a camada digital que coloca sua operação em outro patamar — sites, sistemas, CRM, automações e suporte técnico com padrão enterprise.
        </p>
        <div className="hero-actions" data-hero="actions">
          <MagneticButton className="primary" onClick={() => go('/login')}>Solicitar orçamento <ArrowRight size={18} /></MagneticButton>
          <MagneticButton className="outline" onClick={() => go('/servicos')}>Nossas soluções</MagneticButton>
          <MagneticButton className="whatsapp" href="https://wa.me/5512987076691" target="_blank"><MessageCircle size={18} /> WhatsApp</MagneticButton>
        </div>
      </div>
      <div className="hero-dashboard" data-hero="dashboard">
        <div className="dash-top"><span /><span /><span /><strong>portal.lrmtecno</strong></div>
        <div className="hero-metrics">
          <div><strong>24h</strong><span>triagem</span></div>
          <div><strong>CRM</strong><span>funil comercial</span></div>
          <div><strong>Premium</strong><span>entrega</span></div>
        </div>
      </div>
    </section>
  );
}

function ServiceCarousel({ go }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);
  const len = services.length;
  const prev = () => { setDir(-1); setIdx((idx + len - 1) % len); };
  const next = () => { setDir(1); setIdx((idx + 1) % len); };
  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [idx]);
  return (
    <div className="carousel-wrap">
      <button className="carousel-arrow prev" onClick={prev} aria-label="Anterior">&larr;</button>
      <div className="carousel-track">
        <AnimatePresence mode="wait" custom={dir}>
          {(() => {
            const s = services[idx];
            const Icon = s.icon;
            return (
              <motion.article
                key={s.slug}
                custom={dir}
                variants={{
                  enter: (d) => ({ opacity: 0, x: d > 0 ? 100 : -100, filter: 'blur(6px)' }),
                  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
                  exit: (d) => ({ opacity: 0, x: d > 0 ? -100 : 100, filter: 'blur(6px)' })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="carousel-card"
              >
                <div className="carousel-card-top">
                  <div className="service-icon"><Icon size={20} /></div>
                  <span>{s.tag}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="carousel-bullets">
                  {s.bullets.map((b) => <span key={b}>{b}</span>)}
                </div>
                <button className="carousel-cta" onClick={() => go(`/servicos/${s.slug}`)}>
                  Ver pacotes e preços <ChevronRight size={15} />
                </button>
              </motion.article>
            );
          })()}
        </AnimatePresence>
      </div>
      <button className="carousel-arrow next" onClick={next} aria-label="Próximo">&rarr;</button>
      <div className="carousel-dots">
        {services.map((_, i) => (
          <button key={i} className={`carousel-dot${i === idx ? ' active' : ''}`} onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }} aria-label={`Serviço ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

function Home({ go }) {
  return (
    <Page>
      <HeroScene go={go} />
      <section className="trust-strip">
        {['Atendimento online', 'Portal do cliente', 'Orçamento estruturado', 'Suporte pós-entrega'].map((item) => (
          <span key={item}><BadgeCheck size={15} /> {item}</span>
        ))}
      </section>
      <section className="section carousel-section">
        <div className="section-head">
          <Reveal><span className="eyebrow">Especialidades</span></Reveal>
          <WordReveal text="Engenharia digital para operações que exigem excelência" as="h2" />
          <Reveal><p>Cada serviço é desenhado a partir do processo real do cliente — sem pacotes genéricos, sem entrega padronizada.</p></Reveal>
        </div>
        <ServiceCarousel go={go} />
      </section>
      
      <PortalPreview go={go} />
      <ProcessSection />
      <section className="section refs-home">
        <div className="section-head">
          <Reveal><span className="eyebrow">Referências</span></Reveal>
          <WordReveal text="Quem já construiu conosco" as="h2" />
          <Reveal><p>Depoimentos de clientes que confiaram na LRM TECNO para projetos de sistema, site, CRM, manutenção e consultoria.</p></Reveal>
        </div>
        <div className="refs-grid card-grid-reveal">
          {testimonials.slice(0, 3).map((r, i) => (
            <Reveal key={`${r.name}-${i}`} delay={i * 0.08} className="ref-card-react">
              <div className="ref-card-bar" />
              <div className="stars">{Array.from({ length: r.rating }).map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}</div>
              <p>"{r.text}"</p>
              <div className="ref-author">
                <div className="ref-avatar">{r.name.charAt(0)}</div>
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.role} &mdash; {r.company}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="center-block" style={{ marginTop: '2rem' }}>
          <MagneticButton className="outline" onClick={() => go('/referencias')}>Ver todos os depoimentos <ArrowRight size={16} /></MagneticButton>
        </div>
      </section>
      <CTA go={go} title="Solicite um orçamento com contexto." text="Crie sua conta, descreva o projeto e acompanhe a análise no portal do cliente." />
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
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="page-hero-inner">
        <Reveal><span className="eyebrow">{label}</span></Reveal>
        <WordReveal text={title} as="h1" />
        <Reveal><p>{text}</p></Reveal>
        {children}
      </div>
    </section>
  );
}

function ServiceCard({ service, delay = 0, go }) {
  const Icon = service.icon;
  return (
    <Reveal delay={delay} className="service-card" as="article">
      <div className="service-card-top">
        <div className="service-icon"><Icon size={18} /></div>
        <span>{service.tag}</span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.desc}</p>
      <button onClick={() => go(`/servicos/${service.slug}`)}>Ver pacotes e preços <ChevronRight size={15} /></button>
    </Reveal>
  );
}

function ServicesPage({ go }) {
  const gridRef = useRef(null);
  useCardReveal(gridRef);
  return (
    <Page>
      <PageHero label="Serviços" title="Soluções com padrão enterprise para empresas que não aceitam médio" text="Seis frentes de tecnologia — da identidade visual à consultoria de TI. Cada uma com escopo, prazo e investimento transparentes." />
      <section className="section">
        <div ref={gridRef} className="service-grid all">
          {services.map((s, i) => <ServiceCard key={s.slug} service={s} delay={i * 0.07} go={go} />)}
        </div>
      </section>
      <CTA go={go} title="Quer orçamento sem reunião?" text="Entre no portal, envie o briefing e acompanhe a resposta." />
    </Page>
  );
}

function ServiceDetail({ slug, go }) {
  const service = services.find((s) => s.slug === slug) || services[0];
  const Icon = service.icon;
  const hasSub = service.subCategories && service.subCategories.length > 0;
  const [activeSub, setActiveSub] = useState(hasSub ? service.subCategories[0].slug : null);
  const activeData = hasSub ? service.subCategories.find(s => s.slug === activeSub) : null;
  const activePkgs = hasSub && activeData ? activeData.packages : service.packages;
  const priceGridRef = useRef(null);
  const detailBgRef = useRef(null);
  const { scrollY: detailScrollY } = useScroll();
  const bgY = useTransform(detailScrollY, [0, 600], [0, 120]);
  useCardReveal(priceGridRef);
  return (
    <Page>
      <section className="detail-hero">
        <motion.div ref={detailBgRef} className="detail-hero-bg" style={{ backgroundImage: `url(${service.image})`, y: bgY }} />
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          <Reveal>
            <button className="detail-back" onClick={() => go('/servicos')}>&larr; Voltar</button>
            <span className="eyebrow">{service.tag}</span>
            <h1>{service.title}</h1>
            <p>{service.desc}</p>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <Reveal className="detail-panel-compact">
          <div className="service-icon large"><Icon size={28} /></div>
          {hasSub ? (
            <div className="sub-tabs">
              {service.subCategories.map((sub) => (
                <button key={sub.slug} className={`sub-tab${activeSub === sub.slug ? ' active' : ''}`} onClick={() => setActiveSub(sub.slug)}>{sub.label}</button>
              ))}
            </div>
          ) : (
            <div className="chips">{service.bullets.map((b) => <span key={b}>{b}</span>)}</div>
          )}
        </Reveal>
      </section>
      <section className="section section-pricing">
        <Reveal className="section-head" style={{ marginBottom: '1rem' }}>
          <h2>Investimento{hasSub && activeData ? ` — ${activeData.label}` : ''}</h2>
          <p>Valores de referência. Cada orçamento é ajustado ao escopo real do projeto.</p>
        </Reveal>
        <div ref={priceGridRef} className="pricing-grid packages-grid card-grid-reveal">
          {activePkgs.map((pkg, i) => (
            <div key={pkg.name} className={pkg.popular ? 'price-card featured' : 'price-card'}>
              {pkg.popular && <div className="popular-badge">Recomendado</div>}
              <span className="pkg-tier">{pkg.tag}</span>
              <h3>{pkg.name}</h3>
              <div className="pkg-price">
                <strong>{pkg.price}</strong>
                {pkg.period && <small>{pkg.period}</small>}
              </div>
              <p>{pkg.desc}</p>
              <ul className="pkg-features">
                {pkg.features.map((f) => <li key={f}><Check size={13} /> {f}</li>)}
              </ul>
              <a href={`https://wa.me/5512987076691?text=${encodeURIComponent('Olá, vim pelo site LRM TECNO e gostaria de solicitar ' + service.title + ' - ' + (hasSub ? activeData.label + ' - ' : '') + pkg.name + '.')}`} target="_blank" className="btn-whatsapp-pkg">
                <MessageCircle size={15} /> Solicitar via WhatsApp
              </a>
            </div>
          ))}
        </div>
        <div className="center-block" style={{ marginTop: '2.5rem' }}>
          <Reveal>
            <div className="hero-actions center">
              <MagneticButton className="primary" onClick={() => go('/login')}>Solicitar no portal <ArrowRight size={18} /></MagneticButton>
              <MagneticButton className="whatsapp" href={`https://wa.me/5512987076691?text=${encodeURIComponent('Olá, vim pelo site LRM TECNO e gostaria de saber mais sobre ' + service.title + '.' + (hasSub && activeData ? ' (interesse: ' + activeData.label + ')' : '') + '')}`} target="_blank">Falar no WhatsApp</MagneticButton>
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
      <PageHero label="Trabalhos" title="Projetos que combinam produto, operação e presença" text="A vitrine da LRM reúne sistemas próprios e soluções criadas para clientes." />
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

const testimonials = [
  { name: 'Gilberto Alencar', role: 'Diretor', company: 'Rede Nova, Logística', text: 'Contratamos o sistema de frota e tickets. A LRM não só entregou o que pedimos como sugeriu melhorias que reduziram nosso tempo de apuração em horas — virou peça central da operação.', rating: 5 },
  { name: 'Carla Dutra', role: 'Head de Marketing', company: 'Studio Dutra, Design', text: 'Precisávamos de um site que convertesse e um CRM que não virasse peso morto. A consultoria de escolha de ferramentas e a automação que implementaram mudaram nosso follow-up de vez.', rating: 5 },
  { name: 'Marcos Tavares', role: 'CTO', company: 'Attus, Fintech', text: 'Terceirizamos a manutenção dos equipamentos e a gestão de infra com eles. Desde então, nosso downtime caiu a quase zero. Responsabilidade técnica de verdade.', rating: 5 },
  { name: 'Rafaela Campos', role: 'Sócia', company: 'Campos & Menezes, Advocacia', text: 'O portal com automação de prazos e comunicados internos organizou uma casa que antes funcionava no improviso. Entrega no prazo, com tudo funcionando como combinado.', rating: 5 },
  { name: 'Thiago Moreira', role: 'Gerente de Operações', company: 'MouraTech, Suporte', text: 'Sistema sob medida para controle de OS e comissão dos técnicos. A diferença entre o que tínhamos (planilhas) e o que eles entregaram é brutal. Interface limpa, relatórios que realmente usamos.', rating: 5 }
];

function ReferencesPage({ go }) {
  const reviews = getReviews();
  const data = reviews.length ? reviews.map(r => ({ name: r.clientName, role: '', company: '', text: r.text, rating: r.rating })) : testimonials;
  return (
    <Page>
      <PageHero label="Referências" title="Confiança construída em cada entrega" text="Depoimentos e avaliações registrados no portal ao final de cada serviço." />
      <section className="section">
        <div className="refs-grid">
          {data.map((r, i) => (
            <Reveal key={`${r.name}-${i}`} delay={i * 0.08} className="ref-card-react">
              <div className="ref-card-bar" />
              <div className="stars">{Array.from({ length: r.rating || 5 }).map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}</div>
              <p>"{r.text}"</p>
              <div className="ref-author">
                <div className="ref-avatar">{r.name.charAt(0)}</div>
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.role} &mdash; {r.company}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="center-block" style={{ marginTop: '2rem' }}>
          <MagneticButton className="primary" onClick={() => go('/login')}>Acessar portal</MagneticButton>
        </div>
      </section>
    </Page>
  );
}

function PartnersPage({ go }) {
  return (
    <Page>
      <PageHero label="Parceiras" title="Rede de parceiros" text="Empresas e profissionais que integram nosso ecossistema de tecnologia e inovação." />
      <section className="section">
        <div style={{ marginBottom: '3rem', maxWidth: 600 }}>
          <span className="eyebrow">Rede</span>
          <h2>Parceiros ativos</h2>
          <p style={{ fontSize: '0.9375rem' }}>Cada parceiro abaixo mantém relação direta com a LRM — como cliente integrado, co-criação ou fornecedor estratégico.</p>
        </div>
        <div className="partners-grid">
          {partners.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="partner-card-react">
              <div className={'partner-tier ' + (p.tier === 'gold' ? 'gold' : '')}>{p.sub}</div>
              <div className="partner-card-react-inner">
                <div className="partner-logo-wrap">
                  <img src={p.image} alt={p.name} />
                </div>
                <div>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  {p.site && p.site !== '#' && (
                    <a href={p.site} target="_blank" rel="noopener noreferrer" className="partner-site">
                      <span>{p.site.replace(/https?:\/\//, '').replace(/\/$/, '')}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
              <div className="partner-card-bg" />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ marginBottom: '3rem', maxWidth: 600 }}>
          <span className="eyebrow">Vantagens</span>
          <h2>Por que ser parceiro</h2>
          <p>Modelos de parceria desenhados para gerar resultado real para ambos os lados.</p>
        </div>
        <div className="benefits-grid">
          {[
            { icon: <Layers size={22} />, title: 'Indicação com comissão', desc: 'Indicou, fechou. Comissão transparente sobre projetos fechados via parceria.' },
            { icon: <Monitor size={22} />, title: 'Co-branding em projetos', desc: 'Seu nome aparece nas entregas. Crédito público nos sites e sistemas desenvolvidos em parceria.' },
            { icon: <Zap size={22} />, title: 'Prefixo técnico prioritário', desc: 'Acesso a orçamentos internos, prazos reduzidos e suporte técnico prioritário.' },
            { icon: <DollarSign size={22} />, title: 'Modelo ganha-ganha', desc: 'Estrutura de repasse clara. Cada parte sabe exatamente quanto ganha em cada projeto.' }
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06} className="benefit-card-react">
              <div className="benefit-icon-react">{b.icon}</div>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA go={go} title="Vamos construir juntos?" text="Se sua empresa atua com tecnologia, consultoria ou infraestrutura, podemos ter uma conversa rápida e objetiva." />
    </Page>
  );
}

function ContactPage({ go }) {
  return (
    <Page>
      <PageHero label="Contato" title="Fale com a LRM TECNO" text="Para orçamento estruturado, utilize o portal. Para conversa direta, WhatsApp, email e Instagram estão disponíveis." />
      <section className="section contact-layout">
        <Reveal className="contact-card">
          <h2>Canais diretos</h2>
          <ContactRow icon={Phone} label="WhatsApp" value="(12) 98707-6691" href="https://wa.me/5512987076691" />
          <ContactRow icon={Mail} label="Email" value="lucas-mondadori@hotmail.com" href="mailto:lucas-mondadori@hotmail.com" />
          <ContactRow icon={Globe2} label="Atendimento" value="Online em todo Brasil" />
          <MagneticButton className="primary full" onClick={() => go('/login')}>Solicitar orçamento no portal</MagneticButton>
        </Reveal>
        <Reveal delay={0.1} className="contact-visual">
          <LayoutDashboard size={48} />
          <h3>Portal do cliente</h3>
          <p>Crie a conta, envie o briefing, acompanhe a resposta, abra tickets e avalie serviços concluídos.</p>
        </Reveal>
      </section>
    </Page>
  );
}

function ContactRow({ icon: Icon, label, value, href }) {
  const body = <><Icon size={18} /><div><span>{label}</span><strong>{value}</strong></div></>;
  return href ? <a className="contact-row" href={href} target={href.startsWith('http') ? '_blank' : undefined}>{body}</a> : <div className="contact-row">{body}</div>;
}

function StorytellingSection() {
  const steps = [
    { icon: Cpu, title: 'Automação', desc: 'Processos que rodam sem supervisão. Redução de retrabalho, eliminação de gargalos manuais e previsibilidade operacional.' },
    { icon: BarChart3, title: 'CRM', desc: 'Funil visual, follow-up automatizado e gestão de leads com integração direta a WhatsApp e e-mail.' },
    { icon: Zap, title: 'IA', desc: 'Modelos treinados para classificar leads, sugerir respostas e detectar anomalias em dados operacionais.' },
    { icon: Globe2, title: 'Integrações', desc: 'API, webhooks e conectores nativos para ERP, plataformas de pagamento e ferramentas de CRM.' }
  ];
  return (
    <section className="section storytelling-simple">
      <div className="section-head">
        <Reveal><span className="eyebrow">Tecnologia que escala</span></Reveal>
        <WordReveal text="Quatro pilares da operação digital" as="h2" />
        <Reveal><p>Da automação de processos à integração de sistemas — cada camada da sua operação coberta por tecnologia proprietária.</p></Reveal>
      </div>
      <div className="storytelling-grid">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.title} delay={i * 0.1} className="storytelling-card">
              <div className="storytelling-icon">
                <Icon size={28} strokeWidth={1.5} />
                <span>0{i + 1}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function PortalPreview({ go }) {
  return (
    <section className="portal-section">
      <Reveal className="portal-copy">
        <span className="eyebrow">Área do Cliente</span>
        <h2>Orçamento, tickets e serviços em um painel</h2>
        <p>O site deixa de ser vitrine. O cliente entra, descreve o projeto, acompanha o status e recebe a resposta do admin.</p>
        <MagneticButton className="primary" onClick={() => go('/login')}>Abrir portal <ArrowRight size={18} /></MagneticButton>
      </Reveal>
      <Reveal delay={0.12} className="portal-glass">
        {['Orçamento solicitado', 'Proposta técnica', 'Ticket aberto', 'Serviço para avaliar'].map((item, i) => (
          <motion.div key={item} className={i === 0 ? 'portal-line active' : 'portal-line'} whileHover={{ x: 6 }}>
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
      {[
        { step: 'Briefing', desc: 'Entendemos a necessidade, o contexto e o objetivo do projeto.' },
        { step: 'Proposta', desc: 'Registramos escopo, cronograma e investimento.' },
        { step: 'Execução', desc: 'Construímos com acompanhamento contínuo do cliente.' },
        { step: 'Entrega', desc: 'Finalizamos, transferimos e abrimos canal de suporte.' }
      ].map((item, i) => (
        <Reveal key={item.step} delay={i * 0.08} className="process-step">
          <span>0{i + 1}</span>
          <h3>{item.step}</h3>
          <p>{item.desc}</p>
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
          <p>Solicite orçamento, acompanhe a proposta, abra tickets e consulte seus serviços.</p>
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
  const [servicesList, setServicesList] = useState(read(`lrm_react_services_${user.id}`, []));
  const [reviewing, setReviewing] = useState(null);
  const [reviewStar, setReviewStar] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewHover, setReviewHover] = useState(0);
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
        <div className="dash-tech-overlay" />
        <AnimatedMetric label="Orçamentos" value={quotes.length} />
        <AnimatedMetric label="Serviços" value={servicesList.length} />
        <AnimatedMetric label="Tickets" value={tickets.length} />
        <AnimatedMetric label="Em aberto" value={quotes.filter((q) => q.status !== 'approved').length + tickets.filter((t) => t.status === 'open').length} />
        <div className="panel quote-panel">
          <h2>Solicitar orçamento</h2>
          <form onSubmit={submitQuote} className="grid-form">
            <Input label="Tipo" value={quote.type} onChange={(v) => setQuote({ ...quote, type: v })} options={services.map((s) => s.title)} />
            <Input label="Investimento" value={quote.budget} onChange={(v) => setQuote({ ...quote, budget: v })} options={['A definir', 'Até R$ 500', 'R$ 500 a R$ 1.500', 'R$ 1.500 a R$ 4.000', 'Acima de R$ 4.000']} />
            <Input label="Projeto" value={quote.project} onChange={(v) => setQuote({ ...quote, project: v })} />
            <Input label="Prazo" value={quote.timeline} onChange={(v) => setQuote({ ...quote, timeline: v })} options={['Até 7 dias', 'Até 15 dias', 'Até 30 dias', 'Sem urgência']} />
            <Input label="Detalhes" value={quote.details} onChange={(v) => setQuote({ ...quote, details: v })} textarea />
            <MagneticButton className="primary full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              Enviar solicitação
            </MagneticButton>
          </form>
        </div>
        <div className="panel">
          <h2>Meus orçamentos</h2>
          <div className="list">
            {!quotes.length && <div className="empty">Nenhum orçamento solicitado ainda</div>}
            {quotes.map((q) => (
              <div className="list-row" key={q.id}>
                <div>
                  <strong>{q.project || q.type || 'Orçamento'}</strong>
                  <p>{q.type} · {q.budget} · {q.createdAt ? new Date(q.createdAt).toLocaleDateString('pt-BR') : ''}</p>
                  {q.details && <p style={{ fontSize: '0.8125rem', color: 'var(--ink)', margin: '0.15rem 0' }}>{q.details}</p>}
                  {(q.price) && <em>Valor proposto: R$ {Number(q.price).toLocaleString('pt-BR',{minimumFractionDigits:2})}</em>}
                  {q.reply && <em>Resposta da LRM: {q.reply}</em>}
                </div>
                <span className={`status ${q.status || 'new'}`}>{statusLabel(q.status)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <h2>Serviços</h2>
          <div className="list">
            {!servicesList.length && <div className="empty">Nenhum serviço prestado ainda</div>}
            {servicesList.map((s) => {
              const reviewed = hasReviewedService(user.id, s.id);
              return (
                <div className="list-row" key={s.id}>
                  <div>
                    <strong>{s.service_name}</strong>
                    <p>{s.description || ''}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    {s.status === 'completed' && !reviewed && (
                      <button className="btn-mini" onClick={() => setReviewing(s)}>Avaliar</button>
                    )}
                    {s.status === 'completed' && reviewed && <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Avaliado</span>}
                    <span className={`status ${s.status || 'new'}`}>{statusLabel(s.status)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="panel">
          <h2>Tickets</h2>
          <div className="list">
            {!tickets.length && <div className="empty">Nenhum ticket aberto</div>}
            {tickets.map((t) => (
              <div className="list-row" key={t.id}>
                <div>
                  <strong>{t.subject}</strong>
                  <p>{new Date(t.createdAt).toLocaleDateString('pt-BR')} · <span className={`status ${t.status || 'new'}`}>{statusLabel(t.status)}</span></p>
                  {t.message && <p style={{ fontSize: '0.8125rem', color: 'var(--ink)', margin: '0.15rem 0' }}>{t.message}</p>}
                  {t.reply && <em>{t.reply}</em>}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={submitTicket} style={{ borderTop: '1px solid var(--line)', marginTop: '1rem', paddingTop: '1rem' }}>
            <Input label="Assunto" value={ticket.subject} onChange={(v) => setTicket({ ...ticket, subject: v })} />
            <Input label="Mensagem" value={ticket.message} onChange={(v) => setTicket({ ...ticket, message: v })} textarea />
            <MagneticButton className="primary full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
              Abrir ticket
            </MagneticButton>
          </form>
        </div>
      </section>
      <AnimatePresence>
        {reviewing && (
          <motion.div className="review-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="review-modal" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <h3>Avaliar Serviço</h3>
              <p className="review-service-name">{reviewing.service_name}</p>
              <div className="review-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`review-star${(reviewHover || reviewStar) >= star ? ' active' : ''}`}
                    onClick={() => setReviewStar(star)}
                    onMouseEnter={() => setReviewHover(star)}
                    onMouseLeave={() => setReviewHover(0)}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                className="review-textarea"
                placeholder="Conte sua experiência com o serviço..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
              />
              <div className="review-actions">
                <button className="btn-cancel-review" onClick={() => { setReviewing(null); setReviewStar(0); setReviewText(''); }}>Cancelar</button>
                <button className="btn-submit-review" onClick={() => {
                  if (reviewStar < 1) return;
                  if (reviewText.trim().length < 10) return;
                  const ok = submitReview(user.id, user.name, reviewing.id, reviewStar, reviewText);
                  if (ok) {
                    const updated = servicesList.map(s => s.id === reviewing.id ? { ...s, _reviewed: true } : s);
                    setServicesList(updated);
                    setReviewing(null);
                    setReviewStar(0);
                    setReviewText('');
                  }
                }}>Enviar Avaliação</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
      <button onClick={logout}><LogOut size={15} /> Sair</button>
    </section>
  );
}

function Metric({ label, value }) {
  return <Reveal className="metric"><strong>{value}</strong><span>{label}</span></Reveal>;
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
        <AnimatedMetric label="Clientes" value={users.length} />
        <AnimatedMetric label="Orçamentos" value={quotes.length} />
        <AnimatedMetric label="Tickets abertos" value={tickets.filter((t) => t.status === 'open').length} />
        <div className="admin-tabs">
          {['quotes', 'clients', 'services', 'tickets'].map((t) => <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t === 'quotes' ? 'Orçamentos' : t === 'clients' ? 'Clientes' : t === 'services' ? 'Serviços' : 'Tickets'}</button>)}
        </div>
        {tab === 'quotes' && <AdminQuotes quotes={quotes} saveQuote={saveQuote} />}
        {tab === 'clients' && <AdminClients users={users} />}
        {tab === 'services' && <AdminServices users={users} />}
        {tab === 'tickets' && <AdminTickets tickets={tickets} replyTicket={replyTicket} />}
      </section>
    </Page>
  );
}

function AdminServices({ users }) {
  const [clientId, setClientId] = useState(null);
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ service_name: '', description: '', price: '', status: 'pending' });
  const selectClient = (id) => {
    setClientId(id);
    setServices(read(`lrm_react_services_${id}`, []));
  };
  const addService = () => {
    if (!form.service_name || !clientId) return;
    const svc = read(`lrm_react_services_${clientId}`, []);
    svc.push({ ...form, id: Date.now(), price: Number(form.price) || 0, created_at: new Date().toISOString() });
    write(`lrm_react_services_${clientId}`, svc);
    setServices(svc);
    setForm({ service_name: '', description: '', price: '', status: 'pending' });
  };
  const updateStatus = (serviceId, status) => {
    const svc = services.map(s => s.id === serviceId ? { ...s, status } : s);
    write(`lrm_react_services_${clientId}`, svc);
    setServices(svc);
  };
  const removeService = (serviceId) => {
    const svc = services.filter(s => s.id !== serviceId);
    write(`lrm_react_services_${clientId}`, svc);
    setServices(svc);
  };
  return (
    <Reveal className="panel admin-panel">
      <h2>Gerenciar Serviços por Cliente</h2>
      <select className="admin-select" value={clientId || ''} onChange={(e) => selectClient(Number(e.target.value))}>
        <option value="">Selecione um cliente</option>
        {users.map((u) => <option key={u.id} value={u.id}>{u.name} — {u.email}</option>)}
      </select>
      {clientId && (
        <div className="admin-services-section" style={{ marginTop: '1rem' }}>
          <div className="admin-add-service" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
            <input className="admin-input" placeholder="Nome do serviço" value={form.service_name} onChange={(e) => setForm({ ...form, service_name: e.target.value })} />
            <input className="admin-input" placeholder="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <input className="admin-input" type="number" placeholder="Valor R$" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <select className="admin-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="pending">Pendente</option>
              <option value="in_progress">Em andamento</option>
              <option value="completed">Concluído</option>
            </select>
            <button className="admin-btn" onClick={addService} style={{ gridColumn: '1/-1' }}>Adicionar serviço</button>
          </div>
          {!services.length ? <div className="empty">Nenhum serviço registrado.</div> : services.map((s) => (
            <div className="admin-row" key={s.id}>
              <div>
                <strong>{s.service_name}</strong>
                <p>{s.description || ''} {s.price ? `· R$ ${Number(s.price).toFixed(2).replace('.', ',')}` : ''}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                <select className="admin-select small" value={s.status} onChange={(e) => updateStatus(s.id, e.target.value)}>
                  <option value="pending">Pendente</option>
                  <option value="in_progress">Em andamento</option>
                  <option value="completed">Concluído</option>
                </select>
                <button className="admin-btn danger" onClick={() => removeService(s.id)}>Remover</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Reveal>
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
  return <Page><section className="section center-block"><Lock size={36} /><h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>Acesso restrito</h1><p>Entre para acessar esta área.</p><MagneticButton className="primary" onClick={() => go('/login')}>Entrar</MagneticButton></section></Page>;
}

function App() {
  const [route, go] = useRoute();
  const [user, setUser] = useState(getCurrentUser());
  const [loading, setLoading] = useState(true);
  useEffect(initStore, []);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1800); return () => clearTimeout(t); }, []);

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
    <>
      <AnimatePresence mode="wait">{loading ? <Loader /> : null}</AnimatePresence>
      <Shell route={route} go={go} user={user} setUser={setUser}>
        <AnimatePresence mode="wait">{!loading && React.cloneElement(page, { key: route })}</AnimatePresence>
      </Shell>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
