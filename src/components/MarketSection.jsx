import React, { useState } from 'react';

const features = [
  {
    tag: 'Performance',
    title: 'Lightning Fast',
    desc: 'Optimized for instant loading to keep visitors engaged.',
    icon: '⚡',
    color: '#f59e0b',
    bg: '#fffbeb',
    border: '#fde68a',
  },
  {
    tag: 'SEO',
    title: 'Rank Higher',
    desc: 'Built so search engines easily find your content.',
    icon: '🔍',
    color: '#22c55e',
    bg: '#f0fdf4',
    border: '#bbf7d0',
  },
  {
    tag: 'Responsive',
    title: 'Any Device',
    desc: 'Flawless on phones, tablets, and desktops.',
    icon: '📱',
    color: '#3b82f6',
    bg: '#eff6ff',
    border: '#bfdbfe',
  },
  {
    tag: 'Analytics',
    title: 'Smart Insights',
    desc: 'Track user behavior and measure success.',
    icon: '📊',
    color: '#8b5cf6',
    bg: '#f5f3ff',
    border: '#ddd6fe',
  },
  {
    tag: 'Security',
    title: 'Enterprise Security',
    desc: 'Robust measures to protect your data.',
    icon: '🛡️',
    color: '#ef4444',
    bg: '#fff1f2',
    border: '#fecdd3',
  },
  {
    tag: 'Support',
    title: '24/7 Support',
    desc: 'Always here when you need us.',
    icon: '💬',
    color: '#14b8a6',
    bg: '#f0fdfa',
    border: '#99f6e4',
  },
];

const MarketSection = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="market-section-v2">
      <div className="market-v2-header">
        <div>
          <div className="cursive-title" style={{ color: 'var(--green-accent)' }}>Why Choose Us</div>
          <h2 className="market-v2-title">What makes us different</h2>
        </div>
      </div>

      <div className="market-v2-grid">
        {features.map((f, i) => (
          <div
            key={f.tag}
            className="market-v2-card"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderColor: hovered === i ? f.border : '#eaeaea',
              background: hovered === i ? f.bg : '#fff',
              transform: hovered === i ? 'translateY(-6px)' : 'none',
              boxShadow: hovered === i ? `0 16px 32px ${f.color}15` : '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div className="market-v2-card-top">
              <div
                className="market-v2-icon"
                style={{
                  background: hovered === i ? f.color : f.bg,
                  transition: 'all 0.3s ease',
                }}
              >
                <span style={{ fontSize: '22px' }}>{f.icon}</span>
              </div>
              <div
                className="market-v2-tag"
                style={{ color: f.color, background: f.bg, borderColor: f.border }}
              >
                {f.tag}
              </div>
            </div>
            <h3 className="market-v2-card-title">{f.title}</h3>
            <p className="market-v2-card-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarketSection;
