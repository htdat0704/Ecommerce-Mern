import {
  ADD_NEW_ORDER,
  GET_MY_ORDERS_FAIL,
  GET_MY_ORDERS_SUCCESS,
  GET_ONE_ORDER_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  GET_ALL_ORDERS_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_SUCCESS,
} from "./orderAction";

export const orderInit = {
  orders: [],
  message: "",
  order: {},
  ordersAdmin: [],
};

export const orderReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_ORDER_SUCCESS:
      const {
        idOrder,
        formStatus: { status },
      } = payload;
      const newOrderAdmin = state.ordersAdmin.map((order) => {
        order._id === idOrder && (order.orderStatus = status);
        return order;
      });
      console.log(newOrderAdmin);
      return {
        ...state,
        orderAdmin: newOrderAdmin,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        ordersAdmin: state.ordersAdmin.filter((order) => order._id !== payload),
      };
    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        ordersAdmin: payload,
      };
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
