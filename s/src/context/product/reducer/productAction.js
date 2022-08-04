export const GET_PRODUCTS_SUCCESS = "get_products_success";
export const GET_PRODUCTS_FAIL = "get_products_fail";

export const GET_PRODUCT_FAIL = "get_product_fail";
export const GET_PRODUCT_SUCCESS = "get_product_success";

export const getProductSuccess = (payload) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload,
  };
};

export const getProductFail = (payload) => {
  return {
    type: GET_PRODUCTS_FAIL,
    payload,
  };
};

export const getOneProductSuccess = (payload) => {
  return {
    type: GET_PRODUCT_SUCCESS,
    payload,
  };
};
