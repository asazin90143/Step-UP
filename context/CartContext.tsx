'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Shoe, CartItem } from '@/types';

interface CartContextType {
    items: CartItem[];
    addToCart: (shoe: Shoe, size: string | number) => void;
    removeFromCart: (id: string, size: string | number) => void;
    updateQuantity: (id: string, size: string | number, delta: number) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('stepup_cart');
        if (saved) setItems(JSON.parse(saved));
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('stepup_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (shoe: Shoe, size: string | number) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === shoe.id && item.size === size);
            if (existing) {
                return prev.map(item => (item.id === shoe.id && item.size === size) ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...shoe, quantity: 1, size }];
        });
    };

    const removeFromCart = (id: string, size: string | number) => {
        setItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
    };

    const updateQuantity = (id: string, size: string | number, delta: number) => {
        setItems(prev => prev.map(item => {
            if (item.id === id && item.size === size) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const clearCart = () => setItems([]);

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};