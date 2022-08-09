import React, { useState, useContext, useEffect } from "react";
import "./Products.css";
import LoadingModal from "../Loading/loading";
import { ProductContext } from "../../context/product/ProductContext";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Search from "./Search";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
  "All",
];

function Products() {
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [keyword, setKeyword] = useState("");
  let body;
  const {
    productState: {
      products,
      productsCount,
      resultPerPage,
      filterCountProducts,
    },
    getProducts,
  } = useContext(ProductContext);
  let count = filterCountProducts;

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getProducts(currentPage, price, category, ratings, keyword);
      setKeyword("");
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentPage, price, category, ratings, keyword]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
    setLoading(true);
  };

  const priceHandler = (newPrice) => {
    setPrice(newPrice);
  };

  const searchHandle = (keyword) => {
    setKeyword(keyword);
    setLoading(true);
  };

  if (isLoading) {
    body = <>{isLoading && <LoadingModal show={isLoading} />}</>;
  } else {
    body = (
      <>
        <h2 className="productsHeading">Products</h2>
        <Search searchHandle={searchHandle} />

        <div className="products">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>

        <div className="filterBox">
          <b>PRICE</b>
          <Range
            defaultValue={price}
            onChange={priceHandler}
            value={price}
            tipFormatter={(value) => `$ ${value}`}
            tipProps={{
              placement: "top",
              visible: false,
            }}
            min={0}
            max={25000}
            step={100}
            marks={{
              0: `0`,
              25000: `25000`,
            }}
          />
          <br></br>
          <b>CATEGORIES</b>
          <ul className="categoryBox">
            {categories.map((category) => (
              <li
                className="category-link"
                key={category}
                onClick={() => {
                  if (category === "All") {
                    setCategory("");
                  } else {
                    setCategory(category);
                  }
                  setLoading(true);
                }}
              >
                {category}
              </li>
            ))}
          </ul>

          <b>RATINGS ABOVE</b>
          <Slider
            defaultValue={ratings}
            onChange={(newRating) => {
              setRatings(newRating);
              setLoading(true);
            }}
            value={ratings}
            min={0}
            max={5}
            step={1}
            marks={{
              0: `0☆`,
              1: `1☆`,
              2: `2☆`,
              4: `4☆`,
              3: `3☆`,
              5: `5☆`,
            }}
          />
        </div>
        {resultPerPage < count && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}
      </>
    );
  }
  return <>{body}</>;
}

export default Products;
