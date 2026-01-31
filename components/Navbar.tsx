'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const { items } = useCart();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
                    STEP<span className="text-emerald-600">UP</span>
                </Link>
                <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {itemCount > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-emerald-600 rounded-full">
                            {itemCount}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
}
