import React from 'react';
import { Link } from 'react-router-dom';
import supportImg from '../assets/start.jpg';

const SupportSection = () => {
  return (
    <section className="support-section">
      <div className="sup-left">
        <div className="cursive-title" style={{ color: '#94a3b8' }}>Let's Talk</div>
        <h2 className="support-title">Ready to start your project?</h2>
        <p style={{ color: '#cbd5e1', maxWidth: '400px' }}>We are dedicated to helping your digital presence thrive. Contact us today to schedule a comprehensive strategy session.</p>
        <div className="support-buttons">
          <Link to="/get-started" style={{ textDecoration: 'none' }}>
            <button className="sup-btn">📅 Schedule a Call <span className="arr">›</span></button>
          </Link>
        </div>
      </div>
      <div className="sup-right" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: '100%', minHeight: '350px' }}>
        <img src={supportImg} alt="Customer Support" style={{ width: '100%', maxWidth: '500px', height: 'auto', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }} />
      </div>
    </section>
  );
};

export default SupportSection;
