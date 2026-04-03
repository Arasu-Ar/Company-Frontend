import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const PortfolioSection = () => {
  const { projects } = useContext(AppContext);
  const safeProjects = Array.isArray(projects) ? projects : [];

  return (
    <section className="build-store-section" id="portfolio">
      <div className="build-header">
        <h2 className="build-title">Featured Projects<span className="green-dot">.</span></h2>
        <Link to="/portfolio" style={{ textDecoration: 'none' }}>
          <button className="btn-outline-green">Explore Our Work</button>
        </Link>
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
      </div>
    </section>
  );
};

export default PortfolioSection;
