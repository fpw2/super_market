import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "../context/AppContext";
import Navbar from "../layout/Navbar";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import ProductDetails from "../components/ProductDetails";

export default function App() {
  
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <main>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/products" element={<Products />}></Route>
              <Route
                path="/products/:id/*"
                element={<ProductDetails />}
              ></Route>
              <Route path="/cart" element={<Cart />}></Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
