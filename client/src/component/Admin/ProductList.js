import React, { Fragment, useEffect, useContext, useState } from "react";
import DataGrid from "react-data-grid";
import { Link } from "react-router-dom";

import { ProductContext } from "../../context/product/ProductContext";
import EditIcon from "../../assets/pencil-fill.svg";
import DeleteIcon from "../../assets/trash-fill.svg";
import LoadingModel from "../Loading/loading";

import Sidebar from "./SideBar.js";
import "./ProductList.css";

const columns = [
  {
    key: "name",
    name: "Name",
    formatter: (value) => {
      return formatterName(value.row.name);
    },
  },
  { key: "category", name: "Category" },

  {
    key: "stock",
    name: "Stock",
    type: "number",
  },

  {
    key: "price",
    name: "Price",
  },

  {
    key: "description",
    name: "Description",
  },

  {
    key: "actions",
    name: "Actions",
    type: "number",
    sortable: false,
    formatter: (value) => {
      return formatterActions(value.row.productId);
    },
  },
];

const ProductList = () => {
  const [isLoading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [keyword, setKeyword] = useState("");
  const {
    productState: { productsAdmin },
    getAllProducts,
    deleteProduct,
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
        <Link to={`/admin/product/${value}`}>
          <img src={EditIcon} alt="icon" />
        </Link>
        <button onClick={() => deleteProductHandler(value)}>
          <img src={DeleteIcon} alt="icon" />
        </button>
      </>
    );
  };

  const deleteProductHandler = (id) => {
    loadingShow();
    deleteProduct(id);
  };

  const formatterName = ({ images, name }) => {
    return (
      <div>
        <img alt={images[0].public_id} src={images[0].url} />
        <p>{name}</p>
      </div>
    );
  };

  const rows = [];

  productsAdmin &&
    productsAdmin.forEach((product, index) => {
      rows.push({
        price: product.price,
        productId: product._id,
        category: product.category,
        stock: product.stock,
        name: { name: product.name, images: product.images },
        description: product.description,
      });
    });

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getAllProducts();
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    keyword ? getAllProducts(keyword) : getAllProducts();
  }, [keyword]);

  return (
    <Fragment>
      <LoadingModel show={isLoading || loadingSubmit} />(
      <div className="dashboardProduct">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <form className="searchBox">
            <input
              type="text"
              name="keyword"
              placeholder="Search a Product ..."
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
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

export default ProductList;
