export const ADD_NEW_ORDER = "add_new_order";
export const ADD_NEW_ORDER_FAIL = "add_new_order_fail";

export const GET_MY_ORDERS_SUCCESS = "get_my_orders_success";
export const GET_MY_ORDERS_FAIL = "get_my_orders_fail";

export const GET_ONE_ORDER_SUCCESS = "get_one_order_success";

export const GET_ALL_ORDERS_SUCCESS = "get_all_orders_success";
export const GET_ALL_ORDERS_FAIL = "get_all_orders_fail";

export const DELETE_ORDER_SUCCESS = "delete_order_success";
export const DELETE_ORDER_FAIL = "delete_order_fail";

export const UPDATE_ORDER_SUCCESS = "update_order_success";
export const UPDATE_ORDER_FAIL = "update_order_fail";

export const updateOrderSuccess = (payload) => {
  return {
    type: UPDATE_ORDER_SUCCESS,
    payload,
  };
};

export const updateOrderFail = (payload) => {
  return {
    type: UPDATE_ORDER_FAIL,
    payload,
  };
};

export const deleteOrderSuccess = (payload) => {
  return {
    type: DELETE_ORDER_SUCCESS,
    payload,
  };
};

export const deleteOrderFail = (payload) => {
  return {
    type: DELETE_ORDER_FAIL,
    payload,
  };
};

export const getAllOrdersSuccess = (payload) => {
  return {
    type: GET_ALL_ORDERS_SUCCESS,
    payload,
  };
};

export const getAllOrdersFail = (payload) => {
  return {
    type: GET_ALL_ORDERS_FAIL,
    payload,
  };
};

export const getOneOrderSuccess = (payload) => {
  return {
    type: GET_ONE_ORDER_SUCCESS,
    payload,
  };
};

export const getMyOrdersFail = (payload) => {
  return {
    type: GET_MY_ORDERS_FAIL,
    payload,
  };
};

export const getMyOrdersSuccess = (payload) => {
  return {
    type: GET_MY_ORDERS_SUCCESS,
    payload,
  };
};

export const addNewOrderFail = (payload) => {
  return {
    type: ADD_NEW_ORDER_FAIL,
    payload,
  };
};

export const addNewOrder = (payload) => {
  return {
    type: ADD_NEW_ORDER,
    payload,
  };
};
