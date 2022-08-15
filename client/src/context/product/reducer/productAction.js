export const GET_PRODUCTS_SUCCESS = "get_products_success";
export const GET_PRODUCTS_FAIL = "get_products_fail";

export const GET_PRODUCT_FAIL = "get_product_fail";
export const GET_PRODUCT_SUCCESS = "get_product_success";

export const ADD_REVIEWS_SUCCESS = "add_reviews_success";
export const ADD_REVIEWS_FAIL = "add_reivews_fail";

export const addReviewsFail = (payload) => {
  return {
    type: ADD_REVIEWS_FAIL,
    payload,
  };
};

export const addReviewsSuccess = (payload) => {
  return {
    type: ADD_REVIEWS_SUCCESS,
    payload,
  };
};

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
