import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Product from "../components/Product";
import Loader from "../layout/Loader";

/**
 * Display the page of all products received
 * @returns html
 */
export default function Products() {
  const [products, setProducts] = useState([]); // if it doesn't work look at {}

  // USING PRODUCTS.JSON from public/data/products.json
  // const {get, loading} = useFetch("/data")
  // useEffect(() => {
  //   get("/products.json")
  //     .then(data => {
  //       console.log(data)
  //       setProducts(data)
  //     })
  //     .catch(error => console.log(error))
  // }, [get, products])

  const { get, loading } = useFetch(
    "https://react-tutorial-demo.firebaseio.com/"
  );

  useEffect(() => {
    get("supermarket.json")
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="products-layout">
      <h1>Products</h1>
      <p>Take a look at our products</p>
      <div className="products-grid">
        {loading && <Loader />}
        {products.map((product) => (
          <Product
            key={product.id}
            details={product}
          />
        ))}
      </div>
    </div>
  );
}
