import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const defaultProjects = [
  { id: 1, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80', title: 'Aura Botanicals', desc: 'Custom Next.js Storefront' },
  { id: 2, img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80', title: 'MetricsFlow AI', desc: 'React SPA + Tailwind' },
  { id: 3, img: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80', title: 'FinTech Secure', desc: 'High-conversion focused' },
  { id: 4, img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80', title: 'Stellar Logistics', desc: 'Global presence redesign' },
  { id: 5, img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80', title: 'HealthSync Portal', desc: 'HIPAA compliant' },
  { id: 6, img: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80', title: 'Studio Blanc', desc: 'Immersive WebGL' }
];

const defaultFeedbacks = [
  { id: 1, name: 'Marcus Chen', role: 'Founder, TechNova', text: 'DevCraft Studio completely redefined our online presence. Our conversion rate doubled within a single month of launching the new design.', rating: 5, approved: true },
  { id: 2, name: 'Elena Rodriguez', role: 'Retail Director, Lumiere', text: 'The e-commerce store they developed is incredibly fast and visually stunning. Their communication was excellent throughout the entire process.', rating: 5, approved: true },
  { id: 3, name: 'David Smith', role: 'CEO, SaaSFlow', text: 'Outstanding delivery of a custom web app. They grasped our complex requirements perfectly and built an architecture that simply works.', rating: 5, approved: true },
  { id: 4, name: 'Sarah Jenkins', role: 'Marketing Lead, Innova', text: 'An absolute pleasure to work with. They took our vision and translated it perfectly into a modern, responsive website.', rating: 5, approved: true }
];

const defaultPricing = [
  { id: 1, title: 'Landing Page', desc: 'Ideal for launching a new product, app, or marketing campaign.', amount: '35,000', prefix: '₹', isPopular: false, buttonText: 'Get Started', features: ['Up to 5 Pages', 'Custom UI/UX Design', 'Fully Mobile Responsive', 'Fundamental SEO Setup', '14 Days Post-Launch Support'] },
  { id: 2, title: 'E-Commerce', desc: 'A complete online store designed to maximize user sales and retention.', amount: '85,000', prefix: '₹', isPopular: true, buttonText: 'Get Started', features: ['Comprehensive Store Setup', 'Seamless Payment Integration', 'Inventory Dashboard Included', 'Advanced SEO Setup', '30 Days Priority Support'] },
  { id: 3, title: 'Custom Web App', desc: 'Complex custom features designed to solve your unique business challenges.', amount: '1,50,000', prefix: '₹', isPopular: false, buttonText: "Let's Discuss", features: ['Tailored Application Architecture', 'Secure Database & API Integrations', 'Scalable Infrastructure Design', 'Custom User Authentication', '60 Days Priority Support'] }
];

export const AppProvider = ({ children }) => {
  const API_BASE = 'https://company-49jp.onrender.com/api';

  const [projects, setProjects] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('devcraft_token') || null);

  const [pricingPlans, setPricingPlans] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/pricing`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setPricingPlans(data);
        else setPricingPlans(defaultPricing);
      })
      .catch(err => {
        console.error("MongoDB Pricing connection failed", err);
        setPricingPlans(defaultPricing);
      });
  }, []);

  // Backend Initialization Effects
  useEffect(() => {
    // 1. Fetch Featured Works
    fetch(`${API_BASE}/works`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setProjects(data);
        else setProjects(defaultProjects); // fallback to template data if mongodb is empty
      })
      .catch(err => {
        console.error("MongoDB Works connection failed", err);
        setProjects(defaultProjects);
      });

    // 2. Fetch Client Feedbacks
    fetch(`${API_BASE}/feedback/approved`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setFeedbacks(data);
        else setFeedbacks(defaultFeedbacks);
      })
      .catch(() => setFeedbacks(defaultFeedbacks));
  }, []);

  // Secure endpoints initialization (requires Token verification)
  useEffect(() => {
    if (token) {
      fetch(`${API_BASE}/appointments`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setAppointments(data);
        })
        .catch(err => console.error("Secure appointment fetch failed", err));

      fetch(`${API_BASE}/feedback/getAll`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setFeedbacks(data);
        })
        .catch(err => console.error("Secure feedback fetch failed", err));
    }
  }, [token]);

  const value = {
    API_BASE,
    token, setToken,
    projects, setProjects,
    feedbacks, setFeedbacks,
    pricingPlans, setPricingPlans,
    appointments, setAppointments
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
