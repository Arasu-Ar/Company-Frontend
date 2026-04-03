import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const FeedbackSection = () => {
  const { feedbacks } = useContext(AppContext);
  const safeFeedbacks = Array.isArray(feedbacks) ? feedbacks : [];
  const approvedFeedbacks = safeFeedbacks.filter(fb => fb.approved);
  
  // Try to grab at least 3 approved feedbacks for display
  const displayFeedbacks = approvedFeedbacks.slice(0, 3);

  return (
    <section className="feedback-section" id="reviews">
      <div className="feedback-container">
        
        {/* Left Side: Heading */}
        <div className="feedback-left">
          <div className="cursive-title" style={{ color: 'var(--green-accent)' }}>Client Success</div>
          <h2 className="feedback-head-title">
            Real results.<br/>Real feedback.
          </h2>
          <p className="feedback-desc">
            We pride ourselves on delivering outstanding quality and driving measurable growth for our partners. 
          </p>
        </div>

        {/* Right Side: Offset Cards */}
        <div className="feedback-right">
          
          <div className="feedback-col feedback-col-1">
            {displayFeedbacks.slice(0, 2).map(fb => (
              <div key={fb._id || fb.id} className="feedback-card" style={{ background: 'var(--slate-bg)', border: '1px solid #eaeaea' }}>
                <div className="stars">{'★'.repeat(Number(fb.ratings || fb.rating) || 5)}</div>
                <p className="feedback-text">"{fb.message || fb.text}"</p>
                <div className="client-info">
                  <strong>{fb.name}</strong>
                  <span>{fb.location || fb.role}</span>
                </div>
              </div>
            ))}
            {displayFeedbacks.length === 0 && <p style={{color:'var(--text-gray)'}}>No feedback available yet.</p>}
          </div>

          <div className="feedback-col feedback-col-2">
            {displayFeedbacks.slice(2, 3).map(fb => (
              <div key={fb._id || fb.id} className="feedback-card" style={{ background: 'var(--green-main)', color: 'var(--white)', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <div className="stars" style={{ color: 'var(--green-accent)' }}>{'★'.repeat(Number(fb.ratings || fb.rating) || 5)}</div>
                <p className="feedback-text" style={{ color: 'var(--white)' }}>"{fb.message || fb.text}"</p>
                <div className="client-info">
                  <strong style={{ color: 'var(--white)' }}>{fb.name}</strong>
                  <span style={{ color: 'var(--green-accent)' }}>{fb.location || fb.role}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
