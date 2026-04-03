import React from 'react';
import HeroSection from '../components/HeroSection';
import PortfolioSection from '../components/PortfolioSection';
import ExpertiseSection from '../components/ExpertiseSection';
import ProcessSection from '../components/ProcessSection';
import MarketSection from '../components/MarketSection';
import PricingSection from '../components/PricingSection';
import TechSection from '../components/TechSection';
import FeedbackSection from '../components/FeedbackSection';
import SupportSection from '../components/SupportSection';
import ResourcesSection from '../components/ResourcesSection';
import CtaSection from '../components/CtaSection';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <PortfolioSection />
      <ExpertiseSection />
      <ProcessSection />
      <MarketSection />
      <PricingSection />
      <TechSection />
      <FeedbackSection />
      <SupportSection />
      <ResourcesSection />
      <CtaSection />
    </div>
  );
};

export default Home;
