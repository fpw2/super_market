import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export function AppProvider(props) {
  const [cart, setCart] = useState([]);
  const [lightheme, setLighTheme] = useState(true)

  function handleThemeClick() {
    setLighTheme(!lightheme)
  }

  useEffect(() => {
    if(!lightheme) document.body.classList.add("dark")
    if(lightheme) document.body.classList.remove("dark")
  },[lightheme])

  /**
   * Delete a product on chart and reset quantity
   * @param {number} id
   */
  function handleProductDelete(id) {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  }

  /**
   * Add a product on cart and increase quantity
   * @param {object} newProduct
   */
  function handleProductAdd(newProduct) {
    // check if item exists
    const existingProduct = cart.find(
      (product) => product.id === newProduct.id
    );
    if (existingProduct) {
      // increase quantity
      const updatedCart = cart.map((product) => {
        if (product.id === newProduct.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      setCart(updatedCart);
    } else {
      // product is new to the cart
      setCart([
        ...cart,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
    }
  }

  /**
   * Summ of quantity in all cart on Navbar
   */
  function getCartQuantity() {
    return cart.reduce((total, product) => {
        return total + product.quantity
      },0)  
  }

  /**
   * Total of all cart (total price) on Cart
   */
   function getTotalCart() {
    return cart.reduce((total, product) => {
        return total + product.price * product.quantity
      },0) 
  }

  /**
   * 
   */
  function getProductFromCart(productId) {
    return cart.find(product => product.id === productId)
  }


  const value = { lightheme, handleThemeClick, cart, handleProductAdd, handleProductDelete, getCartQuantity, getTotalCart, getProductFromCart };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}
