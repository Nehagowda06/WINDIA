import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Recipes.css';

// ─── Import Images from the same folder ──────────────────────────────────────────────
// Hero image
import recHero from './rec-hero.jpeg';

// Category / Flavor images
import avocadoToast from './avacado-toast.jpg';
import chocolateKhakra from './chocolate-khakra.jpg';
import chutneyCrunch from './chutney-crunch-toast.jpg';
import cucumberRaita from './cucumber-raita-stack.jpg';
import curryLeafChat from './curry-leaf-chat.jpg';
import grandPartyPlatter from './grand-party-platter.jpg';
import kHel from './k-bhel.jpg';
import kCanapes from './k-canapes.jpg';
import kPizza from './k-pizza.jpg';
import kTomatoSoup from './k-tomato-soup.jpg';
import khakhraNachos from './khakhra-nachos.jpg';
import masalaKhakhraToast from './masala-khakhra-toast.jpg';
import coconutImg from './mm.jpeg';

// Note: If you don't have these specific images, use fallbacks
// If you have different names, update the imports above
const garlicImg = kPizza; // Fallback - replace with actual garlic.jpg if you have it
const jeeraImg = kPizza; // Fallback - replace with actual jeera.jpg if you have it
const methiImg = curryLeafChat; // Fallback - replace with actual methi.jpg if you have it
const onionImg = kPizza; // Fallback - replace with actual onion.jpg if you have it
const moringaImg = avocadoToast; // Fallback - replace with actual moringa.jpg if you have it

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'pizza', title: 'Khakhra Pizza', count: 8, sub: 'Crispy, healthy pizza bases', accent: '#E86A2A', image: kPizza },
  { id: 'chaat', title: 'Khakhra Chaat', count: 12, sub: 'Street food with a crunch', accent: '#C4501A', image: curryLeafChat },
  { id: 'sandwich', title: 'Khakhra Sandwich', count: 6, sub: 'Layered meals, every occasion', accent: '#F4923D', image: masalaKhakhraToast },
  { id: 'soup', title: 'Soup & Crumbles', count: 5, sub: 'Warm bowls with texture', accent: '#A84010', image: kTomatoSoup },
  { id: 'dessert', title: 'Khakhra Desserts', count: 4, sub: 'Sweet innovations', accent: '#D66020', image: chocolateKhakra },
  { id: 'party', title: 'Party Platters', count: 10, sub: 'Celebrate with crunch', accent: '#E87840', image: grandPartyPlatter },
];

const QUICK_RECIPES = [
  { slug: 'khakhra-bhel', title: 'Khakhra Bhel', time: '5 min', difficulty: 'Easy', serves: 2, flavor: 'Curry Leaves', image: kHel },
  { slug: 'masala-khakhra-toast', title: 'Masala Khakhra Toast', time: '7 min', difficulty: 'Easy', serves: 1, flavor: 'Garlic', image: masalaKhakhraToast },
  { slug: 'chutney-khakhra', title: 'Chutney Crunch Toast', time: '3 min', difficulty: 'Easy', serves: 2, flavor: 'Methi', image: chutneyCrunch },
  { slug: 'avocado-khakhra', title: 'Avocado Smash Khakhra', time: '5 min', difficulty: 'Easy', serves: 2, flavor: 'Moringa', image: avocadoToast },
  { slug: 'khakhra-nachos', title: 'Khakhra Nachos Bowl', time: '8 min', difficulty: 'Easy', serves: 3, flavor: 'Garlic', image: khakhraNachos },
  { slug: 'cucumber-raita', title: 'Cucumber Raita Stack', time: '6 min', difficulty: 'Easy', serves: 2, flavor: 'Methi', image: cucumberRaita },
];

const ALL_RECIPES = [
  { slug: 'garlic-pizza', title: 'Garlic Khakhra Pizza', category: 'pizza', time: '15 min', difficulty: 'Easy', serves: 2, rating: 4.8, reviews: 156, tags: ['Vegetarian', 'High-Fiber'], flavor: 'Garlic', image: kPizza },
  { slug: 'curry-chaat', title: 'Curry Leaves Chaat', category: 'chaat', time: '12 min', difficulty: 'Easy', serves: 3, rating: 4.7, reviews: 189, tags: ['Vegan', 'Quick'], flavor: 'Curry Leaves', image: curryLeafChat },
  { slug: 'moringa-sandwich', title: 'Moringa Layered Sandwich', category: 'sandwich', time: '10 min', difficulty: 'Easy', serves: 2, rating: 4.9, reviews: 112, tags: ['Healthy', 'Travel-Ready'], flavor: 'Moringa', image: avocadoToast },
  { slug: 'methi-bhel', title: 'Methi Khakhra Bhel', category: 'chaat', time: '8 min', difficulty: 'Easy', serves: 2, rating: 4.6, reviews: 94, tags: ['Diabetic-Friendly', 'Low-GI'], flavor: 'Methi', image: kHel },
  { slug: 'chocolate-bark', title: 'Chocolate Khakhra Bark', category: 'dessert', time: '20 min', difficulty: 'Medium', serves: 4, rating: 4.9, reviews: 203, tags: ['Dessert', 'Festive'], flavor: 'Plain', image: chocolateKhakra },
  { slug: 'canapes', title: 'Khakhra Canapés', category: 'party', time: '15 min', difficulty: 'Medium', serves: 6, rating: 4.8, reviews: 134, tags: ['Party', 'Elegant'], flavor: 'Garlic', image: kCanapes },
  { slug: 'tomato-crunch', title: 'Tomato Soup Crunch Bowl', category: 'soup', time: '20 min', difficulty: 'Easy', serves: 2, rating: 4.5, reviews: 87, tags: ['Winter-Warmer', 'Comfort'], flavor: 'Methi', image: kTomatoSoup },
  { slug: 'party-platter', title: 'Grand Party Platter', category: 'party', time: '25 min', difficulty: 'Medium', serves: 8, rating: 5.0, reviews: 67, tags: ['Party', 'Diwali'], flavor: 'Mixed', image: grandPartyPlatter },
  { slug: 'pesto-pizza', title: 'Pesto Veggie Khakhra Pizza', category: 'pizza', time: '18 min', difficulty: 'Easy', serves: 2, rating: 4.7, reviews: 145, tags: ['Vegetarian', 'Italian-Twist'], flavor: 'Moringa', image: kPizza },
  { slug: 'ladoo-crumble', title: 'Coconut Ladoo Crumble', category: 'dessert', time: '15 min', difficulty: 'Easy', serves: 6, rating: 4.8, reviews: 98, tags: ['Festive', 'Sweet'], flavor: 'Coconut', image: coconutImg },
  { slug: 'bruschetta', title: 'Khakhra Bruschetta', category: 'sandwich', time: '10 min', difficulty: 'Easy', serves: 3, rating: 4.6, reviews: 76, tags: ['Mediterranean', 'Quick'], flavor: 'Garlic', image: masalaKhakhraToast },
  { slug: 'post-workout', title: 'Post-Workout Power Bowl', category: 'soup', time: '10 min', difficulty: 'Easy', serves: 1, rating: 4.7, reviews: 123, tags: ['High-Protein', 'Fitness'], flavor: 'Garlic', image: kTomatoSoup },
];

const DIP_RECIPES = [
  { slug: 'mint-chutney', title: 'Mint-Coriander Chutney', time: '10 min', difficulty: 'Easy', pairing: 'All khakhra flavors' },
  { slug: 'red-pepper-hummus', title: 'Roasted Red Pepper Hummus', time: '15 min', difficulty: 'Medium', pairing: 'Garlic or Plain Khakhra' },
  { slug: 'coconut-yogurt', title: 'Coconut Yogurt Dip', time: '5 min', difficulty: 'Easy', pairing: 'Curry Leaves Khakhra' },
  { slug: 'peanut-chutney', title: 'Peanut-Coconut Chutney', time: '12 min', difficulty: 'Easy', pairing: 'All flavors' },
  { slug: 'spicy-salsa', title: 'Spicy Tomato Salsa', time: '10 min', difficulty: 'Easy', pairing: 'Garlic Khakhra' },
];

const MEAL_PREP = [
  { title: 'Office Lunch Box', detail: '2 Khakhras + dip cup + fresh fruit = 400 kcal balanced meal', cal: 400 },
  { title: 'Kids Tiffin Box', detail: 'Mini khakhra sandwiches + cheese cubes + grapes = 320 kcal', cal: 320 },
  { title: 'Travel Snack Pack', detail: '4 khakhras in airtight container + trail mix = 450 kcal', cal: 450 },
  { title: 'Post-Workout Box', detail: 'Khakhra + protein spread + banana = 380 kcal', cal: 380 },
];

// ─── Colour helper ────────────────────────────────────────────────────────────
const DIFF_COLORS = { Easy: '#2E7D4F', Medium: '#C4501A', Advanced: '#8B2010' };

// ─── Image mapping function ───────────────────────────────────────────────────
const getImageForRecipe = (recipe) => {
  if (recipe.image) return recipe.image;
  
  const flavorLower = recipe.flavor?.toLowerCase() || '';
  if (flavorLower.includes('curry')) return curryLeafChat;
  if (flavorLower.includes('garlic')) return garlicImg;
  if (flavorLower.includes('jeera')) return jeeraImg;
  if (flavorLower.includes('methi')) return methiImg;
  if (flavorLower.includes('onion')) return onionImg;
  if (flavorLower.includes('moringa')) return moringaImg;
  if (flavorLower.includes('coconut')) return coconutImg;
  return coconutImg;
};

// ─── Intersection Observer Hook ─────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);
  return [ref, inView];
}

// ─── Animated Card Wrapper ─────────────────────────────────────────────────────
function AnimatedCard({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`win-rc-animated-card ${inView ? 'win-rc-animated-in' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Recipe Card (for All Recipes) ─────────────────────────────────────────
function RecipeCard({ recipe, delay = 0 }) {
  const imageSrc = getImageForRecipe(recipe);
  return (
    <AnimatedCard delay={delay} className="win-rc-recipe-card">
      <Link to={`/recipes/${recipe.slug}`} className="win-rc-recipe-card-link">
        <div className="win-rc-card-img-wrap">
          <div className="win-rc-card-img-placeholder">
            <img src={imageSrc} alt={recipe.title} className="win-rc-card-img" loading="lazy" />
            <div className="win-rc-card-overlay" />
            <span className="win-rc-card-flavor-tag">{recipe.flavor}</span>
          </div>
          <div className="win-rc-card-time-badge">{recipe.time}</div>
        </div>
        <div className="win-rc-card-body">
          {recipe.rating && (
            <div className="win-rc-card-rating">
              <span className="win-rc-star">&#9733;</span>
              <span>{recipe.rating}</span>
              <span className="win-rc-reviews">({recipe.reviews})</span>
            </div>
          )}
          <h3 className="win-rc-card-title">{recipe.title}</h3>
          <div className="win-rc-card-meta">
            <span className="win-rc-difficulty" style={{ color: DIFF_COLORS[recipe.difficulty] || '#C4501A' }}>
              {recipe.difficulty}
            </span>
            {recipe.serves && <span>Serves {recipe.serves}</span>}
          </div>
          {recipe.tags && (
            <div className="win-rc-card-tags">
              {recipe.tags.slice(0, 2).map(t => (
                <span key={t} className="win-rc-tag">{t}</span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </AnimatedCard>
  );
}

// ─── Quick Card ────────────────────────────────────────────────────────────
function QuickCard({ recipe, delay = 0 }) {
  const imageSrc = recipe.image;
  return (
    <AnimatedCard delay={delay} className="win-rc-quick-card">
      <Link to={`/recipes/${recipe.slug}`} className="win-rc-quick-card-link">
        <div className="win-rc-quick-img">
          <img src={imageSrc} alt={recipe.title} className="win-rc-quick-img-bg" loading="lazy" />
          <span className="win-rc-quick-time">{recipe.time}</span>
        </div>
        <div className="win-rc-quick-body">
          <span className="win-rc-quick-diff" style={{ color: DIFF_COLORS[recipe.difficulty] }}>{recipe.difficulty}</span>
          <h4 className="win-rc-quick-title">{recipe.title}</h4>
          <p className="win-rc-quick-sub">{recipe.flavor} Khakhra · Serves {recipe.serves}</p>
        </div>
      </Link>
    </AnimatedCard>
  );
}

// ─── Category Card ─────────────────────────────────────────────────────────
function CategoryCard({ cat, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <AnimatedCard delay={delay} className="win-rc-cat-card">
      <Link
        to={`/recipes?category=${cat.id}`}
        className={`win-rc-cat-card-link ${hovered ? 'win-rc-cat-hovered' : ''}`}
        style={{ '--win-cat-accent': cat.accent }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="win-rc-cat-accent-bar" />
        <div className="win-rc-cat-image">
          <img src={cat.image} alt={cat.title} className="win-rc-cat-img" loading="lazy" />
        </div>
        <div className="win-rc-cat-body">
          <div className="win-rc-cat-count">{cat.count} recipes</div>
          <h3 className="win-rc-cat-title">{cat.title}</h3>
          <p className="win-rc-cat-sub">{cat.sub}</p>
          <span className="win-rc-cat-arrow">&#8594;</span>
        </div>
      </Link>
    </AnimatedCard>
  );
}

// ─── Dip Card ──────────────────────────────────────────────────────────────
function DipCard({ dip, delay = 0 }) {
  return (
    <AnimatedCard delay={delay} className="win-rc-dip-card">
      <Link to={`/recipes/${dip.slug}`} className="win-rc-dip-card-link">
        <div className="win-rc-dip-pill">{dip.time}</div>
        <h4 className="win-rc-dip-title">{dip.title}</h4>
        <p className="win-rc-dip-pairing">Pairs with: {dip.pairing}</p>
        <span className="win-rc-dip-diff" style={{ color: DIFF_COLORS[dip.difficulty] }}>{dip.difficulty}</span>
      </Link>
    </AnimatedCard>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────
function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section className="win-rc-hero">
      <div className="win-rc-hero-bg" style={{ transform: `translateY(${scrollY * 0.2}px)` }} />
      <div className="win-rc-hero-overlay" />
      <div className="win-rc-hero-content win-rc-hero-content--centered">
        <div className="win-rc-hero-left win-rc-hero-left--centered">
          <div className="win-rc-hero-eyebrow">
            <span className="win-rc-eyebrow-bar" />
            <span>WIN-DIA Kitchen</span>
            <span className="win-rc-eyebrow-bar" />
          </div>
          <h1 className="win-rc-hero-h1">
            Beyond Snacking<br />
            <em>with WIN-DIA</em>
          </h1>
          <p className="win-rc-hero-desc">
            Transform your favourite khakhra into pizzas, chaats, sandwiches, desserts and more.
            Every recipe is tested, healthy and delicious.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Categories Section ─────────────────────────────────────────────────────
function CategoriesSection() {
  return (
    <section className="win-rc-section win-rc-categories-section">
      <div className="win-rc-container">
        <div className="win-rc-section-hdr">
          <div className="win-rc-overline">Browse by Type</div>
          <h2 className="win-rc-h2">Explore Recipe Categories</h2>
        </div>
        <div className="win-rc-categories-grid">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Quick & Easy Section ──────────────────────────────────────────────────
function QuickSection() {
  return (
    <section className="win-rc-section win-rc-quick-section">
      <div className="win-rc-container">
        <div className="win-rc-section-hdr">
          <div className="win-rc-overline">Under 10 Minutes</div>
          <h2 className="win-rc-h2">Quick &amp; Easy Recipes</h2>
          <p className="win-rc-section-sub">Perfect for busy days when you need something fast and nourishing.</p>
        </div>
        <div className="win-rc-quick-grid">
          {QUICK_RECIPES.map((r, i) => (
            <QuickCard key={r.slug} recipe={r} delay={i * 70} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── All Recipes Grid ───────────────────────────────────────────────────────
function AllRecipesSection() {
  const [visible, setVisible] = useState(8);
  const shown = ALL_RECIPES.slice(0, visible);

  return (
    <section className="win-rc-section win-rc-all-section">
      <div className="win-rc-container">
        <div className="win-rc-section-hdr win-rc-section-hdr--row">
          <div>
            <div className="win-rc-overline">Full Collection</div>
            <h2 className="win-rc-h2">All Recipes</h2>
          </div>
          <span className="win-rc-recipe-count">{ALL_RECIPES.length} recipes</span>
        </div>
        <div className="win-rc-all-grid">
          {shown.map((r, i) => (
            <RecipeCard key={r.slug} recipe={r} delay={(i % 4) * 80} />
          ))}
        </div>
        {visible < ALL_RECIPES.length && (
          <div className="win-rc-load-more-wrap">
            <button className="win-rc-load-more" onClick={() => setVisible(v => v + 8)}>
              Load More Recipes &#8595;
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Meal Prep Section ──────────────────────────────────────────────────────
function MealPrepSection() {
  return (
    <section className="win-rc-section win-rc-meal-section">
      <div className="win-rc-container">
        <div className="win-rc-section-hdr">
          <div className="win-rc-overline">Effortless Planning</div>
          <h2 className="win-rc-h2">Meal Prep Ideas</h2>
          <p className="win-rc-section-sub">WIN-DIA khakhra in your weekly meal plan — ready in minutes.</p>
        </div>
        <div className="win-rc-meal-grid">
          {MEAL_PREP.map((m, i) => (
            <AnimatedCard key={m.title} delay={i * 100} className="win-rc-meal-card">
              <div className="win-rc-meal-cal">
                <strong>{m.cal}</strong>
                <span>kcal</span>
              </div>
              <div className="win-rc-meal-body">
                <h3>{m.title}</h3>
                <p>{m.detail}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Dips Section ───────────────────────────────────────────────────────────
function DipsSection() {
  return (
    <section className="win-rc-section win-rc-dips-section">
      <div className="win-rc-container">
        <div className="win-rc-section-hdr">
          <div className="win-rc-overline">Perfect Pairings</div>
          <h2 className="win-rc-h2">Homemade Dips &amp; Spreads</h2>
          <p className="win-rc-section-sub">Every dip recipe crafted to elevate your khakhra experience.</p>
        </div>
        <div className="win-rc-dips-grid">
          {DIP_RECIPES.map((d, i) => (
            <DipCard key={d.slug} dip={d} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Submit CTA ─────────────────────────────────────────────────────────────
function SubmitCTA() {
  return (
    <section className="win-rc-submit-section">
      <div className="win-rc-container">
        <div className="win-rc-submit-panel">
          <div className="win-rc-submit-text">
            <div className="win-rc-overline win-rc-overline-lt">Win Prizes</div>
            <h2 className="win-rc-submit-h">Share Your WIN-DIA Creation</h2>
            <p>Have a unique way to enjoy WIN-DIA khakhra? Share it with our community of home cooks. Top recipe wins Rs.5000 and gets featured on our website.</p>
          </div>
          <div className="win-rc-submit-right">
            <div className="win-rc-submit-prize">
              <strong>Rs. 5,000</strong>
              <span>Top recipe prize</span>
            </div>
            <div className="win-rc-submit-prize">
              <strong>Featured</strong>
              <span>On our website</span>
            </div>
            <Link to="/submit-recipe" className="win-rc-submit-btn">Submit Your Recipe &#8594;</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter ─────────────────────────────────────────────────────────────
function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (email) setDone(true);
  };
  return (
    <section className="win-rc-section win-rc-newsletter-section">
      <div className="win-rc-container">
        <div className="win-rc-newsletter-inner">
          <div className="win-rc-newsletter-text">
            <div className="win-rc-overline">Stay Inspired</div>
            <h2 className="win-rc-h2">New Recipes Every Friday</h2>
            <p>Join 25,000+ home cooks getting creative WIN-DIA recipes delivered to their inbox. Free e-book included when you subscribe.</p>
          </div>
          <div className="win-rc-newsletter-form-wrap">
            {done ? (
              <div className="win-rc-newsletter-success">
                ✓ You are subscribed! Check your inbox for your free e-book.
              </div>
            ) : (
              <form className="win-rc-newsletter-form" onSubmit={submit}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe &#8594;</button>
              </form>
            )}
            <p className="win-rc-newsletter-bonus">Free e-book: "15 Quick WIN-DIA Recipes" on subscribe</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
const Recipes = () => {
  return (
    <div className="win-rc-page">
      <HeroSection />
      <CategoriesSection />
      <QuickSection />
      <AllRecipesSection />
      <MealPrepSection />
      <DipsSection />
      <SubmitCTA />
      <NewsletterSection />
    </div>
  );
};

export default Recipes;