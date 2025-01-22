import { ProductCard } from "../ProductCard";
import { HashLoader } from "react-spinners"; 
import "./index.css";

export function ProductCardList({ products, loading }) {
  if (loading) {
    return (
      <div className="spinner-container">
        <HashLoader color="#000000" size={30} />
      </div>
    );
  }

  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
}
