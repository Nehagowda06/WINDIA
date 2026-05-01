import React from 'react';
import { motion } from 'framer-motion';
import {
  FiGlobe,
  FiTrendingUp,
  FiHeart,
  FiZap,
  FiArrowRight,
  FiPackage,
  FiUsers,
  FiAward,
  FiTarget,
  FiChevronRight,
  FiBriefcase,
  FiMapPin
} from 'react-icons/fi';
import './Vision.css';

const Vision = () => {
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.1, 1] } 
    }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.1, 1] } 
    }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.1, 1] } 
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
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
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const visionPillars = [
    { 
      icon: FiGlobe, 
      title: "Global Reach", 
      desc: "Bringing Indian wellness ideas to broader markets around the world",
      color: "#E86A4A"
    },
    { 
      icon: FiZap, 
      title: "Innovation", 
      desc: "Continuous development with food science backing and CFTRI collaboration",
      color: "#2D6A4F"
    },
    { 
      icon: FiHeart, 
      title: "Health Impact", 
      desc: "Supporting better digestion and mindful eating through functional nutrition",
      color: "#D4A373"
    },
    { 
      icon: FiTrendingUp, 
      title: "Scale", 
      desc: "Building a trusted wellness brand rooted in traditional Indian wisdom",
      color: "#E86A4A"
    }
  ];

  const roadmap = [
    { year: "2024", title: "Foundation", desc: "Early stage growth and market presence" },
    { year: "2025", title: "Growth", desc: "Product expansion begins across India" },
    { year: "2026", title: "Expansion", desc: "Planned entry into global markets" },
    { year: "2028", title: "Leadership", desc: "Strong category presence in wellness" },
    { year: "2030", title: "Vision", desc: "Global wellness positioning" }
  ];

  const productPipeline = [
    { 
      phase: "Phase 1 — Available Now", 
      products: ["Coconut Khakhra", "Coconut flour base"],
      isCurrent: true
    },
    { 
      phase: "Phase 2 — In Development", 
      products: ["High-fiber pasta", "Protein noodles", "Pizza base"],
      isCurrent: false
    },
    { 
      phase: "Phase 3 — Planned Expansion", 
      products: ["Functional biscuits", "Ready-to-eat rice", "Snack bars"],
      isCurrent: false
    },
    { 
      phase: "Phase 4 — Future Innovation", 
      products: ["Advanced CFTRI-based products", "Global snack formats", "Wellness combinations"],
      isCurrent: false
    }
  ];

 const globalMarkets = [
  { region: "Middle East", type: "middle-east", status: "Planned expansion" },
  { region: "Southeast Asia", type: "asia", status: "Market research phase" },
  { region: "Europe", type: "europe", status: "Future consideration" },
  { region: "North America", type: "america", status: "Long-term goal" }
];

  const trustStrengths = [
    { icon: FiBriefcase, title: "Founder Experience", desc: "19+ years of entrepreneurial experience" },
    { icon: FiAward, title: "Science-Backed", desc: "CFTRI collaboration for product development" },
    { icon: FiTarget, title: "Product Differentiation", desc: "Coconut-based innovation rooted in tradition" }
  ];

  return (
    <div className="vision-page">
      {/* ========== HERO SECTION ========== */}
      <motion.section 
        className="hero-vision-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="hero-bg-vision"></div>
        <div className="hero-overlay-vision">
          <div className="hero-content-vision">
            <motion.span 
              className="hero-label-vision"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Our Vision
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Building the Future of <br />
              <span className="highlight-vision">Conscious Snacking</span>
            </motion.h1>
            <motion.p
              className="hero-subtitle-vision"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Rooted in traditional Indian wisdom. Refined through modern food science.<br />
              Committed to a healthier, more mindful tomorrow.
            </motion.p>
          </div>
        </div>
        
      </motion.section>

      {/* ========== NORTH STAR ========== */}
      <section className="north-star-page">
        <div className="container-vision">
          <motion.div 
            className="north-star-content"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="star-icon"></div>
            <h2>Our North Star</h2>
            <div className="north-star-quote">
              "To transform snacking into a daily ritual of wellness."
            </div>
            <p>Guiding every product and decision at WIN-DIA</p>
          </motion.div>
        </div>
      </section>

      {/* ========== VISION PILLARS ========== */}
      <section className="pillars-page">
        <div className="container-vision">
          <motion.div 
            className="section-header-vision"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-label-vision">Our Framework</span>
            <h2>Vision Pillars</h2>
            <p>Four pillars supporting our mission to revolutionize snacking</p>
          </motion.div>

          <motion.div 
            className="pillars-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {visionPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div 
                  className="pillar-card"
                  key={idx}
                  variants={scaleIn}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div className="pillar-icon" style={{ background: `linear-gradient(135deg, ${pillar.color}, ${pillar.color}dd)` }}>
                    <Icon />
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== ROADMAP ========== */}
      <section className="roadmap-page alt-bg-vision">
        <div className="container-vision">
          <motion.div 
            className="section-header-vision"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-label-vision">The Path Forward</span>
            <h2>Our Roadmap</h2>
            <p>This roadmap reflects our future vision and direction</p>
          </motion.div>

          <div className="roadmap-container">
            <div className="roadmap-line"></div>
            {roadmap.map((item, idx) => (
              <motion.div 
                className="roadmap-item"
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
              >
                <div className="roadmap-year">{item.year}</div>
                <div className="roadmap-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRODUCT PIPELINE ========== */}
      <section className="pipeline-page">
        <div className="container-vision">
          <motion.div 
            className="section-header-vision"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-label-vision">Innovation Pipeline</span>
            <h2>Products of Tomorrow</h2>
            <p>All products are rooted in traditional wisdom and refined through food science</p>
          </motion.div>

          <div className="pipeline-grid">
            {productPipeline.map((phase, idx) => (
              <motion.div 
                className={`pipeline-card ${phase.isCurrent ? 'current' : ''}`}
                key={idx}
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="pipeline-phase">
                  <span className="phase-badge">{phase.phase}</span>
                </div>
                <div className="pipeline-products">
                  {phase.products.map((product, pIdx) => (
                    <div className="product-tag" key={pIdx}>
                      <FiPackage className="product-icon-small" />
                      <span>{product}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== GLOBAL EXPANSION ========== */}
      <section className="global-page alt-bg-vision">
        <div className="container-vision">
          <motion.div 
            className="section-header-vision"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-label-vision">Global Ambition</span>
            <h2>Planned Global Presence</h2>
            <p>These regions represent planned expansion goals</p>
          </motion.div>

          <div className="global-grid">
            {globalMarkets.map((market, idx) => (
              <motion.div 
                className="global-card"
                key={idx}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="global-flag">{market.flag}</div>
                <h3>{market.region}</h3>
                <span className="global-status">{market.status}</span>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="global-note"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p>🌍 WIN-DIA aims to bring Indian wellness wisdom to wellness-conscious consumers worldwide</p>
          </motion.div>
        </div>
      </section>

      {/* ========== TRUST / STRENGTHS ========== */}
      <section className="trust-page alt-bg-vision">
        <div className="container-vision">
          <motion.div 
            className="section-header-vision"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-label-vision">Our Foundation</span>
            <h2>Built on Trust</h2>
            <p>The strengths that guide our journey</p>
          </motion.div>

          <div className="trust-grid">
            {trustStrengths.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  className="trust-card"
                  key={idx}
                  variants={fadeLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="trust-icon">
                    <Icon />
                  </div>
                  <div className="trust-text">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            className="recognition-note"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="recognition-badges">
              <span>Startup Karnataka Recognition</span>
              <span> DST-iTBI Support</span>
              <span>CFTRI Collaboration</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="final-cta-vision">
        <div className="container-vision">
          <motion.div 
            className="cta-content-vision"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Be Part of the <span>Future of Wellness</span></h2>
            <p>Join us in building a world where every snack nourishes both body and tradition</p>
            <div className="cta-buttons-vision">
              <button className="cta-primary-vision">Shop Now <FiArrowRight /></button>
              <button className="cta-secondary-vision">Partner With Us <FiChevronRight /></button>
              <button className="cta-secondary-vision">Join Our Team <FiUsers /></button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Vision;