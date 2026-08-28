import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('rgms_cart')) || [];
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const storableItems = items.map((i) => ({
        ...i,
        image: typeof i.image === 'string' && i.image.length > 500 && i.image.startsWith('data:') 
          ? '/assets/asset-1.png' 
          : i.image
      }));
      localStorage.setItem('rgms_cart', JSON.stringify(storableItems));
    } catch (e) {
      console.warn('LocalStorage quota exceeded for rgms_cart:', e);
      try {
        const minimalItems = items.map(({ id, name, price, qty }) => ({ id, name, price, qty }));
        localStorage.setItem('rgms_cart', JSON.stringify(minimalItems));
      } catch (err) {
        // Suppress storage errors gracefully
      }
    }
  }, [items]);

  const addToCart = (product) => {
    const rawImage = product.image || product.thumb || '/assets/asset-1.png';

    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: rawImage, qty: 1 }];
    });
    setOpen(true);
    toast.success('Added to cart successfully!', {
      description: product.name && product.name.length > 60 ? product.name.slice(0, 60) + '...' : product.name,
    });
  };

  const removeFromCart = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const count = items.reduce((s, i) => s + (i.qty || 1), 0);
  const hasPriceOnRequest = items.some((i) => i.price === null || i.price === undefined || i.price === '' || isNaN(i.price));
  const total = hasPriceOnRequest ? null : items.reduce((s, i) => s + (i.qty || 1) * (i.price || 0), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, count, total, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
