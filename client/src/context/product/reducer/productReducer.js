import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCT_SUCCESS,
  ADD_REVIEWS_SUCCESS,
  GET_ALL_PRODUCT_FAIL,
  GET_ALL_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  GET_ALL_REVIEW_FAIL,
  GET_ALL_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_SUCCESS,
} from "./productAction";

export const productInit = {
  products: [],
  product: {},
  productsCount: 0,
  resultPerPage: 8,
  filterCountProducts: 0,
  productsAdmin: [],
  reviews: [],
  reviewsProduct: [],
};

export const productReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_REVIEW_SUCCESS:
      const { id } = payload;
      // const newProducts = state.products.map((product) =>
      //   product._id === productId
      //     ? product.reviews.filter((rv) => rv._id !== id)
      //     : product
      // );
      return {
        ...state,
        reviews: state.reviews.filter((rv) => rv._id !== id),
      };
    case GET_ALL_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: payload,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        productsAdmin: state.productsAdmin.map((product) =>
          product._id === payload._id ? payload : product
        ),
        products: state.products.map((product) =>
          product._id === payload._id ? payload : product
        ),
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        productsAdmin: state.productsAdmin.filter(
          (product) => product._id !== payload
        ),
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        productsAdmin: [...state.productsAdmin, payload],
      };
    case GET_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        productsAdmin: payload,
      };
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
