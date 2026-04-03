import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const FeedbackPage = () => {
  const { API_BASE } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: '', role: '', text: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          location: formData.role, // Mapping Role to Backend's Location constraint
          message: formData.text,
          ratings: String(formData.rating)
        })
      });
      if (res.ok) setSubmitted(true);
      else alert("Failed to save feedback.");
    } catch (err) {
      console.error(err);
      alert("Network exception.");
    }
  };

  if (submitted) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '32px', color: 'var(--green-main)', marginBottom: '20px' }}>Thank You!</h2>
        <p style={{ fontSize: '18px', color: 'var(--text-gray)' }}>Your feedback has been submitted successfully and is awaiting review.</p>
        <button onClick={() => window.location.href='/'} className="btn-primary" style={{ margin: '30px auto', display: 'inline-block' }}>Return Home</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '80px 20px', maxWidth: '600px', margin: '0 auto', minHeight: '60vh' }}>
      <div className="cursive-title" style={{ color: 'var(--green-accent)', textAlign: 'center' }}>We Value Your Thoughts</div>
      <h2 style={{ fontSize: '42px', textAlign: 'center', marginBottom: '40px' }}>Submit Feedback</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--white)', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Your Name</label>
          <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eaeaea' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Company & Role</label>
          <input type="text" required placeholder="e.g. CEO, StartupInc" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eaeaea' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Rating (1-5)</label>
          <input type="number" min="1" max="5" required value={formData.rating} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eaeaea' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Your Feedback</label>
          <textarea required rows="5" value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eaeaea', resize: 'vertical' }}></textarea>
        </div>
        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '15px' }}>Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackPage;
