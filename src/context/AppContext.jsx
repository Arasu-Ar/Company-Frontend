import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

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
      })
      .catch(err => {
        console.error("MongoDB Pricing connection failed", err);
      });
  }, []);

  // Backend Initialization Effects
  useEffect(() => {
    // 1. Fetch Featured Works
    fetch(`${API_BASE}/works`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setProjects(data);
      })
      .catch(err => {
        console.error("MongoDB Works connection failed", err);
      });

    // 2. Fetch Client Feedbacks
    fetch(`${API_BASE}/feedback/approved`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setFeedbacks(data);
      })
      .catch(err => console.error("MongoDB Feedback connection failed", err));
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
