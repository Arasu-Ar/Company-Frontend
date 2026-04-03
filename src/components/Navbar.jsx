import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="main-header">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="logo" style={{ cursor: 'pointer' }}>
          <div className="logo-icon">
            <div style={{ borderColor: 'var(--green-main)' }}></div>
            <div style={{ borderColor: 'var(--green-accent)' }}></div>
          </div>
          DevCraft Studio
        </div>
      </Link>

      {/* Desktop Links */}
      <ul className="nav-links">
        <li><a href="/#services" style={{ textDecoration: 'none', color: 'inherit' }}>Services</a></li>
        <li><Link to="/portfolio" style={{ textDecoration: 'none', color: 'inherit' }}>Portfolio</Link></li>
        <li><a href="/#process" style={{ textDecoration: 'none', color: 'inherit' }}>Process</a></li>
        <li><a href="/#pricing" style={{ textDecoration: 'none', color: 'inherit' }}>Pricing</a></li>
      </ul>

      <div className="nav-cta">
        <Link to="/get-started">
          <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Get Started</button>
        </Link>
      </div>

      {/* Mobile Toggle */}
      <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X size={28} color="var(--text-dark)" /> : <Menu size={28} color="var(--text-dark)" />}
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--white)', padding: '20px',
          borderBottom: '1px solid #eaeaea', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          animation: 'toastSlideIn 0.2s ease'
        }}>
          <a href="/#services" onClick={closeMenu} style={{ textDecoration: 'none', color: 'inherit', fontWeight: '600', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>Services</a>
          <Link to="/portfolio" onClick={closeMenu} style={{ textDecoration: 'none', color: 'inherit', fontWeight: '600', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>Portfolio</Link>
          <a href="/#process" onClick={closeMenu} style={{ textDecoration: 'none', color: 'inherit', fontWeight: '600', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>Process</a>
          <a href="/#pricing" onClick={closeMenu} style={{ textDecoration: 'none', color: 'inherit', fontWeight: '600', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>Pricing</a>
          <Link to="/feedback" onClick={closeMenu} style={{ textDecoration: 'none', color: 'inherit', fontWeight: '600', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>Give Feedback</Link>
          <Link to="/get-started" onClick={closeMenu} style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ width: '100%', padding: '14px', justifyContent: 'center' }}>Get Started</button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
