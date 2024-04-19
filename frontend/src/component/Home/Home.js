import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/metaData.js";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProducts } from "../../actions/productAction.js";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";

const Home = () => {
  const product = {
    name: "Blue T-shirt",
    images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
    price: "1300",
    _id: "sample",
  };

  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title={"ECOMMERCE"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
