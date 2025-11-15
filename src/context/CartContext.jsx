import React, { createContext, useContext, useState } from 'react';

// 1. Creamos el Contexto
const CartContext = createContext();

// 2. Creamos un "Hook" personalizado para usar el contexto fácilmente
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Creamos el "Proveedor" que contendrá toda la lógica
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Función para añadir productos al carrito
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const value = {
    cartItems,
    addToCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}