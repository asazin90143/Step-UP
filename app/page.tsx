'use client';
import { shoes } from '@/lib/data';
import { useCart } from '@/context/CartContext';

export default function Home() {
  const { addToCart } = useCart();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">New Arrivals</h1>
        <p className="text-gray-500">Premium footwear. No heels allowed.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto">
        {shoes.map((shoe) => (
          <div key={shoe.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 flex flex-col">
            <div className="h-48 bg-gray-100 relative">
              {/* Using standard img for simplicity, use Next/Image in production */}
              <img src={shoe.image} alt={shoe.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <div className="text-xs text-emerald-600 font-bold uppercase tracking-wide mb-1">{shoe.category}</div>
              <h3 className="font-bold text-lg text-gray-800">{shoe.name}</h3>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">${shoe.price}</span>
                <button
                  onClick={() => addToCart(shoe)}
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}