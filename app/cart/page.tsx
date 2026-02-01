'use client';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    const handleCheckout = () => {
        setIsProcessing(true);
        // Simulate API delay
        setTimeout(() => {
            clearCart();
            router.push('/success');
        }, 1500);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Your cart is empty</h2>
                <Link href="/" className="text-emerald-600 hover:underline">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors duration-300">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center gap-4 dark:border dark:border-gray-700">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md bg-gray-100 dark:bg-gray-700" />
                                <div className="flex-grow">
                                    <h3 className="font-bold text-gray-800 dark:text-gray-100">{item.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                                    <p className="font-bold text-emerald-600 dark:text-emerald-400">${item.price}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => updateQuantity(item.id, item.size, -1)} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 font-bold">-</button>
                                    <span className="font-medium text-gray-900 dark:text-gray-100">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.size, 1)} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 font-bold">+</button>
                                </div>
                                <button onClick={() => removeFromCart(item.id, item.size)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 ml-4">
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Summary */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm h-fit text-gray-900 dark:text-gray-100 dark:border dark:border-gray-700">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>${total}</span>
                        </div>
                        <div className="flex justify-between mb-6">
                            <span>Shipping</span>
                            <span className="text-emerald-600 font-medium">Free</span>
                        </div>
                        <hr className="mb-4" />
                        <div className="flex justify-between text-xl font-bold mb-6">
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className="w-full bg-black dark:bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-600 dark:hover:bg-emerald-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                            {isProcessing ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                'Checkout (Mock)'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}