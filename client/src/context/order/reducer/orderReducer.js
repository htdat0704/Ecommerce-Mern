import {
  ADD_NEW_ORDER,
  GET_MY_ORDERS_FAIL,
  GET_MY_ORDERS_SUCCESS,
  GET_ONE_ORDER_SUCCESS,
} from "./orderAction";

export const orderInit = {
  orders: [],
  message: "",
  order: {},
};

export const orderReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ONE_ORDER_SUCCESS:
      return {
        ...state,
        order: payload,
      };
    case GET_MY_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload,
      };
    case ADD_NEW_ORDER:
      localStorage.removeItem("cartItems");
      return {
        ...state,
        orders: [...state.orders, payload],
      };
    default:
      return {
        ...state,
      };
  }
};
