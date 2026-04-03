import React from 'react';

const technologies = [
  { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', color: '#61DAFB', bg: '#e8f9fd' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', color: '#000', bg: '#f0f0f0', invert: true },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', color: '#06B6D4', bg: '#e0f9ff' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', color: '#339933', bg: '#edfaed' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', color: '#47A248', bg: '#edfaed' },
  { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', color: '#646CFF', bg: '#f0effe' },
  { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', color: '#000', bg: '#f0f0f0', invert: true },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', color: '#F24E1E', bg: '#fef0ed' },
];

const TechSection = () => {
  // Duplicate items for seamless infinite scroll
  const items = [...technologies, ...technologies];

  return (
    <section className="tech-section-v2">
      <div className="tech-v2-inner">
        <div className="tech-v2-header">
          <div className="cursive-title" style={{ color: 'var(--green-accent)' }}>Our Tech Stack</div>
          <h2 className="tech-v2-title">
            Technologies we work with
          </h2>
        </div>

        {/* Scrolling marquee row */}
        <div className="tech-marquee-wrap">
          <div className="tech-marquee-track">
            {items.map((tech, i) => (
              <div className="tech-marquee-chip" key={`${tech.name}-${i}`}>
                <div className="tech-chip-icon" style={{ background: tech.bg }}>
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    style={{
                      width: '28px',
                      height: '28px',
                      filter: tech.invert ? 'invert(1)' : 'none'
                    }}
                  />
                </div>
                <span className="tech-chip-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="tech-v2-stats">
          <div className="tech-stat-pill">
            <span className="tech-stat-num">8+</span>
            <span className="tech-stat-label">Technologies</span>
          </div>
          <div className="tech-stat-divider" />
          <div className="tech-stat-pill">
            <span className="tech-stat-num">99%</span>
            <span className="tech-stat-label">Uptime</span>
          </div>
          <div className="tech-stat-divider" />
          <div className="tech-stat-pill">
            <span className="tech-stat-num">&lt;2s</span>
            <span className="tech-stat-label">Load Time</span>
          </div>
          <div className="tech-stat-divider" />
          <div className="tech-stat-pill">
            <span className="tech-stat-num">A+</span>
            <span className="tech-stat-label">Score</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSection;
