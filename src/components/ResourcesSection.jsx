import React from 'react';

const ResourcesSection = () => {
  return (
    <section className="resources-section">
      <div className="res-title">Simple <span>guides</span> for first-time website owners</div>
      <div className="res-cards">
        <div className="res-card">
          <div className="card-tag">Beginner Guide</div>
          <h4>How to Get Your First Website Online</h4>
          <p>No coding experience? No problem. We walk you through every step — from picking a domain name to going live.</p>
          <button className="btn-outline">Read Guide</button>
        </div>
        <div className="res-card">
          <div className="card-tag">Checklist</div>
          <h4>5 Things Every Business Website Needs</h4>
          <p>A simple checklist covering speed, mobile design, contact info, trust signals, and navigation — explained in plain English.</p>
          <button className="btn-outline">Get Checklist</button>
        </div>
        <div className="res-card">
          <div className="card-tag">Free Tips</div>
          <h4>How to Get Found on Google (Without Being an Expert)</h4>
          <p>Easy, practical tips to help your small business appear in Google search results. Written for non-techy people.</p>
          <button className="btn-outline">Read Tips</button>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
