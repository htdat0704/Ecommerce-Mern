import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCT_SUCCESS,
  ADD_REVIEWS_SUCCESS,
} from "./productAction";

export const productInit = {
  products: [],
  product: null,
  productsCount: 0,
  resultPerPage: 8,
  filterCountProducts: 0,
};

export const productReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_REVIEWS_SUCCESS:
      const isReviewsExist = state.product.reviews.find(
        (rv) => rv.user === payload.user
      );

      if (isReviewsExist) {
        return {
          ...state,
          product: {
            ...state.product,
            reviews: state.product.reviews.map((rv) =>
              rv.user === isReviewsExist.user ? payload : rv
            ),
          },
        };
      }

      return {
        ...state,
        product: {
          ...state.product,
          reviews: [...state.product.reviews, payload],
        },
      };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload.products,
        productsCount: payload.productCount,
        filterCountProducts: payload.filterCountProducts,
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
