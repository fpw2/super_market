import { useState, useEffect } from "react";
import { useParams, NavLink, Routes, Route } from "react-router-dom";
import ProductDetailInfo from "./ProductDetailInfo";
import ProductDetailNutrition from "./ProductDetailNutrition";
import ProductDetailStorage from "./ProductDetailStorage";
import useFetch from "../hooks/useFetch";

export default function ProductDetails(props) {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const { get } = useFetch("https://react-tutorial-demo.firebaseio.com/");

  useEffect(() => {
    get(`productinfo/id${id}.json`).then((data) => setProduct(data));
  }, []);

  return (
    <div className="product-details-layout">
      <div>
        <h2>{product.name}</h2>
        <img
          src={product.image}
          width="125"
          height="125"
          className="product-details-image"
          alt="product name here"
        />
      </div>
      {/* V6 les routes prennent le chemin du parent comme base
      <Route path="/products/:id/*" element={<ProductDetails />}></Route>
      ici "/products/:id/"
      */}
      <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "tab-active" : "")}
              >
                Details
              </NavLink>
            </li>
            <li>
              <NavLink
                to="nutrition"
                className={({ isActive }) => (isActive ? "tab-active" : "")}
              >
                Nutrition
              </NavLink>
            </li>
            <li>
              <NavLink
                to="storage"
                className={({ isActive }) => (isActive ? "tab-active" : "")}
              >
                Storage
              </NavLink>
            </li>
          </ul>
        </div>
          <Routes>
            <Route
              path=""
              element={
                <ProductDetailInfo
                  product={product}
                  description={product.description}
                  price={product.price}
                  onProductAdd={props.onProductAdd}
                />
              }
            ></Route>
            <Route
              path="nutrition"
              element={<ProductDetailNutrition nutrition={product.nutrition} />}
            ></Route>
            <Route path="storage" element={<ProductDetailStorage storage={product.storage} />}></Route>
          </Routes>
      </div>
    </div>
  );
}
