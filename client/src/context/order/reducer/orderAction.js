export const ADD_NEW_ORDER = "add_new_order";
export const ADD_NEW_ORDER_FAIL = "add_new_order_fail";

export const GET_MY_ORDERS_SUCCESS = "get_my_orders_success";
export const GET_MY_ORDERS_FAIL = "get_my_orders_fail";

export const GET_ONE_ORDER_SUCCESS = "get_one_order_success";

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
