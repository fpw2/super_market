import Button from "../ui-kit/Button";
import {useDispatch} from "react-redux"
import {addProduct} from "../redux/store"

export default function ProductDetailInfo(props) {
  const {product} = props

  const dispatch = useDispatch()
  
  return (
    <>
      <p>
        {product.description} sold at <strong>{product.price}€</strong> per piece.
      </p>
      <Button onClick={()=> dispatch(addProduct(product))}>Add for {product.price}€</Button>
    </>
  );
}
