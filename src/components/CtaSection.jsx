import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <>
      <div className="cta-banner">
        <h2>Ready to bring your business online?</h2>
        <p style={{ fontSize: '17px', maxWidth: '550px', margin: '0 auto 30px', opacity: 0.85, lineHeight: 1.6 }}>
          You don't need to understand code — that's our job. Let's have a friendly chat about what you need.
        </p>
        <Link to="/get-started" style={{ textDecoration: 'none' }}>
          <button className="btn-white" style={{ padding: '16px 32px', fontSize: '16px' }}>Book a Free Consultation</button>
        </Link>
      </div>

      <div className="story-banners">
        <div className="story-banner">
          <div>
            <div className="story-title">Stay in the <span>Loop</span></div>
            <p style={{ fontSize: '14px', color: 'var(--text-gray)', lineHeight: 1.6 }}>
              Get simple, free tips on how to grow your business online. We only send helpful stuff — once a week, max.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            {subscribed ? (
              <div className="newsletter-success">
                <span>✓</span> You're in! Check your inbox.
              </div>
            ) : (
              <>

              </>
            )}
          </form>
        </div>
        <div className="story-banner beige">
          <div>
            <div className="story-title">Let's Work <span>Together</span></div>
            <p style={{ fontSize: '14px', color: 'var(--text-gray)', lineHeight: 1.6 }}>
              Have an idea but not sure where to start? We'll guide you every step of the way — no pressure, no confusing tech talk.
            </p>
          </div>
          <Link to="/get-started" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ color: 'var(--green-dark)', whiteSpace: 'nowrap' }}>Start a Conversation</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CtaSection;
