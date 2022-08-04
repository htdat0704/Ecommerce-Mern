import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCT_SUCCESS,
} from "./productAction";

export const productInit = {
  products: [],
  product: null,
  productsCount: 0,
  resultPerPage: 8,
};

export const productReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload.products,
        productsCount: payload.productCount,
      };
    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        products: [],
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        product: payload,
      };
    default:
      return state;
  }
};
