// OurStory.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  FiHeart,
  FiStar,
  FiTrendingUp,
  FiFeather,
  FiShield,
  FiArrowRight,
  FiCheckCircle,
  FiXCircle,
  FiAward,
  FiZap,
  FiPackage,
  FiChevronRight
} from 'react-icons/fi';
import './OurStory.css';

const OurStory = () => {
  // Scroll reveal animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.1, 1] } 
    }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.1, 1] } 
    }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.1, 1] } 
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.1, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };

  const benefits = [
    { text: "Aids Digestion", icon: "✓" },
    { text: "Boosts Immunity", icon: "✓" },
    { text: "Enhances Skin Health", icon: "✓" },
    { text: "Supports Heart Health", icon: "✓" },
    { text: "Improves Mental Clarity", icon: "✓" }
  ];

  const modernProblems = [
    { text: "Digestive issues affecting 70% of Indians", icon: "✕" },
    { text: "Processed food addiction", icon: "✕" },
    { text: "Chronic stress & lifestyle imbalance", icon: "✕" },
    { text: "Poor snacking habits from childhood", icon: "✕" }
  ];

  const innovationCards = [
    {
      icon: FiFeather,
      title: "Ingredient Innovation",
      desc: "Using coconut flour — a by-product usually discarded — to create nutritious, gluten-free snacks.",
      detail: "Circular economy in action"
    },
    {
      icon: FiTrendingUp,
      title: "Health Formulation",
      desc: "Low Glycemic Index (GI = 44), high fiber, and protein-rich formula validated by NABL labs.",
      detail: "Science-backed nutrition"
    },
    {
      icon: FiPackage,
      title: "Shelf-Life Technology",
      desc: "Vacuum packaging and proprietary dehydration protocols extend freshness without preservatives.",
      detail: "Clean label promise"
    }
  ];

  const values = [
    { icon: FiFeather, title: "Authenticity", desc: "Ancient wisdom, modern science" },
    { icon: FiZap, title: "Science-backed", desc: "Validated by food experts" },
    { icon: FiShield, title: "Transparency", desc: "Clear ingredients, honest labels" },
    { icon: FiHeart, title: "Sustainability", desc: "Circular economy approach" },
    { icon: FiTrendingUp, title: "Gut Health First", desc: "Every bite supports digestion" },
    { icon: FiStar, title: "Excellence", desc: "No compromise, ever" }
  ];

  const recognitions = [
    { name: "Startup Karnataka", category: "KTech Elevate Winner", icon: FiAward },
    { name: "DST-iTBI", category: "Technology Incubator", icon: FiAward },
    { name: "CFTRI", category: "Scientific Collaboration", icon: FiAward },
    { name: "FSSAI", category: "Domestic Compliance", icon: FiShield }
  ];

  const timeline = [
    { year: "2019", title: "The Idea", desc: "Identifying the gap in healthy snacking" },
    { year: "2021", title: "R&D Phase", desc: "Collaborating with CFTRI food scientists" },
    { year: "2022", title: "Production", desc: "First batch of coconut khakhra" },
    { year: "2023", title: "Launch", desc: "WIN-DIA enters the market" },
    { year: "2024", title: "Recognition", desc: "KTech Elevate Winner" },
    { year: "Future", title: "Expansion", desc: "Global wellness movement" }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="our-story-page">
      {/* ========== HERO SECTION ========== */}
      <motion.section 
        className="story-hero-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="story-hero-overlay-page">
          <div className="story-hero-content-page">
            <motion.span 
              className="story-hero-label-page"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Our Heritage
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              From Sacred Offering <br />to <span className="story-highlight-page">Modern Wellness</span>
            </motion.h1>
            <motion.p
              className="story-hero-subtitle-page"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Ancient wisdom meets modern science — rediscovering the divine gift of coconut <br />
              for a healthier, happier India.
            </motion.p>
            <motion.button
              className="story-cta-primary-page"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              onClick={() => scrollToSection('story-chapter1')}
            >
              Read Our Journey <FiArrowRight />
            </motion.button>
          </div>
        </div>
        <div className="story-hero-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="story-scroll-line"></div>
        </div>
      </motion.section>

      {/* ========== CHAPTER 1: ANCIENT WISDOM ========== */}
      <section id="story-chapter1" className="story-chapter-page">
        <div className="story-container-page">
          <div className="story-chapter-grid">
            <motion.div 
              className="story-chapter-content"
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <span className="story-chapter-label">Chapter 01</span>
              <h2>The Sacred Coconut</h2>
              <p>
                In ancient India, the coconut wasn't just food — it was divine. Revered as a pure 
                offering to the gods, it symbolized nourishment, fertility, and prosperity. 
                Temples across the land accepted coconuts as sacred gifts, believing they carried 
                blessings from above.
              </p>
              <div className="story-highlight-quote">
                <span className="story-quote-mark">"</span>
                This wasn't just ritual — it was wisdom.
                <span className="story-quote-mark">"</span>
              </div>
              <p>
                Our ancestors understood what modern science is only now rediscovering: the coconut 
                is a nutritional powerhouse that supports digestion, immunity, heart health, and 
                mental clarity.
              </p>
              <div className="story-benefits-grid-page">
                {benefits.map((benefit, idx) => (
                  <div className="story-benefit-item-page" key={idx}>
                    <FiCheckCircle className="story-benefit-check-page" />
                    <span>{benefit.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              className="story-chapter-image story-sacred-image"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="story-image-overlay-page">
                <div className="story-floating-coconut">🥥</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== CHAPTER 2: THE MODERN PROBLEM ========== */}
      <section className="story-chapter-page story-alt-bg">
        <div className="story-container-page">
          <div className="story-chapter-grid story-reverse">
            <motion.div 
              className="story-chapter-content"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <span className="story-chapter-label">Chapter 02</span>
              <h2>The Lost Connection</h2>
              <p>
                Somewhere between ancient wisdom and modern convenience, we lost our way. Fast food 
                replaced home-cooked meals. Processed snacks replaced wholesome bites. And a generation 
                grew up disconnected from what real food feels like.
              </p>
              <div className="story-problems-list-page">
                {modernProblems.map((problem, idx) => (
                  <div className="story-problem-item-page" key={idx}>
                    <FiXCircle className="story-problem-cross-page" />
                    <span>{problem.text}</span>
                  </div>
                ))}
              </div>
              <div className="story-emotional-connect">
                The result? Rising digestive issues, lifestyle diseases, and a generation that 
                has forgotten the taste of real nutrition.
              </div>
            </motion.div>
            <motion.div 
              className="story-chapter-image story-modern-image"
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="story-image-overlay-page">
                <div className="story-floating-warning">⚠️</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== CHAPTER 3: THE AWAKENING (FOUNDERS) ========== */}
      <section className="story-founders-chapter">
        <div className="story-container-page">
          <motion.div 
            className="story-section-header-page"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="story-chapter-label">Chapter 03</span>
            <h2>The Awakening</h2>
            <p>Two visionaries. One mission.</p>
          </motion.div>

          <div className="story-founders-story-container">
            <motion.div 
              className="story-founder-narrative"
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="story-narrative-quote">
                <span className="story-quote-mark-large">"</span>
                What if snacking could heal instead of harm?
                <span className="story-quote-mark-large">"</span>
              </div>
              <p>
                This simple question sparked a movement. Smt. G. Tejaswini, a seasoned entrepreneur 
                with 19+ years of experience, saw her own family struggle with digestive issues. 
                She knew there had to be a better way.
              </p>
              <p>
                She joined forces with a visionary food scientist — someone who shared her passion 
                for bringing ancient Indian wisdom back to the table through modern food science.
              </p>
              <div className="story-narrative-conclusion">
                Together, they built WIN-DIA: a brand where business vision meets scientific innovation.
              </div>
            </motion.div>

            <div className="story-founders-grid-page">
              <motion.div 
                className="story-founder-card-page"
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
              >
                <div className="story-founder-avatar">
                  <span>👩‍💼</span>
                  <div className="story-avatar-glow"></div>
                </div>
                <h3>Smt. G. Tejaswini</h3>
                <span className="story-founder-role-page">Founder & CEO</span>
                <p className="story-founder-bio">
                  B.E. graduate with 19+ years as an IOCL dealer (₹24 Cr turnover). 
                  Selected under Startup Karnataka KTech Elevate Winners and supported by DST-iTBI.
                </p>
                <div className="story-founder-traits">
                  <span>🏆 Business Vision</span>
                  <span>⚡ Strategic Leadership</span>
                  <span>🌟 Startup Winner</span>
                </div>
                <div className="story-founder-quote-small">
                  "I built WIN-DIA to bring real nutrition back to every Indian household."
                </div>
              </motion.div>

              <motion.div 
                className="story-founder-card-page"
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
              >
                <div className="story-founder-avatar">
                  <span>👨‍💼</span>
                  <div className="story-avatar-glow"></div>
                </div>
                <h3>Teni Shridhar</h3>
                <span className="story-founder-role-page">Head of Innovation</span>
                <p className="story-founder-bio">
                  Food scientist and wellness expert with deep expertise in functional ingredients 
                  and product development. Associated with CFTRI collaboration.
                </p>
                <div className="story-founder-traits">
                  <span>🔬 Scientific Innovation</span>
                  <span>🧪 Product Formulation</span>
                  <span>📊 Research Excellence</span>
                </div>
                <div className="story-founder-quote-small">
                  "Science validates what our ancestors always knew — food is medicine."
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CHAPTER 4: INNOVATION ========== */}
      <section className="story-chapter-page story-alt-bg">
        <div className="story-container-page">
          <motion.div 
            className="story-section-header-page"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="story-chapter-label">Chapter 04</span>
            <h2>The Innovation</h2>
            <p>Where tradition meets food science</p>
          </motion.div>
          <div className="story-kakra-art"></div>
          <motion.div 
            className="story-innovation-grid-page"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {innovationCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div 
                  className="story-innovation-card"
                  key={idx}
                  variants={scaleIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="story-innovation-icon">
                    <Icon />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <div className="story-innovation-detail">{card.detail}</div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div 
            className="story-cftri-badge"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span>✨ Developed with guidance from CFTRI food scientists (15+ years experience)</span>
          </motion.div>
        </div>
      </section>

      {/* ========== NAME SECTION ========== */}
      <section className="story-name-section">
        <div className="story-container-page">
          <div className="story-name-showcase">
            <motion.div 
              className="story-name-card"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ x: 12, transition: { duration: 0.3 } }}
            >
              <div className="story-name-icon"></div>
              <div className="story-name-text">
                <span className="story-name-word">WIN</span>
                <span className="story-name-source">Strength & Victory</span>
                <p>Derived from ancient Indian heritage — symbolizing <strong>strength, stability, and timeless wisdom</strong></p>
              </div>
            </motion.div>

            <motion.div 
              className="story-name-card"
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ x: -12, transition: { duration: 0.3 } }}
            >
              <div className="story-name-icon"></div>
              <div className="story-name-text">
                <span className="story-name-word">DIA</span>
                <span className="story-name-source">Light & New Beginning</span>
                <p>Meaning sunrise — representing <strong>renewal, growth, and a new dawn of wellness</strong></p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="story-combined-meaning-page"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="story-combined-symbol"></div>
            <h3>Ancient Strength + New Beginning</h3>
            <div className="story-tagline-gold">"WIN-DIA for dine keeps the gut in line"</div>
            <p className="story-meaning-summary">The victory of timeless wisdom meeting a new dawn of modern wellness.</p>
          </motion.div>
        </div>
      </section>

      {/* ========== TIMELINE ========== */}
      <section className="story-timeline-page story-alt-bg">
        <div className="story-container-page">
          <motion.div 
            className="story-section-header-page"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="story-section-label-page">Our Journey</span>
            <h2>From Idea to Impact</h2>
          </motion.div>

          <div className="story-timeline-container">
            <div className="story-timeline-line"></div>
            {timeline.map((item, idx) => (
              <motion.div 
                className="story-timeline-item"
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="story-timeline-dot"></div>
                <div className="story-timeline-year">{item.year}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== VALUES GRID ========== */}
      <section className="story-values-page">
        <div className="story-container-page">
          <motion.div 
            className="story-section-header-page"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="story-section-label-page">What We Believe</span>
            <h2>Our Core Values</h2>
          </motion.div>

          <motion.div 
            className="story-values-grid-page"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  className="story-value-card-page"
                  key={idx}
                  variants={scaleIn}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <div className="story-value-icon-page">
                    <Icon />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== RECOGNITION ========== */}
      <section className="story-recognition-page story-alt-bg">
        <div className="story-container-page">
          <motion.div 
            className="story-section-header-page"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="story-section-label-page">Trust & Credibility</span>
            <h2>Recognized By</h2>
          </motion.div>

          <motion.div 
            className="story-recognition-grid-page"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {recognitions.map((rec, idx) => {
              const Icon = rec.icon;
              return (
                <motion.div 
                  className="story-recognition-card"
                  key={idx}
                  variants={scaleIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Icon className="story-recognition-icon" />
                  <h4>{rec.name}</h4>
                  <p>{rec.category}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== FOUNDER MESSAGE ========== */}
      <section className="story-founder-message-page">
        <div className="story-container-page">
          <motion.div 
            className="story-message-card"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="story-message-icon">
              <div className="story-founder-seal"></div>
            </div>
            <span className="story-message-label">A Letter from the Founder</span>
            <h2>Built on Trust, Delivered with Purpose</h2>
            <div className="story-message-content">
              <p>
                Dear wellness seeker,
              </p>
              <p>
                When I started this journey, I had one simple belief: food should heal, not harm. 
                Watching my own family struggle with digestive issues made me realize that we've 
                drifted too far from our roots.
              </p>
              <p>
                WIN-DIA is my tribute to my grandmother's wisdom — the same wisdom that kept our 
                ancestors healthy for generations. It's my promise to bring back real, wholesome 
                nutrition in a form that fits your busy modern life.
              </p>
              <p>
                Every product we make is crafted with love, backed by science, and tested for quality. 
                Because you deserve better. Your family deserves better.
              </p>
              <div className="story-message-signature">
                With gratitude,<br />
                <strong>Smt. G. Tejaswini</strong><br />
                Founder & CEO, WIN-DIA
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="story-final-cta-page">
        <div className="story-container-page">
          <motion.div 
            className="story-cta-content-page"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Be Part of Our Story</h2>
            <p>Join the movement that's redefining Indian snacking — one gut-friendly bite at a time.</p>
            <div className="story-cta-buttons-page">
              <button className="story-cta-primary-page story-large">Shop Now <FiArrowRight /></button>
              <button className="story-cta-secondary-page">Explore Products <FiChevronRight /></button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;