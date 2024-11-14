import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);
  const addToBasket = (product) => {
    const found = basket.find((i) => i.id === product.id);

    if (!found) {
      setBasket(basket.concat({ ...product, amount: 1 }));

      toast.success("Ürün sepete eklendi");
    } else {
      const updated = { ...found, amount: found.amount + 1 };
      const newBasket = basket.map((i) => (updated.id === i.id ? updated : i));
      setBasket(newBasket);

      toast.success(`Ürün sepete eklendi (${updated.amount})`);
    }
  };

  const removeFromBasket = (delete_id) => {
    const filtered = basket.filter((i) => i.id !== delete_id);

    setBasket(filtered);
  };
  const decreaseAmount = (delete_id) => {
    const found = basket.find((i) => i.id === delete_id);

    if (found.amount > 1) {
      const updated = { ...found, amount: found.amount - 1 };
      const newBasket = basket.map((i) => (i.id === updated.id ? updated : i));
      setBasket(newBasket);

      toast.info(`Ürünün miktarı azaltıldı (${updated.amount})`);
    } else {
      removeFromBasket(delete_id);

      toast.error(`Ürün sepetten kaldırıldı`);
    }
  };

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, removeFromBasket, decreaseAmount }}
    >
      {children}
    </BasketContext.Provider>
  );
};
