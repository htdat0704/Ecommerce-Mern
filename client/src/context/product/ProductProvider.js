import { ProductContext } from "./ProductContext";
import { useReducer } from "react";
import { productInit, productReducer } from "./reducer/productReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import {
  getProductSuccess,
  getOneProductSuccess,
  addReviewsSuccess,
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

  const productContext = {
    productState,
    getProducts,
    getOneProduct,
    createNewReviews,
  };

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
