import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiShoppingCart, FiHeart, FiCheck } from 'react-icons/fi';
import { addToCart } from '../../redux/actions/cartActions';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import toast from 'react-hot-toast';
import './ProductCard.css';

const ProductCard = ({ product, index }) => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist!', {
        icon: '❤️',
      });
    }
  };

  return (
    <div
      className="product-card fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link to={`/product/${product._id}`} className="product-card-link">
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.name} className="product-image" />
          {product.countInStock > 0 ? (
            <span className="stock-badge in-stock">
              <FiCheck /> In Stock
            </span>
          ) : (
            <span className="stock-badge out-of-stock">Out of Stock</span>
          )}
          <button
            className="wishlist-btn"
            onClick={handleWishlist}
            aria-label="Add to wishlist"
          >
            <FiHeart className={isInWishlist ? 'active' : ''} />
          </button>
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.shortDescription}</p>

          <div className="product-meta">
            <div className="product-price">
              <span className="current-price">₹{product.price}</span>
              {product.originalPrice && (
                <span className="original-price">₹{product.originalPrice}</span>
              )}
            </div>

            <div className="product-badges">
              {product.isLowGI && <span className="badge low-gi">Low GI</span>}
              {product.isGlutenFree && <span className="badge gluten-free">Gluten Free</span>}
              {product.isVegan && <span className="badge vegan">Vegan</span>}
            </div>
          </div>

          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
          >
            <FiShoppingCart />
            {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;