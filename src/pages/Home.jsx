import { useContext } from "react";
import { ProductContext } from "../context/productContext";
import Card from "../components/Card";

const Home = () => {
  const { products, selectedCategory } = useContext(ProductContext);

  return (
    <div className="mt-4 container">
      <h1>{products?.length} Ürün Bulundu</h1>

      <h2 className="text-secondary">
        {selectedCategory !== "all" && selectedCategory + " için sonuçlar"}
      </h2>

      <div className="wrapper">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
