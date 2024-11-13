import { createContext, useState } from "react";

export const BasketContext = createContext();
export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  const addToBasket = (product) => {
    const found = basket.find((i) => i.id === product.id);

    if (!found) {
      setBasket(basket.concat({ ...product, amount: 1 }));
    } else {
      const updated = { ...found, amount: found.amount + 1 };

      const newBasket = basket.map((i) => (updated.id === i.id ? updated : i));

      setBasket(newBasket);
    }
  };

  const removeFromBasket = () => {};

  const decreaseAmount = () => {};

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, removeFromBasket, decreaseAmount }}
    >
      {children}
    </BasketContext.Provider>
  );
};
