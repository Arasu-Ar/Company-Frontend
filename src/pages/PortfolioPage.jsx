import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const PortfolioPage = () => {
  const { projects } = useContext(AppContext);
  const safeProjects = Array.isArray(projects) ? projects : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: 'var(--slate-bg)', minHeight: '100vh', paddingTop: '40px', paddingBottom: '80px' }}>
      <section className="build-store-section" style={{ background: 'transparent' }}>
        <div className="build-header" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '60px' }}>
          <h1 className="build-title" style={{ color: 'var(--text-dark)' }}>Our Full Portfolio<span className="green-dot">.</span></h1>
          <p style={{ color: 'var(--text-gray)', fontSize: '18px', maxWidth: '600px', marginTop: '20px' }}>
            Explore our comprehensive collection of successful projects and digital transformations.
          </p>
        </div>
        <div className="portfolio-gallery">
          {safeProjects.map(proj => (
            <div key={proj.id || proj._id} className="portfolio-item">
              <div className="portfolio-img" style={{ padding: 0, overflow: 'hidden' }}>
                {proj.link ? (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', height: '100%' }}>
                    <img src={proj.image?.url || proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </a>
                ) : (
                  <img src={proj.image?.url || proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              <div className="portfolio-info">
                <h4>{proj.title}</h4>
                <p>{proj.description || proj.desc}</p>
              </div>
            </div>
          ))}
          {safeProjects.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-gray)', padding: '40px' }}>
              No projects available yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
