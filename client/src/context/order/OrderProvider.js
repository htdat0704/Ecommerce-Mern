import { OrderContext } from "./OrderContext";
import { useReducer } from "react";
import { orderInit, orderReducer } from "./reducer/orderReducer";
import axios from "axios";
import {
  addNewOrder,
  addNewOrderFail,
  getMyOrdersSuccess,
  getMyOrdersFail,
  getOneOrderSuccess,
} from "./reducer/orderAction";
import setAuthToken from "../../utils/setAuthToken";

function OrderProvider({ children }) {
  const [orderState, dispatch] = useReducer(orderReducer, orderInit);

  const createOrder = async (formOrder) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:4000/order/new",
        formOrder,
        config
      );

      if (response.data.success) {
        dispatch(addNewOrder(response.data.order));
      }
    } catch (error) {
      dispatch(addNewOrderFail(error.response.data.message));
    }
  };

  const getMyOrders = async () => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const response = await axios.get("http://localhost:4000/order/myOrders");
      if (response.data.success) {
        dispatch(getMyOrdersSuccess(response.data.orders));
      }
    } catch (error) {
      dispatch(getMyOrdersFail(error.response.data.message));
    }
  };

  const getOneOrder = async (orderId) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const response = await axios.get(
        `http://localhost:4000/order/me/${orderId}`
      );

      if (response.data.success) {
        dispatch(getOneOrderSuccess(response.data.order));
      }
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const orderContext = {
    createOrder,
    orderState,
    getMyOrders,
    getOneOrder,
  };

  return (
    <OrderContext.Provider value={orderContext}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;
