import axios from '../../utils/axiosConfig';
import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
} from '../slices/userSlice';

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginRequest());
    const { data } = await axios.post('/users/login', { email, password });
    dispatch(userLoginSuccess(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(
      userLoginFail(
        error.response?.data?.message || error.message || 'Login failed'
      )
    );
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(userLogout());
};
