import { Link } from "react-router-dom";
import Button from "../ui-kit/Button";

/**
 * Display the card of a product
 * @param {object} props
 * @returns html
 */
export default function Product(props) {
  const { details, cart } = props;
  const productFromCart = cart.find(product => product.id === details.id)
  // doens't work if all product haven't not at least one product
  const quantity = productFromCart ? productFromCart.quantity : 0;  

  return (
    <div className="product">
      <div className="product-image-container">
        <Link to={"/products/" + details.id}>
          <img
            src={details.image}
            width="100"
            height="100"
            className="product-image"
            alt="product name here"
          />
        </Link>
        <div className="product-quantity-container">
        {quantity > 0 &&
          <div className="product-quantity">{quantity}</div>
        }
        </div>
      </div>
      <div className="product-info">
        <h3>{details.name}</h3>
        <p>{details.description}</p>
      </div>
      <div className="product-checkout">
        <div>
        { quantity > 0 && 
          <Button onClick={()=> props.onProductDelete(details.id)} className="product-delete" outline>
            x
          </Button>
        }
        </div>
        <Button onClick={()=> props.onProductAdd(details)} outline>{details.price}€</Button>
      </div>
    </div>
  );
}