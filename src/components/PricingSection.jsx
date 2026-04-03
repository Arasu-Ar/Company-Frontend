import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const { pricingPlans } = useContext(AppContext);
  const safePricing = Array.isArray(pricingPlans) ? pricingPlans : [];

  return (
    <section className="pricing-section" id="pricing">
      <h2 className="pricing-title">Transparent pricing for every stage.</h2>
      <div className="pricing-cards">
        
        {safePricing.map(plan => (
          <div key={plan._id || plan.id} className={`price-card ${plan.isPopular ? 'popular' : ''}`}>
            {plan.isPopular && <div className="popular-badge">Most Popular</div>}
            <h3>{plan.title}</h3>
            <p className="price-desc">{plan.desc}</p>
            <div className="price-amount">
              {plan.prefix.includes('from') && <span className="period">{plan.prefix} </span>}
              {!plan.prefix.includes('from') && <span className="currency">{plan.prefix}</span>}
              {plan.amount}
            </div>
            <ul className="price-features">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <Link to="/get-started" style={{textDecoration:'none', width:'100%'}}>
              <button className={plan.isPopular ? "btn-primary price-btn" : "btn-secondary price-btn"} style={plan.isPopular ? {color:'var(--green-dark)'} : {}}>
                {plan.buttonText}
              </button>
            </Link>
          </div>
        ))}

      </div>
    </section>
  );
};

export default PricingSection;
