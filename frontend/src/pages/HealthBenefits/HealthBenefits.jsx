import React, { useState, useEffect, useRef, useCallback } from 'react';
import './HealthBenefits.css';



// ─── Data ─────────────────────────────────────────────────────────
const nutritionData = [
  { label: 'Energy', value: '516.74', unit: 'kcal', rda: '10.34%', fill: 42, color: '#E86A4A', note: 'Sustained fuel without the crash' },
  { label: 'Protein', value: '22.13', unit: 'g', rda: '17.70%', fill: 72, color: '#2D6A4F', note: 'Builds and repairs muscle tissue' },
  { label: 'Dietary Fiber', value: '4.84', unit: 'g', rda: '—', fill: 58, color: '#D4A373', note: 'Feeds your gut\'s good bacteria' },
  { label: 'Total Fat', value: '28.65', unit: 'g', rda: '17.10%', fill: 44, color: '#E86A4A', note: 'Healthy fats from coconut' },
  { label: 'Cholesterol', value: '0.00', unit: 'mg', rda: '0%', fill: 0, color: '#2D6A4F', note: 'Completely heart-safe — zero detected' },
  { label: 'Potassium', value: '400.09', unit: 'mg', rda: '—', fill: 38, color: '#E86A4A', note: 'Supports heart rhythm' },
  { label: 'Calcium', value: '94.49', unit: 'mg', rda: '6.30%', fill: 24, color: '#D4A373', note: 'Strengthens bones and teeth' },
  { label: 'Iron', value: '3.71', unit: 'mg', rda: '8.71%', fill: 32, color: '#E86A4A', note: 'Boosts oxygen transport in blood' },
];

const ingredients = [
  { name: 'Coconut Flour', role: 'Primary ingredient', benefit: 'High fiber · Gut health' },
  { name: 'Whole Wheat Flour', role: 'Binding agent', benefit: 'Natural protein source' },
  { name: 'Sunflower Oil', role: 'Healthy fat', benefit: 'Rich in Vitamin E' },
  { name: 'Pink Salt', role: 'Mineral-rich', benefit: 'Electrolyte balance' },
  { name: 'Red Chilli', role: 'Metabolism booster', benefit: 'High in Vitamin C' },
  { name: 'Garlic', role: 'Heart health', benefit: 'Immunity booster' },
  { name: 'Curry Leaves', role: 'Antioxidant', benefit: 'Iron-rich · Digestive aid' },
  { name: 'Moringa', role: 'Superfood', benefit: 'Packed with Vitamins & Minerals' },
];

const healthGoalTabs = {
  diabetes: { title: 'Diabetes Control', points: ['Low GI (44) prevents blood sugar spikes', 'High fiber slows glucose absorption', 'Zero added sugars', '22g protein helps stabilize blood sugar'], rec: 'Recommended: 2 khakhras as mid-morning or evening snack' },
  weightLoss: { title: 'Weight Loss', points: ['4.85g fiber keeps you full', '516 cal/100g moderate', 'Healthy fats support metabolism', 'Portion controlled'], rec: 'Replace 1 meal with 3 khakhras + veggies' },
  heartHealth: { title: 'Heart Health', points: ['Zero cholesterol', 'Healthy fat profile (MUFA and PUFA)', 'Potassium 400mg supports BP', 'Low sodium option'], rec: 'Daily with green tea for best results' },
  digestiveHealth: { title: 'Digestive Health', points: ['Prebiotic fiber feeds good gut bacteria', 'Promotes regular bowel movement', 'Easy digestion and lightness', '4.85g fiber per 100g'], rec: '2 khakhras daily + plenty of water' },
  fitness: { title: 'Fitness and Performance', points: ['22g protein per 100g fuels muscle recovery', 'Sustained, slow-release energy from low GI', 'Portable and convenient post-workout snack', 'Pairs perfectly with protein spreads and hummus'], rec: 'Recommended: Post-workout with protein spread' },
};

const giComparison = [
  { name: 'WIN-DIA Khakhra', gi: 44, level: 'LOW', color: '#2D6A4F', bullets: ['Slow energy release', 'Keeps you full longer', 'Better blood sugar control'] },
  { name: 'Brown Rice', gi: 68, level: 'MEDIUM', color: '#D4A373', bullets: ['Moderate energy', 'Average fullness'] },
  { name: 'White Bread', gi: 75, level: 'HIGH', color: '#E86A4A', bullets: ['Blood sugar spike', 'Energy crash'] },
];

const comparisonFoods = [
  { name: 'WIN-DIA Khakhra', gi: 44, level: 'LOW' },
  { name: 'Brown Rice', gi: 68, level: 'MEDIUM' },
  { name: 'White Bread', gi: 75, level: 'HIGH' },
];

const medicinalValues = [
  { num: '01', title: 'Blood Sugar Stability', detail: 'A blood sugar score of 48 (certified LOW) means WIN-DIA releases energy slowly — no sudden spikes, no crashes. Ideal for diabetics and pre-diabetics.', metric: 'GI Score: 48' },
  { num: '02', title: 'Zero Contaminants', detail: 'NABL-accredited lab testing confirms zero pesticide residues, zero heavy metals above limits, and no harmful bacteria including E. coli and Salmonella.', metric: 'NABL Verified' },
  { num: '03', title: 'Heart-Safe Formula', detail: 'Cholesterol was below the limit of quantification — effectively zero. Healthy poly-unsaturated fats (17.19g per 100g) actively support cardiovascular health.', metric: 'Cholesterol: 0 mg' },
  { num: '04', title: 'Long Shelf Stability', detail: 'Accelerated shelf-life testing confirms microbiological safety and full sensory acceptability for over 6 months — without artificial preservatives.', metric: '6+ Months' },
];

const feelBenefits = [
  { num: '01', title: 'Steady Energy, All Day', detail: 'Slow energy release means you stay focused and satisfied — without mid-morning fatigue or sudden hunger spikes.', tag: 'ENERGY' },
  { num: '02', title: 'Gut Flora Support', detail: 'Coconut flour acts as prebiotic fuel, nourishing beneficial gut bacteria for better digestion and immune resilience.', tag: 'DIGESTION' },
  { num: '03', title: 'Muscle Maintenance', detail: 'With 22.13g of protein per 100g — higher than most packaged snacks — WIN-DIA supports muscle repair and lean body composition.', tag: 'STRENGTH' },
  { num: '04', title: 'Weight Consciousness', detail: '4.84g of fiber per 100g triggers satiety signals faster and keeps you fuller longer, reducing unnecessary snacking.', tag: 'SATIETY' },
];

const faqs = [
  { q: 'Is WIN-DIA suitable for people managing diabetes?', a: 'Yes. The certified GI of 44 places WIN-DIA firmly in the LOW category. Glucose is absorbed slowly, preventing sharp spikes.' },
  { q: 'How is WIN-DIA different from regular khakhra?', a: 'WIN-DIA uses coconut flour as primary ingredient, delivering prebiotic fiber, dramatically lower GI, and zero cholesterol.' },
  { q: 'Can WIN-DIA be eaten daily?', a: 'Absolutely. It\'s an everyday snack with no artificial preservatives, verified by shelf-life testing.' },
  { q: 'Is the Gluten Free variant truly wheat-free?', a: 'Yes, our Gluten Free Khakhra uses coconut, green banana, amaranth flours and lentils.' },
  { q: 'What certifications back these claims?', a: 'NABL-accredited lab testing, CFTRI food scientist guidance, FSSAI compliance.' },
];

// ─── Hooks ─────────────────────────────────────────────────────────
function useInViewRepeat(threshold = 0.2) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold, triggerOnce: false }
    );
    const current = ref.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, [threshold]);
  return [ref, isVisible];
}

function AnimatedCard({ children, direction = 'up', delay = 0 }) {
  const [ref, isVisible] = useInViewRepeat(0.2);
  return (
    <div
      ref={ref}
      className={`win-hb-animate-card win-hb-animate-card--${direction} ${isVisible ? 'win-hb-animate-card--visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Components ─────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="win-hb-hero">
      <div className="win-hb-hero-container">
        <div className="win-hb-hero-text">
          <div className="win-hb-hero-overline">THE SCIENCE OF WELLNESS</div>
          <h1 className="win-hb-hero-title">Why WIN-DIA Thins<br />are Different</h1>
          <div className="win-hb-hero-badges">
            <span className="win-hb-badge">Backed by CFTRI research</span>
            <span className="win-hb-badge">NABL lab tested</span>
            <span className="win-hb-badge">GI certified</span>
          </div>
        </div>
        
      </div>
    </section>
  );
}

function StatsRow() {
  return (
    <section className="win-hb-stats-row">
      <div className="win-hb-stats-grid">
        <div className="win-hb-stat-item">
          <div className="win-hb-stat-number">44</div>
          <div className="win-hb-stat-label">GLYCEMIC INDEX</div>
          <div className="win-hb-stat-check">LOW ✓</div>
        </div>
        <div className="win-hb-stat-item">
          <div className="win-hb-stat-number">4.85g</div>
          <div className="win-hb-stat-label">DIETARY FIBER</div>
          <div className="win-hb-stat-check">PER 100G ✓</div>
        </div>
        <div className="win-hb-stat-item">
          <div className="win-hb-stat-number">22.13g</div>
          <div className="win-hb-stat-label">PROTEIN</div>
          <div className="win-hb-stat-check">PER 100G ✓</div>
        </div>
        <div className="win-hb-stat-item">
          <div className="win-hb-stat-number">0mg</div>
          <div className="win-hb-stat-label">CHOLESTEROL</div>
          <div className="win-hb-stat-check">ZERO ✓</div>
        </div>
      </div>
      <div className="win-hb-stats-footer">
        <span>Based on NABL-certified independent lab testing</span>
      </div>
    </section>
  );
}

function DigestiveWellness() {
  return (
    <section className="win-hb-digestive">
      <div className="win-hb-digestive-container">
        <h2 className="win-hb-section-title">Digestive Wellness</h2>
        <div className="win-hb-digestive-grid">
          <ul className="win-hb-digestive-list">
            <li>Regular Bowels</li>
            <li>Coconut Fiber</li>
            <li>Better Digestion</li>
          </ul>
          <div className="win-hb-digestive-quote">
            <p>“With just one meal of WIN-DIA Coconut Flour Thins, many experience a noticeable improvement in bowel movement — leaving you feeling light, relieved, and ready to enjoy your entire day.”</p>
            <div className="win-hb-digestive-promise">WIN-DIA Digestive Promise</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GlycemicIndex() {
  return (
    <section className="win-hb-gi-section">
      <div className="win-hb-gi-container">
        <h2 className="win-hb-section-title">Understanding Glycemic Index</h2>
        <p className="win-hb-gi-subtitle">Why GI matters for your daily health choices</p>
        <div className="win-hb-gi-columns">
          {giComparison.map((item, idx) => (
            <div key={idx} className="win-hb-gi-card" style={{ borderTopColor: item.color }}>
              <div className="win-hb-gi-level">{item.level} GI {item.level === 'LOW' ? '≤ 55' : item.level === 'MEDIUM' ? '56-69' : '≥ 70'}</div>
              <div className="win-hb-gi-name">{item.name}</div>
              <div className="win-hb-gi-number">{item.gi}</div>
              <ul className="win-hb-gi-bullets">
                {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HealthGoals() {
  const [activeTab, setActiveTab] = useState('fitness');
  const content = healthGoalTabs[activeTab];
  return (
    <section className="win-hb-health-goals">
      <div className="win-hb-health-goals-container">
        <div className="win-hb-tabs-header">
          {Object.keys(healthGoalTabs).map(key => (
            <button key={key} className={`win-hb-tab-btn ${activeTab === key ? 'win-hb-active' : ''}`} onClick={() => setActiveTab(key)}>
              {healthGoalTabs[key].title}
            </button>
          ))}
        </div>
        <div className="win-hb-tab-content">
          <h3>{content.title}</h3>
          <ul>{content.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
          <p className="win-hb-tab-recommendation">{content.rec}</p>
        </div>
      </div>
    </section>
  );
}

function Ingredients() {
  return (
    <section className="win-hb-ingredients-section">
      <div className="win-hb-ingredients-container">
        <h2 className="win-hb-section-title">WHAT GOES INTO WIN-DIA</h2>
        <p className="win-hb-ingredients-subtitle">Pure ingredients. Powerful benefits.</p>
        <div className="win-hb-ingredients-grid">
          {ingredients.map((ing, idx) => (
            <AnimatedCard key={ing.name} direction={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 50}>
              <div className="win-hb-ingredient-card">
                <h4>{ing.name}</h4>
                <p className="win-hb-ing-role">{ing.role}</p>
                <p className="win-hb-ing-benefit">{ing.benefit}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function NutritionCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  const totalSlides = Math.ceil(nutritionData.length / cardsPerView);
  const visibleCards = nutritionData.slice(currentIndex * cardsPerView, (currentIndex + 1) * cardsPerView);
  const next = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  return (
    <section className="win-hb-nutrition-carousel-section">
      <div className="win-hb-carousel-container">
        <h2 className="win-hb-section-title">What is Inside Every Bite</h2>
        <p className="win-hb-carousel-subtitle">Swipe or use arrows to explore. Data verified per 100g by NABL lab.</p>
        <div className="win-hb-carousel-wrapper">
          <button className="win-hb-carousel-arrow win-hb-prev" onClick={prev} type="button">‹</button>
          <div className="win-hb-carousel-track">
            {visibleCards.map((item, i) => (
              <div key={item.label} className="win-hb-nutrition-card">
                <div className="win-hb-nc-label">{item.label}</div>
                <div className="win-hb-nc-value">{item.value}<span>{item.unit}</span></div>
                <div className="win-hb-nc-bar"><div className="win-hb-nc-fill" style={{ width: `${item.fill}%`, background: item.color }} /></div>
                <p className="win-hb-nc-note">{item.note}</p>
                {item.rda !== '—' && <span className="win-hb-nc-rda">{item.rda} daily requirement</span>}
              </div>
            ))}
          </div>
          <button className="win-hb-carousel-arrow win-hb-next" onClick={next} type="button">›</button>
        </div>
        <div className="win-hb-carousel-dots">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button key={i} className={`win-hb-dot ${i === currentIndex ? 'win-hb-active' : ''}`} onClick={() => setCurrentIndex(i)} type="button" />
          ))}
        </div>
      </div>
    </section>
  );
}

function BloodSugarComparison() {
  const [selectedFood, setSelectedFood] = useState(0);
  return (
    <section className="win-hb-blood-sugar-section">
      <div className="win-hb-blood-sugar-split">
        <div className="win-hb-blood-sugar-left">
          <div className="win-hb-translucent-card">
<h2 className="win-hb-blood-title">
  How Food Affects<br />Your Blood Sugar
</h2>
            <div className="win-hb-step-list">
              <div className="win-hb-step"><span>01</span> You eat carbohydrates → broken down into glucose</div>
              <div className="win-hb-step"><span>02</span> Glucose enters your blood → speed depends on fiber and processing</div>
              <div className="win-hb-step"><span>03</span> Speed determines GI score → below 55 = slow release, stable energy</div>
            </div>
            <div className="win-hb-gi-badge">WIN-DIA GI = 44 — certified LOW</div>
          </div>
        </div>
        <div className="win-hb-blood-sugar-right">
          <div className="win-hb-translucent-card">
            <h3>Live Comparison<br />WIN-DIA vs Common Foods</h3>
            <div className="win-hb-comparison-list">
              {comparisonFoods.map((food, idx) => (
                <div key={food.name} className={`win-hb-comparison-row ${selectedFood === idx ? 'win-hb-active' : ''}`} onClick={() => setSelectedFood(idx)}>
                  <span className="win-hb-food-name">{food.name}</span>
                  <div className="win-hb-gi-bar-bg"><div className="win-hb-gi-bar" style={{ width: `${food.gi}%`, background: food.level === 'LOW' ? '#2D6A4F' : food.level === 'MEDIUM' ? '#D4A373' : '#E86A4A' }} /></div>
                  <span className="win-hb-gi-value">{food.gi}</span>
                  <span className={`win-hb-gi-level ${food.level.toLowerCase()}`}>{food.level}</span>
                </div>
              ))}
            </div>
            {selectedFood > 0 && <div className="win-hb-insight">WIN-DIA is {comparisonFoods[selectedFood].gi - 44} points lower than {comparisonFoods[selectedFood].name}</div>}
            <div className="win-hb-legend"><span className="win-hb-low-dot"></span> Low (&lt;55) <span className="win-hb-med-dot"></span> Medium (56-69) <span className="win-hb-high-dot"></span> High (≥70)</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="win-hb-how-it-works">
      <div className="win-hb-hiw-container">
        <h2 className="win-hb-section-title">How WIN-DIA Works for You</h2>
        <div className="win-hb-hiw-grid">
          <div className="win-hb-hiw-panel">
            <div className="win-hb-hiw-label">What the Lab Tests Show</div>
            {medicinalValues.map((item, i) => (
              <AnimatedCard key={item.title} direction="left" delay={i * 80}>
                <div className="win-hb-hiw-card">
                  <div className="win-hb-hiw-card-header"><strong>{item.title}</strong><span className="win-hb-metric">{item.metric}</span></div>
                  <p>{item.detail}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
          <div className="win-hb-hiw-panel">
            <div className="win-hb-hiw-label">What You Will Feel Daily</div>
            {feelBenefits.map((item, i) => (
              <AnimatedCard key={item.title} direction="right" delay={i * 80}>
                <div className="win-hb-hiw-card">
                  <div className="win-hb-hiw-card-header"><strong>{item.title}</strong><span className="win-hb-tag">{item.tag}</span></div>
                  <p>{item.detail}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="win-hb-faq-section">
      <div className="win-hb-faq-split">
        <div className="win-hb-faq-left">
          <h2>Frequently<br />Asked</h2>
          <p>If your question is not answered here, reach us directly — we will respond with the actual lab data.</p>
        </div>
        <div className="win-hb-faq-right">
          {faqs.map((faq, idx) => (
            <div key={faq.q} className={`win-hb-faq-item ${openIndex === idx ? 'win-hb-open' : ''}`}>
              <button className="win-hb-faq-question" onClick={() => setOpenIndex(openIndex === idx ? null : idx)} type="button">
                {faq.q}
                <span className="win-hb-faq-icon">{openIndex === idx ? '−' : '+'}</span>
              </button>
              <div className="win-hb-faq-answer"><p>{faq.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarqueeCTA() {
  return (
    <div className="win-hb-marquee-container">
      <div className="win-hb-marquee">
        <div className="win-hb-marquee-content">
          Not Just a Label. A Real Difference. WIN-DIA exists because snacking should work with your body — not against it. Every batch tested. Every claim verified.
          <span className="win-hb-marquee-spacer">✦</span>
          Not Just a Label. A Real Difference. WIN-DIA exists because snacking should work with your body — not against it. Every batch tested. Every claim verified.
          <span className="win-hb-marquee-spacer">✦</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────
function HealthBenefits() {
  return (
    <div className="win-hb-app">
      <HeroSection />
      <StatsRow />
      <DigestiveWellness />
      <GlycemicIndex />
      <HealthGoals />
      <Ingredients />
      <NutritionCarousel />
      <BloodSugarComparison />
      <HowItWorks />
      <FAQ />
      <MarqueeCTA />
    </div>
  );
}

export default HealthBenefits;