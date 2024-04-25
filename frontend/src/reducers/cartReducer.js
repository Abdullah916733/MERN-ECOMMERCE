import {
  ADD_SHIPPING_INFO,
  ADD_TO_CART,
  REMOVE_TO_CART_ITEMS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isExistItem = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isExistItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isExistItem.product ? item : i
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case ADD_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    case REMOVE_TO_CART_ITEMS:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    default:
      return state;
  }
};
