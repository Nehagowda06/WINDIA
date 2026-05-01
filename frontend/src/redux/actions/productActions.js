import products from '../../products';
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFail,
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFail,
} from '../slices/productSlice';

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(fetchProductsRequest());

    dispatch(
      fetchProductsSuccess({
        products,
        totalPages: 1,
        currentPage: 1,
      })
    );
  } catch (error) {
    dispatch(
      fetchProductsFail(error.message || 'Failed to load products')
    );
  }
};

export const fetchProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(fetchProductRequest());

    const product = products.find(
      (item) => item._id.toString() === id.toString()
    );

    if (!product) {
      throw new Error('Product not found');
    }

    dispatch(fetchProductSuccess(product));
  } catch (error) {
    dispatch(
      fetchProductFail(error.message || 'Failed to load product')
    );
  }
};
