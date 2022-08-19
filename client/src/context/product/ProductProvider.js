import { ProductContext } from "./ProductContext";
import { useReducer } from "react";
import { productInit, productReducer } from "./reducer/productReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import {
  getProductSuccess,
  getOneProductSuccess,
  addReviewsSuccess,
  getAllProductsSuccess,
  getAllProductsFail,
  createProductSuccess,
  createProductFail,
  deleteProductSuccess,
  deleteProductFail,
  updateProductSuccess,
  updateProductFail,
  getAllReviewsSuccess,
  getAllReviewsFail,
  deleteReviewFail,
  deleteReviewSuccess,
} from "./reducer/productAction";

function ProductProvider({ children }) {
  const [productState, dispatch] = useReducer(productReducer, productInit);

  const getProducts = async (
    page = 1,
    price = [0, 25000],
    category,
    ratings = 0,
    keyword = ""
  ) => {
    try {
      let link = `http://localhost:4000/product?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&name=${keyword}`;

      if (category) {
        link = `http://localhost:4000/product?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&name=${keyword}&category=${category}`;
      }

      const response = await axios.get(link);

      if (response.data.success) {
        dispatch(getProductSuccess(response.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getOneProduct = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/product/details/${id}`
      );

      if (response.data.success) {
        dispatch(getOneProductSuccess(response.data.product));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createNewReviews = async (formReviews) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const response = await axios.put(
        `http://localhost:4000/product/review`,
        formReviews,
        config
      );

      if (response.data.success) {
        dispatch(addReviewsSuccess(response.data.review));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async (formCraete) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/product/create",
        formCraete
      );

      if (response.data.success)
        dispatch(createProductSuccess(response.data.product));
    } catch (error) {
      dispatch(createProductFail(error.response.data.message));
    }
  };

  const deleteProduct = async (id) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const response = await axios.delete(
        `http://localhost:4000/product/delete/${id}`
      );

      if (response.data.success) dispatch(deleteProductSuccess(id));
    } catch (error) {
      dispatch(deleteProductFail(error.response.data.message));
    }
  };

  const updateProduct = async (formUpdate, idProduct) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const response = await axios.put(
        `http://localhost:4000/product/update/${idProduct}`,
        formUpdate
      );

      if (response.data.success)
        dispatch(updateProductSuccess(response.data.product));
    } catch (error) {
      dispatch(updateProductFail(error.response.data.message));
    }
  };

  const getAllProducts = async (keyword = "") => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }

    let link = `http://localhost:4000/product/admin/products`;

    if (keyword) {
      link = `http://localhost:4000/product?name=${keyword}`;
    }
    try {
      const response = await axios.get(link);

      if (response.data.success)
        dispatch(getAllProductsSuccess(response.data.products));
    } catch (error) {
      dispatch(getAllProductsFail(error.response.data.message));
    }
  };

  const getAllReviews = async (keyword = "") => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    let link;
    if (!keyword) {
      link = "http://localhost:4000/product/admin/reviews";
    } else {
      link = `http://localhost:4000/product/admin/review/${keyword}`;
    }
    try {
      const response = await axios.get(link);

      if (response.data.success)
        dispatch(getAllReviewsSuccess(response.data.reviews));
    } catch (error) {
      dispatch(getAllReviewsFail(error.response.data.message));
    }
  };

  const deleteReview = async (formDelete) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    console.log(formDelete);
    try {
      const response = await axios.delete(
        `http://localhost:4000/product/delete/review`,
        {
          data: formDelete,
        }
      );

      if (response.data.success) dispatch(deleteReviewSuccess(formDelete));
    } catch (error) {
      dispatch(deleteReviewFail(error.response.data.message));
    }
  };

  const productContext = {
    productState,
    getProducts,
    getOneProduct,
    createNewReviews,
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getAllReviews,
    deleteReview,
  };

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
