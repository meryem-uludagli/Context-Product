import api from "../api";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const url =
      selectedCategory === "all"
        ? "/products"
        : `/products/category/${selectedCategory}`;

    api.get(url).then((res) => setProducts(res.data));
  }, [selectedCategory]);

  return (
    <ProductContext.Provider
      value={{ products, selectedCategory, setSelectedCategory }}
    >
      {children}
    </ProductContext.Provider>
  );
};
