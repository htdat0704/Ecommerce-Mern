import React, { Fragment, useEffect, useContext, useState } from "react";
import { ProductContext } from "../../context/product/ProductContext";
import "./ProductList.css";
import { Link } from "react-router-dom";
import Sidebar from "./SideBar.js";

import DataGrid from "react-data-grid";
import DeleteIcon from "../../assets/trash-fill.svg";

import LoadingModel from "../Loading/loading";

const ReviewList = () => {
  const [isLoading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [keyword, setKeyword] = useState("");

  const {
    productState: { reviews },
    getAllReviews,
    deleteReview,
  } = useContext(ProductContext);

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2000);
  };

  const formatterActions = (value) => {
    return (
      <>
        <button onClick={() => deleteProductHandler(value)}>
          <img src={DeleteIcon} alt="icon" />
        </button>
      </>
    );
  };

  const deleteProductHandler = (value) => {
    loadingShow();
    deleteReview(value);
  };

  const formatterName = ({ productId, productName }) => {
    return <Link to={`/admin/review/${productId}`}>{productName}</Link>;
  };

  const columns = [
    {
      key: "product",
      name: "Product Name",

      flex: 1,
      formatter: (value) => {
        return formatterName({
          productId: value.row.id.productId,
          productName: value.row.product,
        });
      },
    },
    {
      key: "user",
      name: "User Name",

      flex: 0.5,
    },
    {
      key: "rating",
      name: "Rating",
      type: "number",

      flex: 0.3,
    },

    {
      key: "comment",
      name: "Comment",
    },

    {
      key: "actions",
      flex: 0.3,
      name: "Delete",

      type: "number",
      sortable: false,
      formatter: (value) => {
        return formatterActions({
          id: value.row.id.reviewId,
          productId: value.row.id.productId,
        });
      },
    },
  ];
  const rows = [];

  reviews &&
    reviews.forEach((rv, index) => {
      rows.push({
        id: { reviewId: rv._id, productId: rv.product_id, userId: rv.user },
        product: rv.product_name,
        user: rv.name,
        rating: rv.rating,
        comment: rv.comment,
      });
    });

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getAllReviews();
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    keyword ? getAllReviews(keyword) : getAllReviews();
  }, [keyword]);

  return (
    <Fragment>
      <LoadingModel show={isLoading || loadingSubmit} />(
      <div className="dashboardProduct">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL REVIEWS</h1>
          <form className="searchBox">
            <input
              type="text"
              name="keyword"
              placeholder="Search a Product ..."
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
          <br></br>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            rowHeight={100}
            headerRowHeight={50}
            summaryRowHeight={30}
          />
        </div>
      </div>
      )
    </Fragment>
  );
};

export default ReviewList;
