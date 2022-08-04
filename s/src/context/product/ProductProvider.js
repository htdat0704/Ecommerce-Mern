import { ProductContext } from "./ProductContext";
import { useReducer } from "react";
import { productInit, productReducer } from "./reducer/productReducer";
import axios from "axios";
import {
  getProductSuccess,
  getOneProductSuccess,
} from "./reducer/productAction";

function ProductProvider({ children }) {
  const [productState, dispatch] = useReducer(productReducer, productInit);

  const getProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/product`);
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

  const productContext = { productState, getProducts, getOneProduct };

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
