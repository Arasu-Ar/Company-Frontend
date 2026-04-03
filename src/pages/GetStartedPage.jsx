import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const GetStartedPage = () => {
  const { API_BASE } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: 'Landing Page', message: '', location: '', time: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
           name: formData.name, 
           email: formData.email, 
           phone: formData.phone,
           location: formData.location || 'Online Meeting', 
           time: formData.time || 'To Be Determined',
           message: `[${formData.service}] ${formData.message}`
        })
      });
      if (res.ok) {
        // brief delay so the user sees the animation
        await new Promise(r => setTimeout(r, 1200));
        setSubmitted(true);
      } else {
        setIsSubmitting(false);
        alert("Failed to book appointment.");
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert("Network exception.");
    }
  };

  if (submitted) {
    return (
      <div className="submit-success-wrap">
        <div className="submit-success-icon">
          <svg viewBox="0 0 52 52" className="submit-checkmark">
            <circle className="submit-checkmark-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="submit-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <h2 style={{ fontSize: '32px', color: 'var(--green-main)', marginBottom: '16px' }}>Request Received!</h2>
        <p style={{ fontSize: '17px', color: 'var(--text-gray)', maxWidth: '400px', margin: '0 auto 30px', lineHeight: 1.6 }}>
          We've noted your details. Our team will reach out to confirm your appointment time shortly.
        </p>
        <button onClick={() => window.location.href='/'} className="btn-primary" style={{ margin: '0 auto', display: 'inline-block' }}>Return Home</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '60vh' }}>
      <div className="cursive-title" style={{ color: 'var(--green-accent)', textAlign: 'center' }}>Let's Build Something</div>
      <h2 style={{ fontSize: '42px', textAlign: 'center', marginBottom: '40px' }}>Schedule a Strategy Session</h2>
      
      <form onSubmit={handleSubmit} className={`get-started-form ${isSubmitting ? 'form-submitting' : ''}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', background: 'var(--white)', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
        
        {/* Submitting overlay */}
        {isSubmitting && (
          <div className="submit-overlay">
            <div className="submit-spinner">
              <div className="spinner-ring" />
              <div className="spinner-ring spinner-ring-2" />
              <div className="spinner-ring spinner-ring-3" />
            </div>
            <p className="submit-overlay-text">Booking your appointment...</p>
          </div>
        )}

        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Full Name</label>
          <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eaeaea' }} disabled={isSubmitting} />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email Address</label>
          <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eaeaea' }} disabled={isSubmitting} />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Phone Number</label>
          <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eaeaea' }} disabled={isSubmitting} />
        </div>

        <div>
           <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Location (City / State)</label>
           <input type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eaeaea' }} disabled={isSubmitting} />
        </div>

        <div>
           <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Preferred Time</label>
           <input type="text" placeholder="e.g. 10:00 AM EST" required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eaeaea' }} disabled={isSubmitting} />
        </div>

        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Service of Interest</label>
          <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eaeaea' }} disabled={isSubmitting}>
            <option>Landing Page</option>
            <option>E-Commerce Store</option>
            <option>Custom Web App</option>
            <option>Other / Not Sure</option>
          </select>
        </div>

        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Project Details / Message</label>
          <textarea required rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eaeaea', resize: 'vertical' }} disabled={isSubmitting}></textarea>
        </div>

        <button type="submit" className="btn-primary" style={{ gridColumn: 'span 2', padding: '15px', justifyContent: 'center' }} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Request Appointment'}
        </button>
      </form>
    </div>
  );
};

export default GetStartedPage;
