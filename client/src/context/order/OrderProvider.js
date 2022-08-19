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
  getAllOrdersSuccess,
  getAllOrdersFail,
  deleteOrderSuccess,
  deleteOrderFail,
  updateOrderSuccess,
  updateOrderFail,
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

  //admin

  const getAllOrders = async (keyword = "") => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    let link;
    link = "http://localhost:4000/order/admin";
    if (keyword) {
      link = `http://localhost:4000/order/admin?username=${keyword}`;
    }
    try {
      const response = await axios.get(link);

      if (response.data.success)
        dispatch(getAllOrdersSuccess(response.data.orders));
    } catch (error) {
      dispatch(getAllOrdersFail(error.response.data.message));
    }
  };

  const deleteOrder = async (id) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const response = await axios.delete(
        `http://localhost:4000/order/admin/delete/${id}`
      );

      if (response.data.success) dispatch(deleteOrderSuccess(id));
    } catch (error) {
      dispatch(deleteOrderFail(error.response.data.message));
    }
  };

  const updateOrder = async (idOrder, formStatus) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.put(
        `http://localhost:4000/order/admin/updateStatus/${idOrder}`,
        formStatus,
        config
      );
      if (response.data.success) {
        dispatch(updateOrderSuccess({ idOrder, formStatus }));
      }
    } catch (error) {
      dispatch(updateOrderFail(error.response.data.message));
    }
  };

  const orderContext = {
    createOrder,
    orderState,
    getMyOrders,
    getOneOrder,
    getAllOrders,
    deleteOrder,
    updateOrder,
  };

  return (
    <OrderContext.Provider value={orderContext}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;
