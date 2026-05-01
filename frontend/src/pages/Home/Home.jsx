import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Newsletter from '../../components/Newsletter/Newsletter';
import { fetchProducts } from '../../redux/actions/productActions';
import './Home.css';

// Image Imports (Production ready with fallbacks)
const heroImage = "/images/hero-khakhra.png";
const heritageFarm = "/images/coconut-farm.png";
const heritageFactory = "/images/factory.png";
const founderPhoto = "/images/founder.png";

const process1 = "/images/process-farm.png";
const process2 = "/images/process-extraction.png";
const process3 = "/images/process-flour.png";
const process4 = "/images/process-roasting.png";
const process5 = "/images/process-quality.png";
const process6 = "/images/process-packaging.png";

const productCurry = "/images/curry leaves.jpg";
const productMethi = "/images/product-methi.png";
const productGarlic = "/images/product-garlic.png";
const productMoringa = "/images/product-moringa.png";

const insta1 = "/images/insta-1.png";
const insta2 = "/images/insta-2.png";
const insta3 = "/images/insta-3.png";
const insta4 = "/images/insta-4.png";
const insta5 = "/images/insta-5.png";
const insta6 = "/images/insta-6.png";

const startupKarnatakaLogo = "/images/startup-karnataka.png";
const yourStoryLogo = "/images/your-story.png";
const theHinduLogo = "/images/the-hindu.png";
const economicTimesLogo = "/images/economic-times.png";
const foodProcessLogo = "/images/food-process.png";
const healthTodayLogo = "/images/health-today.png";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [cookieVisible, setCookieVisible] = useState(true);
  const [wishlist, setWishlist] = useState({});
  const [cartNotifications, setCartNotifications] = useState({});
  const observerRef = useRef(null);
  const testimonialIntervalRef = useRef(null);

  // Product data with stable IDs
  const productsData = [
    { id: 1, name: 'Curry Leaves Khakhra', description: 'Iron-rich, aromatic curry leaves for daily wellness', price: 215, originalPrice: 250, image: productCurry, inStock: true, lowGI: true, glutenFree: true, vegan: true },
    { id: 2, name: 'Methi Khakhra', description: 'Digestive wellness with traditional methi goodness', price: 215, originalPrice: 250, image: productMethi, inStock: true, lowGI: true, glutenFree: true, vegan: true },
    { id: 3, name: 'Garlic Khakhra', description: 'Savory garlic flavor for guilt-free snacking', price: 215, originalPrice: 250, image: productGarlic, inStock: true, lowGI: true, glutenFree: true, vegan: true },
    { id: 4, name: 'Moringa Khakhra', description: 'Superfood moringa for immunity and vitality', price: 215, originalPrice: 250, image: productMoringa, inStock: true, lowGI: true, glutenFree: true, vegan: true }
  ];

  const processSteps = [
    { image: process1, title: 'Premium Coconut Farms', description: 'Sourced from the finest coconut farms in Karnataka' },
    { image: process2, title: 'Cold-Pressed Extraction', description: 'Preserving every nutrient and natural coconut essence' },
    { image: process3, title: 'Nutrient-Rich Flour', description: 'Transforming by-product into protein-rich coconut flour' },
    { image: process4, title: 'Traditional Roasting', description: 'Artisanal techniques passed down through generations' },
    { image: process5, title: 'Quality Assurance', description: 'Rigorously tested in NABL-accredited laboratories' },
    { image: process6, title: 'Premium Packaging', description: 'Vacuum-sealed to lock in freshness and crispness' }
  ];

  const testimonials = [
    { id: 1, name: 'Anjali Sharma', location: 'Delhi', text: 'After years of digestive issues, WIN-DIA khakhras have been a game-changer. Light, crispy, and actually healthy!', rating: 5 },
    { id: 2, name: 'Rajesh Mehta', location: 'Mumbai', text: 'My father is diabetic and loves these. Low GI means he can enjoy them without worry.', rating: 5 },
    { id: 3, name: 'Priya Nair', location: 'Bengaluru', text: 'Finally a gluten-free snack that tastes amazing. The moringa flavor is my absolute favorite!', rating: 5 }
  ];

  const featuredLogos = [
    { name: 'Startup Karnataka', logo: startupKarnatakaLogo },
    { name: 'Your Story', logo: yourStoryLogo },
    { name: 'The Hindu', logo: theHinduLogo },
    { name: 'Economic Times', logo: economicTimesLogo },
    { name: 'Food Process', logo: foodProcessLogo },
    { name: 'Health Today', logo: healthTodayLogo }
  ];

  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => ({ ...prev, [productId]: !prev[productId] }));
    const updatedWishlist = { ...wishlist, [productId]: !wishlist[productId] };
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  }, [wishlist]);

  const addToCart = useCallback((productId, productName) => {
    setCartNotifications(prev => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setCartNotifications(prev => ({ ...prev, [productId]: false }));
    }, 2000);
    console.log(`Added product ${productId} to cart`);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const acceptCookies = useCallback(() => {
    localStorage.setItem('cookieConsent', 'true');
    setCookieVisible(false);
  }, []);

  // Setup intersection observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerRef.current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.home .fade-up, .home .fade-left, .home .fade-right').forEach(el => {
      observerRef.current.observe(el);
    });
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Handle scroll events for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    testimonialIntervalRef.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => {
      if (testimonialIntervalRef.current) {
        clearInterval(testimonialIntervalRef.current);
      }
    };
  }, [testimonials.length]);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent) {
      setCookieVisible(false);
    }
  }, []);

  // Fetch products from API
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="home">
      {/* Announcement Bar */}
      {announcementVisible && (
        <div className="announcement-bar" role="alert">
          <div className="announcement-content">
            <span className="announcement-text">Free Shipping on orders above ₹499 | Use code: WINDIA10 for 10% off first order</span>
            <button 
              className="announcement-close" 
              onClick={() => setAnnouncementVisible(false)}
              aria-label="Close announcement"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero" aria-label="Hero section">
        <div className="hero-bg">
          <div className="hero-bg-image" role="presentation"></div>
          <div className="hero-bg-overlay" role="presentation"></div>
        </div>
        <div className="hero-container">
          <div className="hero-content fade-left">
            <span className="hero-badge">Ancient Wisdom • Modern Wellness</span>
            <h1 className="hero-title">
              Coconut-Infused<br />
              <span>THINS</span>
            </h1>
            <p className="hero-description">
              Experience the perfect blend of tradition and nutrition. Our coconut flour khakhras 
              are crafted to nourish your body and delight your taste buds.
            </p>
            <div className="hero-buttons">
              <Link to="/shop" className="btn-primary">Shop Now</Link>
              <Link to="/our-story" className="btn-outline">Our Story</Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">44</span>
                <span className="stat-label">Glycemic Index</span>
              </div>
              <div className="stat">
                <span className="stat-value">4.85g</span>
                <span className="stat-label">Dietary Fiber</span>
              </div>
              <div className="stat">
                <span className="stat-value">22g</span>
                <span className="stat-label">Plant Protein</span>
              </div>
            </div>
          </div>
          <div className="hero-image fade-right">
            <div className="hero-image-wrapper">
              {/* Hero image would go here */}
            </div>
          </div>
        </div>
        <div className="hero-wave" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" 
                  fill="#FDF3E8"></path>
          </svg>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="global-reach" aria-label="Global reach section">
        <div className="global-bg" role="presentation"></div>
        <div className="container">
          <div className="global-content fade-up">
            <h2>From You,<br />to Anywhere in the World</h2>
            <p>Love knows no borders with WIN-DIA — now delivering worldwide</p>
            <div className="global-buttons">
              <Link to="/shop" className="btn-white">Shop India</Link>
              <Link to="/international" className="btn-white-outline">International</Link>
              <Link to="/corporate" className="btn-white-outline">Festive Gifting</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="heritage" aria-label="Heritage section">
        <div className="container">
          <div className="heritage-grid">
            <div className="heritage-text fade-left">
              <span className="section-label">Our Heritage</span>
              <h2>From Ancient Wisdom<br />to Modern Wellness</h2>
              <p className="heritage-lead">In ancient cultures, coconut was considered a divine gift, revered for its purity and symbolic connection to the gods.</p>
              <p>They used coconut as offerings to ensure everyone consumed this amazing fruit. Today, we're reviving this sacred wisdom. WIN-DIA bridges the gap between traditional knowledge and modern nutritional science.</p>
              <div className="heritage-checklist">
                <div className="check-item">100% Natural Ingredients</div>
                <div className="check-item">Traditional Roasting Methods</div>
                <div className="check-item">No Artificial Preservatives</div>
              </div>
              <Link to="/our-story" className="btn-secondary">Discover Our Story</Link>
            </div>
            <div className="heritage-images fade-right">
              <div className="heritage-image-stack">
                <img src={heritageFarm} alt="Coconut Farm" className="heritage-img-main" loading="lazy" />
                <img src={heritageFactory} alt="Production Facility" className="heritage-img-overlay" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section - 3 Benefit Cards */}
      <section className="benefits" aria-label="Benefits section">
        <div className="benefits-bg" role="presentation"></div>
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-label">Why Choose WIN-DIA</span>
            <h2>Experience the Difference</h2>
            <p className="section-subtitle">Scientifically formulated coconut flour khakhras for your wellness journey</p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card fade-up">
              <div className="benefit-orb" role="presentation"></div>
              <span className="benefit-chip">Gut Balance</span>
              <div className="benefit-stat-wrap">
                <div className="benefit-stat">4.85g</div>
                <div className="benefit-stat-label">Dietary Fiber</div>
              </div>
              <h3>Improves Digestion</h3>
              <p>High fiber content promotes healthy gut function and regular bowel movements</p>
              <div className="benefit-footer">Light crunch, easy digestion</div>
            </div>
            <div className="benefit-card fade-up">
              <div className="benefit-orb" role="presentation"></div>
              <span className="benefit-chip">Steady Energy</span>
              <div className="benefit-stat-wrap">
                <div className="benefit-stat">44</div>
                <div className="benefit-stat-label">Glycemic Index</div>
              </div>
              <h3>Blood Sugar Friendly</h3>
              <p>Low GI value makes it perfect for diabetes management and steady energy</p>
              <div className="benefit-footer">Feel-good snacking without spikes</div>
            </div>
            <div className="benefit-card fade-up">
              <div className="benefit-orb" role="presentation"></div>
              <span className="benefit-chip">Longer Fullness</span>
              <div className="benefit-stat-wrap">
                <div className="benefit-stat">22g</div>
                <div className="benefit-stat-label">Plant Protein</div>
              </div>
              <h3>High Protein Content</h3>
              <p>Keeps you energized and satisfied throughout the day, curbing unhealthy cravings</p>
              <div className="benefit-footer">Perfect for busy mornings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution Split Section */}
      <section className="problem-solution" aria-label="Problem and solution section">
        <div className="container">
          <div className="split-grid">
            <div className="problem-card fade-left">
              <div className="card-badge">Problem</div>
              <h3>The Modern Diet Crisis</h3>
              <p>Today's market is flooded with products claiming to be healthy, but most are processed with hidden ingredients and misleading claims.</p>
              <ul className="problem-list">
                <li>Processed foods with hidden ingredients</li>
                <li>Low fiber causing digestive issues</li>
                <li>Misleading health claims on packaging</li>
                <li>Rising lifestyle diseases</li>
              </ul>
            </div>
            <div className="solution-card fade-right">
              <div className="card-badge">Solution</div>
              <h3>WIN-DIA Coconut Flour Khakhra</h3>
              <p>Not just a health label - our khakhra truly works, thanks to naturally high fiber content from coconut flour.</p>
              <ul className="solution-list">
                <li>Genuinely supports gut health</li>
                <li>Noticeable improvement in digestion</li>
                <li>Feel light and energized after eating</li>
                <li>Scientifically tested and certified</li>
              </ul>
              <div className="highlight-quote">
                <p>"WIN-DIA for dine keeps the gut in line"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Showcase */}
      <section className="innovation" aria-label="Innovation section">
        <div className="container">
          <div className="innovation-grid">
            <div className="innovation-content fade-left">
              <span className="section-label">Innovation</span>
              <h2>First-of-its-kind<br />in the World</h2>
              <p>We transform gluten-free from just a label into a real digestive health solution.</p>
              <div className="innovation-cards">
                <div className="innovation-card">
                  <div className="innovation-icon-bg" aria-hidden="true">01</div>
                  <div className="innovation-text">
                    <h4>Ingredient Innovation</h4>
                    <p>Using coconut flour - a by-product adding value to agri-waste</p>
                  </div>
                </div>
                <div className="innovation-card">
                  <div className="innovation-icon-bg" aria-hidden="true">02</div>
                  <div className="innovation-text">
                    <h4>Health-Focused Formula</h4>
                    <p>Supports gut health, vegan, gluten-free</p>
                  </div>
                </div>
                <div className="innovation-card">
                  <div className="innovation-icon-bg" aria-hidden="true">03</div>
                  <div className="innovation-text">
                    <h4>Shelf-Life Enhancement</h4>
                    <p>Vacuum packaging extends freshness significantly</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="innovation-badge fade-right">
              <div className="certification-badge-large">
                <span>NABL LAB TESTED</span>
                <div className="gi-number">GI = 44</div>
                <span>CERTIFIED LOW GLYCEMIC INDEX</span>
                <div className="badge-shine" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products" aria-label="Featured products">
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-label">Our Signature Range</span>
            <h2>Featured Khakhras</h2>
            <p className="section-subtitle">Fiber-rich, gluten-free, and absolutely delicious</p>
          </div>
          <div className="products-grid">
            {productsData.map((product, index) => (
              <div key={product.id} className="product-card fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  {product.inStock && <span className="product-stock">In Stock</span>}
                  <button 
                    className={`wishlist-btn ${wishlist[product.id] ? 'active' : ''}`}
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={wishlist[product.id] ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    {wishlist[product.id] ? '♥' : '♡'}
                  </button>
                  <div className="product-badges">
                    {product.lowGI && <span className="badge low-gi">Low GI</span>}
                    {product.glutenFree && <span className="badge gluten-free">Gluten Free</span>}
                    {product.vegan && <span className="badge vegan">Vegan</span>}
                  </div>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-price">
                    <span className="current">₹{product.price}</span>
                    <span className="original">₹{product.originalPrice}</span>
                  </div>
                  <button 
                    className="product-cart"
                    onClick={() => addToCart(product.id, product.name)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    {cartNotifications[product.id] ? 'Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all fade-up">
            <Link to="/shop" className="btn-secondary">View Complete Collection</Link>
          </div>
        </div>
      </section>

      {/* How It's Made Section */}
      <section className="process" aria-label="Manufacturing process">
        <div className="process-bg" role="presentation"></div>
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-label">Craftsmanship</span>
            <h2>How It's Made</h2>
            <p className="section-subtitle">From coconut farm to your plate — a journey of quality and care</p>
          </div>
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <div key={index} className="process-card fade-up">
                <div className="process-card-image">
                  <img src={step.image} alt={step.title} loading="lazy" />
                  <div className="process-number" aria-label={`Step ${index + 1}`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="process-card-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="trust" aria-label="Trust indicators">
        <div className="trust-particles" aria-hidden="true">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-label">Why Trust Us</span>
            <h2>Quality You Can Rely On</h2>
            <p className="section-subtitle">Every product meets the highest standards of quality and safety</p>
          </div>
          <div className="trust-grid">
            <div className="trust-item fade-up">
              <h4>Free Shipping</h4>
              <p>On orders above ₹499 across India</p>
            </div>
            <div className="trust-item fade-up">
              <h4>FSSAI Certified</h4>
              <p>Quality & safety assured by government standards</p>
            </div>
            <div className="trust-item fade-up">
              <h4>NABL Lab Tested</h4>
              <p>Scientifically validated in accredited labs</p>
            </div>
            <div className="trust-item fade-up">
              <h4>100% Natural</h4>
              <p>No preservatives, no artificial additives</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" aria-label="Customer testimonials">
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-label">Testimonials</span>
            <h2>Real People, Real Results</h2>
            <p className="section-subtitle">Hear from our customers who transformed their snacking habits</p>
          </div>
          <div className="testimonials-slider">
            <div 
              className="testimonials-track" 
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              aria-live="polite"
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-rating" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  className={`dot ${activeTestimonial === index ? 'active' : ''}`} 
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="reviews-link fade-up">
            <Link to="/reviews" className="btn-outline-small">Read 500+ 5-Star Reviews</Link>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="founder" aria-label="Founder section">
        <div className="founder-bg" role="presentation"></div>
        <div className="founder-particles" aria-hidden="true">
          <div className="founder-particle"></div>
          <div className="founder-particle"></div>
          <div className="founder-particle"></div>
          <div className="founder-particle"></div>
          <div className="founder-particle"></div>
          <div className="founder-particle"></div>
        </div>
        <div className="container">
          <div className="founder-grid">
            <div className="founder-image fade-left">
              <img src={founderPhoto} alt="Founder - Smt G. Tejaswini" loading="lazy" />
              <div className="founder-experience">19+ Years of Excellence</div>
            </div>
            <div className="founder-content fade-right">
              <span className="section-label">Our Founder</span>
              <h2>Smt G. Tejaswini</h2>
              <p className="founder-title">B.E., Woman Entrepreneur with 19+ years experience</p>
              <div className="founder-quote">
                <p>"WIN-DIA was born from a simple idea — snacking should feel light, not heavy. We've reimagined traditional khakhra for modern wellness."</p>
              </div>
              <div className="founder-stats">
                <div><strong>19+ Years</strong><span>Experience</span></div>
                <div><strong>KTech Elevate Winner</strong><span>Startup Karnataka</span></div>
              </div>
              <div className="founder-badges">
                <span>DST-iTBI Supported</span>
                <span>PMFME Recognized</span>
                <span>KAPPEC Partner</span>
                <span>VTPC Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* As Seen In Section */}
      <section className="featured-in" aria-label="Media features">
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-label">As Featured In</span>
            <h2>Recognized by Leading Publications</h2>
          </div>
          <div className="logo-grid">
            {featuredLogos.map((logo, index) => (
              <div key={index} className="logo-item fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <img src={logo.logo} alt={logo.name} className="logo-image" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="instagram" aria-label="Instagram feed">
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-label">Follow Us</span>
            <h2>@kalpavristi_coco_fab</h2>
            <p className="section-subtitle">See how our community enjoys WIN-DIA daily</p>
          </div>
          <div className="instagram-grid">
            {[insta1, insta2, insta3, insta4, insta5, insta6].map((img, index) => (
              <div key={index} className="instagram-item fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <img src={img} alt={`Instagram post ${index + 1}`} loading="lazy" />
                <div className="instagram-overlay">
                  <span className="insta-icon">View</span>
                </div>
              </div>
            ))}
          </div>
          <div className="insta-follow fade-up">
            <Link to="https://instagram.com/kalpavristi_coco_fab" className="btn-outline" target="_blank" rel="noopener noreferrer">
              Follow on Instagram
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* WhatsApp Chat Button */}
      <a 
        href="https://wa.me/919686153413" 
        className="whatsapp-chat" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <div className="whatsapp-icon">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="white" aria-hidden="true">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.527 1.067 3.584l-.824 3.029 3.153-.799c1.043.557 2.217.85 3.418.85 3.18 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.765-5.768-5.765l.004.001zm0 9.5c-.871 0-1.714-.231-2.452-.663l-2.483.634.689-2.382c-.472-.785-.73-1.679-.73-2.594 0-2.63 2.14-4.77 4.771-4.77 2.63 0 4.771 2.14 4.771 4.77 0 2.63-2.141 4.771-4.771 4.771l.005-.006z"/>
          </svg>
        </div>
      </a>

      {/* Back to Top Button */}
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`} 
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>

      {/* Cookie Consent Banner */}
      {cookieVisible && (
        <div className="cookie-consent" role="dialog" aria-label="Cookie consent">
          <div className="cookie-content">
            <p>We use cookies to enhance your experience. By continuing, you agree to our <Link to="/privacy">Privacy Policy</Link>.</p>
            <button className="cookie-accept" onClick={acceptCookies}>Accept</button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>WIN-DIA</h3>
              <p>The Divine Healthy Crunch</p>
              <p className="footer-desc">Ancient wisdom meets modern wellness. Crafted with love, backed by science.</p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/our-story">Our Story</Link></li>
                <li><Link to="/health-benefits">Health Benefits</Link></li>
                <li><Link to="/wholesale">Wholesale</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/track-order">Track Order</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul>
                <li>+91 821 4527307</li>
                <li>+91 9686153413</li>
                <li>care@windia.com</li>
                <li>Kalpavristi Coco Foods,<br />Basavanahalli Main Road,<br />Mysuru-570032, Karnataka</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Certifications</h4>
              <ul>
                <li>FSSAI Certified</li>
                <li>NABL Lab Tested</li>
                <li>DST-iTBI Supported</li>
                <li>Startup Karnataka</li>
                <li>PMFME Recognized</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-social">
              <a href="#">www.kalpavristicocofoods.com</a>
              <span className="separator">|</span>
              <a href="#">@kalpavristi_coco_fab</a>
              <span className="separator">|</span>
              <a href="#">Kalpavristi Kcfpl</a>
            </div>
            <div className="footer-copyright">
              <p>© 2024 WIN-DIA. All rights reserved. Manufactured by Kalpavristi Coco Foods OPC Pvt. Ltd.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
