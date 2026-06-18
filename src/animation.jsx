import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function useLenis() {
  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.destroy();
    }
    lenisInstance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      gestureOrientation: 'vertical',
    });

    lenisInstance.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      }
      gsap.ticker.lagSmoothing();
    };
  }, []);
}

export function useGsapContext(ref, deps = []) {
  const ctx = useRef(null);
  useEffect(() => {
    ctx.current = gsap.context(() => {}, ref.current);
    return () => {
      if (ctx.current) ctx.current.revert();
    };
  }, deps);
  return ctx;
}

export function useHeroAnimation(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        el.querySelectorAll('[data-hero="orb"]'),
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.25, duration: 1.5, stagger: 0.2, ease: 'power2.out' }
      );

      tl.fromTo(
        el.querySelectorAll('[data-hero="video"]'),
        { scale: 1.12 },
        { scale: 1, duration: 1.8, ease: 'power2.out' },
        '-=1.2'
      );

      tl.fromTo(
        el.querySelectorAll('[data-hero="shield"]'),
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        '-=1.5'
      );

      tl.fromTo(
        el.querySelectorAll('[data-hero="eyebrow"]'),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      );

      tl.fromTo(
        el.querySelectorAll('[data-hero="title"]'),
        { y: 60, opacity: 0, filter: 'blur(12px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1 },
        '-=0.3'
      );

      tl.fromTo(
        el.querySelectorAll('[data-hero="desc"]'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      );

      tl.fromTo(
        el.querySelectorAll('[data-hero="actions"]'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.3'
      );

      tl.fromTo(
        el.querySelectorAll('[data-hero="dashboard"]'),
        { y: 60, opacity: 0, rotateX: 15 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.1 },
        '-=0.5'
      );
    }, el);
    return () => ctx.revert();
  }, [ref]);
}

export function useSectionReveal(ref, options = {}) {
  const { stagger = 0.06, from = { y: 40, opacity: 0 } } = options;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const children = el.children;
      if (!children.length) {
        gsap.fromTo(el, from, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        });
        return;
      }
      gsap.fromTo(Array.from(children), from, {
        y: 0, opacity: 1, duration: 0.7, stagger, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      });
    }, el);
    return () => ctx.revert();
  }, [ref, stagger]);
}

export function useParallax(ref, options = {}) {
  const { yAmount = 80, start = 'top bottom', end = 'bottom top' } = options;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { y: -yAmount / 2 }, {
        y: yAmount / 2, ease: 'none',
        scrollTrigger: { trigger: el.parentElement || el, start, end, scrub: 1.5 }
      });
    }, el);
    return () => ctx.revert();
  }, [ref, yAmount]);
}

export function useMetricCounter(ref, value, duration = 2) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { textContent: 0 }, {
        textContent: value, duration, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        snap: { textContent: 1 }
      });
    }, el);
    return () => ctx.revert();
  }, [ref, value, duration]);
}

export function useStorytellingScroll(ref, wrapperRef) {
  useEffect(() => {
    const el = ref.current;
    const wrapper = wrapperRef?.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: '+=350%',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });
      if (wrapper) {
        const panels = wrapper.querySelectorAll('.storytelling-panel');
        if (panels.length) {
          gsap.to(panels, {
            yPercent: -100 * (panels.length - 1),
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top top',
              end: '+=350%',
              scrub: 1.2,
            }
          });
        }
      }
    }, el);
    return () => ctx.revert();
  }, [ref, wrapperRef]);
}

export function useWordReveal(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll('.wr-word');
    if (!words.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(words,
        { y: 40, opacity: 0, rotateX: -30 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 0.7, stagger: 0.035, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' }
        }
      );
    }, el);
    return () => ctx.revert();
  }, [ref]);
}

export function useImageParallax(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { scale: 1.1 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
      });
    }, el);
    return () => ctx.revert();
  }, [ref]);
}

export function useParallaxOrbs(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const orbs = el.querySelectorAll('.orb');
      if (!orbs.length) return;
      gsap.to(orbs, {
        y: () => gsap.utils.random(-60, 60),
        x: () => gsap.utils.random(-40, 40),
        ease: 'none',
        scrollTrigger: {
          trigger: el, start: 'top bottom', end: 'bottom top', scrub: 2
        }
      });
    }, el);
    return () => ctx.revert();
  }, [ref]);
}

export function useCardReveal(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll('.service-card, .price-card, .ref-card-react, .partner-card-react, .benefit-card-react');
      if (!cards.length) return;
      gsap.fromTo(cards,
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    }, el);
    return () => ctx.revert();
  }, [ref]);
}

export function AnimatedMetric({ label, value, icon: Icon }) {
  const numRef = useRef(null);
  useMetricCounter(numRef, value);
  return (
    <div className="metric">
      {Icon && <Icon size={18} style={{ color: 'var(--accent)', marginBottom: '0.35rem' }} />}
      <strong ref={numRef}>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export function WordReveal({ text, as: Tag = 'h2', className, ...props }) {
  const ref = useRef(null);
  useWordReveal(ref);
  const words = text.split(' ').map((w, i) => (
    <span
      key={i}
      className="wr-word"
      style={{ display: 'inline-block' }}
    >{w}{i < text.split(' ').length - 1 ? '\u00A0' : ''}</span>
  ));
  return <Tag ref={ref} className={className} {...props}>{words}</Tag>;
}
