import React, { useState, useContext, useEffect } from "react";
import "./Products.css";
import LoadingModal from "../Loading/loading";
import { ProductContext } from "../../context/product/ProductContext";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";

function Products() {
  const [isLoading, setLoading] = useState(true);
  let body;
  const {
    productState: { products, productsCount, resultPerPage },
    getProducts,
  } = useContext(ProductContext);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getProducts();
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  if (isLoading) {
    body = <>{isLoading && <LoadingModal show={isLoading} />}</>;
  } else {
    body = (
      <>
        <h2 className="productsHeading">Products</h2>

        <div className="products">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>

        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onchange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      </>
    );
  }
  return <>{body}</>;
}

export default Products;
