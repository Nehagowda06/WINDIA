import './Newsletter.css';

export default function Newsletter() {
  return (
    <section className="newsletter">
      <div className="newsletter-content container">
        <div>
          <span className="section-label">Stay Updated</span>
          <h2>Join the WIN-DIA Wellness Club</h2>
          <p>Get recipes, product launches, and exclusive offers delivered to your inbox.</p>
        </div>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email address" />
          <button type="submit" className="btn btn-primary">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
