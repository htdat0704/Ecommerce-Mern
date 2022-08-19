import React, { Fragment, useEffect, useState, useContext } from "react";
import { ProductContext } from "../../context/product/ProductContext";
import { useNavigate, useParams } from "react-router-dom";

import AccountTreeIcon from "../../assets/bezier2.svg";
import DescriptionIcon from "../../assets/card-heading.svg";
import StorageIcon from "../../assets/bag-heart.svg";
import SpellcheckIcon from "../../assets/wordpress.svg";
import AttachMoneyIcon from "../../assets/cash.svg";

import LoadingModel from "../Loading/loading";
import SideBar from "./SideBar";

const UpdateProduct = () => {
  const {
    productState: { product },
    getOneProduct,
    updateProduct,
  } = useContext(ProductContext);
  const navigate = useNavigate();
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const { productId } = useParams();
  const [formUpdate, setFormUpdate] = useState({
    name: product.name || "",
    price: product.price || "",
    description: product.description || "",
    category: product.category || "",
    stock: product.stock || "",
    images: product.images || [],
    isUpdateImages: false,
  });
  const handleOnChangeUpdate = (e) =>
    setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value });

  useEffect(() => {
    const timer = setTimeout(() => {
      getOneProduct(productId);
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [productId]);

  useEffect(() => {
    setFormUpdate({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      category: product.category || "",
      stock: product.stock || 0,
      images: product.images || [],
    });
    setOldImages(product.images || []);
  }, [getOneProduct]);

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2000);
  };
  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    loadingShow();
    updateProduct(formUpdate, productId);
    navigate("/admin/products", { replace: true });
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setFormUpdate({ ...formUpdate, images: [], isUpdateImages: true });
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setFormUpdate((old) => {
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
      <LoadingModel show={isLoading || loadingSubmit} />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={formUpdate.name || " "}
                onChange={handleOnChangeUpdate}
                name="name"
              />
            </div>
            <div>
              <img src={AttachMoneyIcon} alt="s" className="svgImg" />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={handleOnChangeUpdate}
                value={formUpdate.price || ""}
                name="price"
              />
            </div>

            <div>
              <img src={DescriptionIcon} alt="s" className="svgImg" />

              <textarea
                placeholder="Product Description"
                value={formUpdate.description || ""}
                onChange={handleOnChangeUpdate}
                cols="30"
                rows="1"
                name="description"
              ></textarea>
            </div>

            <div>
              <img src={AccountTreeIcon} alt="s" className="svgImg" />
              <select
                name="category"
                value={formUpdate.category || ""}
                onChange={handleOnChangeUpdate}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <img src={StorageIcon} alt="s" className="svgImg" />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={handleOnChangeUpdate}
                value={formUpdate.stock}
                name="stock"
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <button id="createProductBtn" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
