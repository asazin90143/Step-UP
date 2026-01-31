'use client';
import { useState } from 'react';
import { shoes } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function Home() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(shoes.map((shoe) => shoe.category))];

  const filteredShoes = selectedCategory === 'All'
    ? shoes
    : shoes.filter((shoe) => shoe.category === selectedCategory);

  const handleScrollToShop = () => {
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-60 bg-black">
          <img
            src="https://images.unsplash.com/photo-1556906781-9a412961d289?auto=format&fit=crop&w=1920&q=80"
            alt="Sneaker background"
            className="w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10 flex flex-col justify-center h-full min-h-[600px]">
          <span className="text-emerald-400 font-bold tracking-wider uppercase mb-4 drop-shadow-md">Step Up Your Game</span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Walk with <br />
            <span className="text-emerald-500">Confidence</span>
          </h1>
          <p className="text-gray-100 text-lg md:text-xl max-w-lg mb-8 leading-relaxed drop-shadow-md font-medium">
            Discover our premium collection of footwear designed for comfort and style. No heels, just pure performance.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleScrollToShop}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold transition transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              Shop Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/40 text-white rounded-full font-bold transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="bg-emerald-50 py-12 border-b border-emerald-100">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-emerald-600 mb-2">100+</div>
            <div className="text-gray-600 font-medium">Unique Styles</div>
          </div>
          <div className="p-6 border-l border-r border-emerald-100 max-md:border-none">
            <div className="text-4xl font-bold text-emerald-600 mb-2">24h</div>
            <div className="text-gray-600 font-medium">Fast Delivery</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-emerald-600 mb-2">100%</div>
            <div className="text-gray-600 font-medium">Authentic Quality</div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8">
            <div>
              <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">Our Collection</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Latest Arrivals</h2>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md transform scale-105'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredShoes.map((shoe) => (
              <div key={shoe.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                <div className="h-64 bg-gray-100 relative overflow-hidden">
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-gray-800 shadow-sm uppercase tracking-wide">
                      {shoe.category}
                    </span>
                  </div>
                  <img
                    src={shoe.image}
                    alt={shoe.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Quick add overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent flex justify-center">
                    <button
                      onClick={() => addToCart(shoe)}
                      className="w-full bg-white text-gray-900 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-500 hover:text-white transition active:scale-95 flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">{shoe.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">Premium {shoe.category.toLowerCase()} designed for modern life.</p>

                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-xl font-extrabold text-gray-900">${shoe.price}</span>
                    <div className="flex text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Subscribe to our newsletter for exclusive drops, early access to new releases, and special offers.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 w-full"
            />
            <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}