import Button from "../ui-kit/Button";

export default function ProductDetailInfo({product, description, price, onProductAdd }) {
  
  return (
    <>
      <p>
        {description} sold at <strong>{price}€</strong> per piece.
      </p>
      <Button onClick={()=> onProductAdd(product)}>{price}€</Button>
    </>
  );
}
