import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import ProductDetails from "../components/ProductDetails";

export default function App() {

  const savedCart = localStorage.getItem("cart")
  const [cart, setCart] = useState(savedCart ? JSON.parse(savedCart) : [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  },[cart])

  function handleProductAdd(newProduct) { 
    // at start ...cart = []
    setCart([...cart, {...newProduct, quantity: 1}]) // add a property quantity
    
    // check if the product has been allready added
    const existingProduct = cart.find(product => product.id === newProduct.id);

    if (existingProduct) {
      const updatedCart = cart.map(product => {
        if (product.id === newProduct.id) { // for uppgrade quantity only on the product corresponding !
          return {...product, quantity: product.quantity + 1}
        }
        return product
      })
      setCart(updatedCart)
    }else {
      setCart([...cart, {...newProduct, quantity: 1}])
    }
  }

  function handleProductDelete(id) {
    const updatedCart = cart.filter(product => product.id !== id)
    setCart(updatedCart)
  }

  return (
    <BrowserRouter>
      <Navbar cart={cart} />
      <div className="container">
        <main>
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route
              path="/products"
              element={
                <Products
                  cart={cart}
                  onProductAdd={handleProductAdd}
                  onProductDelete={handleProductDelete}
                />
              }
            ></Route>
            <Route
              path="/products/:id/*"
              element={<ProductDetails onProductAdd={handleProductAdd} />}
            ></Route>
            <Route path="/cart" element={<Cart cart={cart} />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
