import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { fetchProductDetails } from '../../redux/actions/productActions';
import { addToCart } from '../../redux/actions/cartActions';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.products);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const isInWishlist = wishlistItems.some((item) => item._id === id);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const onAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      navigate('/cart');
    }
  };

  const toggleWishlist = () => {
    if (!product) return;
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FiChevronLeft /> Back to Shop
        </button>

        {loading ? (
          <div className="loading-state">Loading product…</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : product ? (
          <div className="product-detail-grid">
            <div className="product-detail-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-detail-content">
              <span className="section-label">Product Detail</span>
              <h1>{product.name}</h1>
              <p className="product-detail-tagline">{product.shortDescription}</p>
              <div className="product-detail-meta">
                <span className="price">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="original-price">₹{product.originalPrice}</span>
                )}
              </div>
              <div className="product-detail-badges">
                {product.isLowGI && <span>Low GI</span>}
                {product.isGlutenFree && <span>Gluten Free</span>}
                {product.isVegan && <span>Vegan</span>}
              </div>
              <p className="product-detail-description">{product.description}</p>

              <div className="product-detail-actions">
                <button className="btn btn-primary" onClick={onAddToCart}>
                  <FiShoppingCart /> Add to Cart
                </button>
                <button className={`btn btn-outline ${isInWishlist ? 'active' : ''}`} onClick={toggleWishlist}>
                  <FiHeart /> {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </div>

              <div className="product-specs">
                <div>
                  <strong>Flavor</strong>
                  <span>{product.flavor}</span>
                </div>
                <div>
                  <strong>GI Value</strong>
                  <span>{product.giValue}</span>
                </div>
                <div>
                  <strong>Net Weight</strong>
                  <span>{product.netWeight}g</span>
                </div>
                <div>
                  <strong>In Stock</strong>
                  <span>{product.countInStock > 0 ? 'Yes' : 'Out of stock'}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-state">Product not found.</div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
