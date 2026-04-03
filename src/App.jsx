import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FeedbackPage from './pages/FeedbackPage';
import GetStartedPage from './pages/GetStartedPage';
import AdminPanel from './pages/AdminPanel';
import PortfolioPage from './pages/PortfolioPage';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
