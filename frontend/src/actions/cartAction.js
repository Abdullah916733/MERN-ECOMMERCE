import axios from "axios";
import {
  ADD_SHIPPING_INFO,
  ADD_TO_CART,
  REMOVE_TO_CART_ITEMS,
} from "../constants/cartConstants";

// ADD TO CART ITEMS
export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// ADD TO CART ITEMS
export const removeToCartItems = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_TO_CART_ITEMS,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// ADD SHiPPING INFO
export const saveShippingInfo = (formData) => async (dispatch) => {
  dispatch({
    type: ADD_SHIPPING_INFO,
    payload: formData,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(formData));
};
