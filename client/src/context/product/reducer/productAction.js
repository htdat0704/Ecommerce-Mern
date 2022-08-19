export const GET_PRODUCTS_SUCCESS = "get_products_success";
export const GET_PRODUCTS_FAIL = "get_products_fail";

export const GET_PRODUCT_FAIL = "get_product_fail";
export const GET_PRODUCT_SUCCESS = "get_product_success";

export const ADD_REVIEWS_SUCCESS = "add_reviews_success";
export const ADD_REVIEWS_FAIL = "add_reivews_fail";

export const GET_ALL_PRODUCT_SUCCESS = "get_all_product_success";
export const GET_ALL_PRODUCT_FAIL = "get_all_product_fail";

export const CREATE_PRODUCT_SUCCESS = "create_product_success";
export const CREATE_PRODUCT_FAIL = "create_product_fail";

export const DELETE_PRODUCT_SUCCESS = "delete_product_success";
export const DELETE_PRODUCT_FAIL = "delete_product_fail";

export const UPDATE_PRODUCT_SUCCESS = "update_product_success";
export const UPDATE_PRODUCT_FAIL = "update_product_fail";

export const GET_ALL_REVIEW_SUCCESS = "get_all_review_success";
export const GET_ALL_REVIEW_FAIL = "get_all_review_fail";

export const DELETE_REVIEW_SUCCESS = "delete_review_success";
export const DELETE_REVIEW_FAIL = "delete_review_fail";

export const deleteReviewSuccess = (payload) => {
  return {
    type: DELETE_REVIEW_SUCCESS,
    payload,
  };
};

export const deleteReviewFail = (payload) => {
  return {
    type: DELETE_REVIEW_FAIL,
    payload,
  };
};

export const getAllReviewsSuccess = (payload) => {
  return {
    type: GET_ALL_REVIEW_SUCCESS,
    payload,
  };
};

export const getAllReviewsFail = (payload) => {
  return {
    type: GET_ALL_REVIEW_FAIL,
    payload,
  };
};

export const updateProductSuccess = (payload) => {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    payload,
  };
};

export const updateProductFail = (payload) => {
  return {
    type: UPDATE_PRODUCT_FAIL,
    payload,
  };
};

export const deleteProductSuccess = (payload) => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload,
  };
};

export const deleteProductFail = (payload) => {
  return {
    type: DELETE_PRODUCT_FAIL,
    payload,
  };
};

export const createProductSuccess = (payload) => {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    payload,
  };
};

export const createProductFail = (payload) => {
  return {
    type: CREATE_PRODUCT_FAIL,
    payload,
  };
};

export const getAllProductsSuccess = (payload) => {
  return {
    type: GET_ALL_PRODUCT_SUCCESS,
    payload,
  };
};

export const getAllProductsFail = (payload) => {
  return {
    type: GET_ALL_PRODUCT_FAIL,
    payload,
  };
};

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
