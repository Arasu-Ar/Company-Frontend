import React from 'react';
import { Link } from 'react-router-dom';
import hero3d from '../assets/hero.png';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-left">
        <h1 className="hero-title">A website that works as hard as you do.</h1>
        <div className="hero-buttons">
          <a href="#pricing" style={{ textDecoration: 'none' }}>
            <button className="btn-primary">View Our Prices <span>→</span></button>
          </a>
          <Link to="/portfolio" style={{ textDecoration: 'none' }}>
            <button className="btn-secondary">See Our Portfolio</button>
          </Link>
        </div>
      </div>
      <div className="hero-right" style={{ background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={hero3d} alt="Web Design" style={{ width: '100%', maxWidth: '600px', height: 'auto', objectFit: 'contain' }} />
      </div>
    </section>
  );
};

export default HeroSection;
