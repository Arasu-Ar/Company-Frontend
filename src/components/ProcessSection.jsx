import React from 'react';

const ProcessSection = () => {
  return (
    <section className="process-small-section" id="process">
      <div className="process-header">
        <div className="cursive-title">Seamless Workflow</div>
        <h2 className="section-title">Our proven 6-step framework.</h2>
        <p>From a foundational strategy to a polished, launched product.</p>
      </div>
      <div className="process-grid">
        <div className="process-step">
          <div className="step-num">Step 01</div>
          <h4>Discovery & Strategy</h4>
          <p>We analyze your business goals and plan a clear roadmap for success.</p>
        </div>
        <div className="process-step">
          <div className="step-num">Step 02</div>
          <h4>Architecture</h4>
          <p>We map out the user journey to ensure your site is easy to navigate.</p>
        </div>
        <div className="process-step">
          <div className="step-num">Step 03</div>
          <h4>UI/UX Design</h4>
          <p>We craft a visually stunning design that aligns perfectly with your brand.</p>
        </div>
        <div className="process-step">
          <div className="step-num">Step 04</div>
          <h4>Development</h4>
          <p>Our team expertly writes the code to bring the concept to life.</p>
        </div>
        <div className="process-step">
          <div className="step-num">Step 05</div>
          <h4>Quality Assurance</h4>
          <p>We rigorously test your website across all devices to ensure peak performance.</p>
        </div>
        <div className="process-step">
          <div className="step-num">Step 06</div>
          <h4>Launch & Support</h4>
          <p>Your site goes live, and we continue to provide support for 30 days after launch.</p>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
