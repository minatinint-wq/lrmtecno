import React from 'react';

export function WordReveal({ text, as: Tag = 'h2', className, ...props }) {
  return <Tag className={className} {...props}>{text}</Tag>;
}

export function AnimatedMetric({ label, value, icon: Icon }) {
  return (
    <div className="metric">
      {Icon && <Icon size={18} style={{ color: 'var(--accent)', marginBottom: '0.35rem' }} />}
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export const useHeroAnimation = () => {};
export const useSectionReveal = () => {};
export const useCardReveal = () => {};
export const useParallax = () => {};
export const useMetricCounter = () => {};
export const useStorytellingScroll = () => {};
export const useWordReveal = () => {};
export const useImageParallax = () => {};
export const useParallaxOrbs = () => {};
export const useGsapContext = () => {};
export const useLenis = () => {};
