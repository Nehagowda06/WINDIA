import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiClock, FiChevronRight, FiCheckCircle, FiShare2, FiPrinter, FiBookmark, FiShoppingCart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { addToCart } from '../../redux/actions/cartActions';
import './RecipeDetail.css';

const recipeData = {
  'methi-khakhra-pizza': {
    title: 'Methi Khakhra Pizza with VCO Chutney',
    author: 'WIN-DIA Chef Team',
    description: 'Transform our fiber-rich Methi Khakhra into a crispy, healthy pizza base topped with fresh vegetables and signature VCO Chutney spread.',
    image: '/images/methi.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    stats: { prep: '10 min', cook: '5 min', total: '15 min', servings: '2' },
    nutrition: [
      { label: 'Calories', value: '245 kcal' },
      { label: 'Protein', value: '12g' },
      { label: 'Fiber', value: '8g' },
      { label: 'Carbs', value: '28g' },
      { label: 'Fat', value: '10g' },
    ],
    ingredients: [
      '2 WIN-DIA Methi Khakhras',
      '3 tbsp WIN-DIA VCO Chutney Spread',
      '1/4 cup Bell Peppers (diced)',
      '1/4 cup Onions (sliced)',
      '2 tbsp Sweet Corn',
      '1/4 cup Grated Cheese (optional)',
      'Fresh Coriander for garnish',
      'Chili Flakes to taste',
    ],
    steps: [
      {
        title: 'Prepare the Base',
        content: 'Place Methi Khakhras on a microwave-safe plate and spread 1.5 tbsp VCO Chutney Spread evenly on each khakhra. Pro Tip: Warm khakhra slightly for better spreading.',
      },
      {
        title: 'Add Toppings',
        content: 'Sprinkle diced bell peppers, onions, and sweet corn. Top with grated cheese if using. Health Tip: Skip cheese for a vegan version.',
      },
      {
        title: 'Cook',
        content: 'Microwave for 45-60 seconds until cheese melts, or air fry at 160°C for 2-3 minutes for extra crispiness. Texture Tip: Air fryer gives the crunchiest result!',
      },
      {
        title: 'Garnish & Serve',
        content: 'Sprinkle fresh coriander and chili flakes, cut into quarters, and serve immediately with mint chutney or tomato ketchup.',
      },
    ],
    variations: [
      { title: 'Garlic Lover’s Pizza', description: 'Use Garlic Khakhra + extra roasted garlic.' },
      { title: 'Moringa Green Pizza', description: 'Use Moringa Khakhra + spinach + pesto.' },
      { title: 'Curry Leaves Masala', description: 'Use Curry Leaves Khakhra + onion-tomato masala.' },
      { title: 'Kid-Friendly Version', description: 'Use mild toppings + extra cheese, cut into fun shapes.' },
      { title: 'Protein Boost', description: 'Add paneer cubes or chickpeas.' },
    ],
  },
};

const RecipeDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const recipe = recipeData[slug];

  const handleIngredientToggle = (ingredient) => {
    setCheckedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: 'methi-khakhra-recipe',
        name: 'Methi Khakhra',
        image: '/images/methi.jpg',
        price: 215,
        countInStock: 10,
      })
    );
    dispatch(
      addToCart({
        _id: 'vco-chutney-spread',
        name: 'VCO Chutney Spread',
        image: '/images/hero-khakhra.png',
        price: 180,
        countInStock: 15,
      })
    );
    toast.success('Methi Khakhra and VCO Chutney Spread added to cart.');
  };

  if (!recipe) {
    return (
      <div className="recipe-detail-page section">
        <div className="container">
          <h1>Recipe not found</h1>
          <p>The recipe you are looking for does not exist yet. Explore all our recipe ideas below.</p>
          <Link to="/recipes" className="btn btn-primary">
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-detail-page">
      <section className="recipe-detail-hero section">
        <div className="container recipe-detail-grid">
          <div className="detail-copy">
            <span className="recipe-badge">By {recipe.author}</span>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <div className="recipe-action-bar">
              <button type="button" className="icon-pill">
                <FiBookmark /> Save Recipe
              </button>
              <button type="button" className="icon-pill">
                <FiShare2 /> Share
              </button>
              <button type="button" className="icon-pill">
                <FiPrinter /> Print
              </button>
            </div>
            <div className="recipe-stats">
              <div>
                <strong>{recipe.stats.prep}</strong>
                <span>Prep</span>
              </div>
              <div>
                <strong>{recipe.stats.cook}</strong>
                <span>Cook</span>
              </div>
              <div>
                <strong>{recipe.stats.total}</strong>
                <span>Total</span>
              </div>
              <div>
                <strong>{recipe.stats.servings}</strong>
                <span>Servings</span>
              </div>
            </div>
          </div>
          <div className="detail-media">
            <img src={recipe.image} alt={recipe.title} />
            <div className="video-card">
              <iframe
                title="Recipe Video"
                src={recipe.videoUrl}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="recipe-detail-body section bg-cream">
        <div className="container recipe-detail-content">
          <div className="ingredients-panel">
            <div className="panel-heading">
              <h2>Ingredients</h2>
              <button type="button" className="btn btn-outline" onClick={handleAddToCart}>
                <FiShoppingCart /> Add missing ingredients to cart
              </button>
            </div>
            <ul className="ingredient-list">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient} className={checkedIngredients.includes(ingredient) ? 'checked' : ''}>
                  <button type="button" onClick={() => handleIngredientToggle(ingredient)}>
                    <FiCheckCircle />
                  </button>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="recipe-steps-panel">
            <h2>Step-by-Step Instructions</h2>
            <div className="recipe-steps">
              {recipe.steps.map((step) => (
                <article key={step.title} className="recipe-step">
                  <h3>{step.title}</h3>
                  <p>{step.content}</p>
                </article>
              ))}
            </div>
            <div className="recipe-variation-card">
              <h3>Tips & Variations</h3>
              <div className="variation-grid">
                {recipe.variations.map((variation) => (
                  <div key={variation.title} className="variation-item">
                    <strong>{variation.title}</strong>
                    <p>{variation.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="recipe-detail-final section">
        <div className="container related-recipe-grid">
          <div className="related-card">
            <h3>More Methi Khakhra Recipes</h3>
            <p>Discover more ways to use Methi Khakhra for healthy lunches and snacks.</p>
          </div>
          <div className="related-card">
            <h3>You May Also Like</h3>
            <p>Try our chaat, sandwich, and dessert ideas based on what people are cooking now.</p>
          </div>
          <div className="related-card">
            <h3>Shop This Recipe Box</h3>
            <p>Make this recipe with Methi Khakhra and VCO Chutney Spread.</p>
            <button type="button" className="btn btn-primary" onClick={handleAddToCart}>
              Add Both to Cart - ₹395
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeDetail;
