import { createContext, useState } from "react";
import { localStorage } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  

  const addItem = (item) => {
    setItems([...items, { item }]);
    // save to local storage
    localStorage.setItem("cart", JSON.stringify([...items, { item }]));
  };
  const removeItem = (item) => {
    setItems(items.filter((i) => i.item.id !== item.id));
    // save to local storage
    localStorage.setItem(
      "cart",
      JSON.stringify(items.filter((i) => i.item.id !== item.id))
    );
  };
  const clear = () => {
    setItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  
  

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
