import React from 'react';
import landingExpertise from '../assets/landing-expertise.png';
import ecommerceExpertise from '../assets/ecommerce-expertise.jpg';
import webAppsExpertise from '../assets/web-apps-expertise.png';

const ExpertiseSection = () => {
  return (
    <section className="services-section" id="services">
      <div className="cursive-title" style={{ color: 'var(--green-accent)' }}>Our Expertise</div>
      <h2 className="services-title">We craft digital experiences that drive real results.</h2>
      <div className="services-grid">
        <div className="service-card">
          <div className="service-image" style={{ width: '100%', height: '200px', marginBottom: '20px', borderRadius: '12px', overflow: 'hidden' }}>
            <img src={landingExpertise} alt="Landing Pages" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
          </div>
          <h3>Landing Pages</h3>
          <p>Beautifully designed pages built to capture attention and turn your visitors into loyal customers.</p>
        </div>
        <div className="service-card">
          <div className="service-image" style={{ width: '100%', height: '200px', marginBottom: '20px', borderRadius: '12px', overflow: 'hidden' }}>
            <img src={ecommerceExpertise} alt="E-Commerce Stores" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
          </div>
          <h3>E-Commerce Stores</h3>
          <p>Secure, fast, and easy-to-use online stores designed to showcase your products and maximize sales.</p>
        </div>
        <div className="service-card">
          <div className="service-image" style={{ width: '100%', height: '200px', marginBottom: '20px', borderRadius: '12px', overflow: 'hidden' }}>
            <img src={webAppsExpertise} alt="Custom Web Apps" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
          </div>
          <h3>Custom Web Apps</h3>
          <p>Tailor-made web applications and portals created specifically to handle your unique business needs.</p>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
