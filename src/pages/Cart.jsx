import { useState } from "react";
import {loadStripe} from "@stripe/stripe-js"
import Input from "../ui-kit/Input"
import Button from "../ui-kit/Button"
import {useContext} from "react"
import { AppContext } from "../context/AppContext"

const stripeLoadedPromise = loadStripe("pk_test_51HsqkCGuhXEITAut89vmc4jtjYd7XPs8hWfo2XPef15MFqI8rCFc8NqQU9WutlUBsd8kmNqHBeEmSrdMMpeEEyfT00KzeVdate")

export default function Cart() {
  /**
   * Using a context
   */
  const app = useContext(AppContext)
  const cart = app.cart

  const [email, setEmail] = useState("")
 
  // return array with two {key: value}
  const lineItems = cart.map(product => {
    return ({price: product.price_id, quantity: product.quantity})
  })

  stripeLoadedPromise.then(stripe => {
    stripe.redirectToCheckout({
      lineItems: lineItems,
      mode: "payment",
      successUrl: "https://fpw-supermarket.netlify.app/",
      cancelUrl: "https://fpw-supermarket.netlify.app/", 
      customerEmail: email
    })
    .then((response) => {
      // this will only log if the redirect did not work
      console.log(response.error);
    })
    .catch((error) => {
      // wrong API key? you will see the error message here
      console.log(error);
    });
  })

  /**
   * Prevent page reload 
   */
  function handleFormSubmit(e) {
    e.preventdefault()
  }

  return (
    <div className="cart-layout">
      <div>
        <h1>Your Cart</h1>
      {cart.length === 0 &&
        <p>You have not added any product to your cart yet.</p>
      }
      </div>
      
      { cart.length > 0 && <>
      <table className="table table-cart">
        <thead>
          <tr>
            <th width="25%" className="th-product">
              Product
            </th>
            <th width="20%">Unit price</th>
            <th width="10%">Quantity</th>
            <th width="25%">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => {
            return (
              <tr key={product.id}>
                <td>
                  <img src={product.image} width="30" height="30" alt="" />
                  {product.name}
                </td>
                <td>{product.price} €</td>
                <td>{product.quantity}</td>
                <td>
                  <strong>{product.price * product.quantity}</strong>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="2"></th>
            <th className="cart-highlight">Total</th>
            <th className="cart-highlight">{app.getTotalCart()} €</th>
          </tr>
        </tfoot>
      </table>
        <form onSubmit={handleFormSubmit} className="pay-form">
        <p>
          Enter your email and then click on pay and your products will be
          delivered to you on the same day!
        </p>
        <Input onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="Email" type="email" value={email} required />
        <Button type="submit">Pay</Button>
      </form>
      </>}
    </div>
  );
}
