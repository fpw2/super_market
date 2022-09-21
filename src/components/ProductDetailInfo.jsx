import Button from "../ui-kit/Button";
import {useContext} from "react"
import { AppContext } from "../context/AppContext"

export default function ProductDetailInfo({ product, description, price }) {
  /**
   * Using a context
   */
  const app = useContext(AppContext)

  return (
    <>
      <p>
        {description} sold at <strong>{price}€</strong> per piece.
      </p>
      <Button onClick={()=> app.handleProductAdd(product)}>Add {price}€</Button>
    </>
  );
}
