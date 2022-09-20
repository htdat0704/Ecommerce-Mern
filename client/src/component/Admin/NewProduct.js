import React, { Fragment, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./newProduct.css";
import { ProductContext } from "../../context/product/ProductContext";

import AccountTreeIcon from "../../assets/bezier2.svg";
import DescriptionIcon from "../../assets/card-heading.svg";
import StorageIcon from "../../assets/bag-heart.svg";
import SpellcheckIcon from "../../assets/wordpress.svg";
import AttachMoneyIcon from "../../assets/cash.svg";
import { CATEGORIES } from '../../consts/category';

import SideBar from "./SideBar";


const NewProduct = () => {
  const { createProduct } = useContext(ProductContext);
  const [imagesPreview, setImagesPreview] = useState([]);
  const navigate = useNavigate();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2000);
  };

  const [formCreate, setFormCreate] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    images: [],
  });

  const handleOnChangeCreate = (e) =>
    setFormCreate({ ...formCreate, [e.target.name]: e.target.value });

  //   useEffect(() => {
  //     if (error) {
  //       alert.error(error);
  //       dispatch(clearErrors());
  //     }

  //     if (success) {
  //       alert.success("Product Created Successfully");
  //       history.push("/admin/dashboard");
  //       dispatch({ type: NEW_PRODUCT_RESET });
  //     }
  //   }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    loadingShow();
    createProduct(formCreate);
    navigate("/admin/dashboard", { replace: true });
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setFormCreate({ ...formCreate, images: [] });
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setFormCreate((old) => {
            return {
              ...old,
              images: [...old.images, reader.result],
            };
          });
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />

              <input
                type="text"
                placeholder="Product Name"
                required
                value={formCreate.name}
                onChange={handleOnChangeCreate}
                name="name"
              />
            </div>
            <div>
              <img src={AttachMoneyIcon} alt="s" className="svgImg" />

              <input
                name="price"
                type="number"
                placeholder="Price"
                required
                onChange={handleOnChangeCreate}
              />
            </div>

            <div>
              <img src={DescriptionIcon} alt="s" className="svgImg" />

              <textarea
                name="description"
                placeholder="Product Description"
                value={formCreate.description}
                onChange={handleOnChangeCreate}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <img src={AccountTreeIcon} alt="s" className="svgImg" />

              <select onChange={handleOnChangeCreate} name="category">
                <option value="">Choose Category</option>
                {CATEGORIES.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <img src={StorageIcon} alt="s" className="svgImg" />

              <input
                name="stock"
                type="number"
                placeholder="stock"
                required
                onChange={handleOnChangeCreate}
                value={formCreate.stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <button id="createProductBtn" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
