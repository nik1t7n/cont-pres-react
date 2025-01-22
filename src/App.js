import { useCallback, useEffect, useState, useMemo } from "react";
import { Categories } from "./components/Categories";
import { ProductCardList } from "./components/ProductCardList/index.jsx";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryClick = useCallback((category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  }, []);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  // ### log print ###
  // useEffect(() => {
  //   console.log(categories);
  // }, [categories]);

  return (
    <div className="content">
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
        loading={loading}
      />
      <ProductCardList products={filteredProducts} loading={loading} />
    </div>
  );
}

export default App;
