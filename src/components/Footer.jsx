import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="foot-col">
          <h5>Services</h5>
          <ul>
            <li>Landing Pages</li>
            <li>E-Commerce</li>
            <li>Custom Web Apps</li>
            <li>UI/UX Design</li>
            <li>SEO Optimization</li>
            <li>Site Audits</li>
          </ul>
        </div>
        <div className="foot-col">
          <h5>Company</h5>
          <ul>
            <li>About Us</li>
            <li>Our Portfolio</li>
            <li>Careers</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div className="foot-col">
          <h5>Resources</h5>
          <ul>
            <li>Blog</li>
            <li>Guides</li>
            <li>Case Studies</li>
            <li>Help Center</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-social">
          <div className="social-icon"></div>
          <div className="social-icon"></div>
          <div className="social-icon"></div>
          <div className="social-icon"></div>
        </div>
        <div className="footer-mail">
          thennarasu1926@gmail.com<br/>
          +91 7449082022
        </div>
      </div>
      <div className="footer-copy">© 2026 DevCraft Studio. Engineered for success. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
