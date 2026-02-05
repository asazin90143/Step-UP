'use client';
import { useState } from 'react';
import { shoes } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { Shoe } from '@/types';
import Link from 'next/link';

export default function Home() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | number | null>(null);
  const [visibleCount, setVisibleCount] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'name' | 'priceLow' | 'priceHigh'>('name');

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  const categories = ['All', ...[...new Set(shoes.map((shoe) => shoe.category))].sort()];
  const sizes = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13];

  let filteredShoes = selectedCategory === 'All'
    ? [...shoes]
    : shoes.filter((shoe) => shoe.category === selectedCategory);

  // Apply Sorting
  filteredShoes.sort((a, b) => {
    if (sortOption === 'priceLow') return a.price - b.price;
    if (sortOption === 'priceHigh') return b.price - a.price;
    return a.name.localeCompare(b.name); // Default: Name A-Z
  });

  if (searchQuery) {
    filteredShoes = filteredShoes.filter(shoe =>
      shoe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleScrollToShop = () => {
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openSizeModal = (shoe: Shoe) => {
    setSelectedShoe(shoe);
    setSelectedSize(null);
  };

  const handleAddToCart = () => {
    if (selectedShoe && selectedSize) {
      addToCart(selectedShoe, selectedSize);
      setSelectedShoe(null);
      setSelectedSize(null);
    }
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        </div>

        {/* Decorative grid pattern */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-emerald-400 font-medium text-sm tracking-wide uppercase">New Collection 2026</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                Walk with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Confidence</span>
              </h1>

              <p className="text-gray-300 text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
                Discover our premium collection of footwear designed for comfort and style. No heels, just pure performance.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <button
                  onClick={handleScrollToShop}
                  className="group px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold transition-all duration-300 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/40 hover:shadow-xl flex items-center gap-2"
                >
                  Shop Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={handleScrollToContact}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white rounded-full font-bold transition-all duration-300"
                >
                  Learn More
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free Shipping
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  30-Day Returns
                </div>
              </div>
            </div>

            {/* Right side - Featured shoe showcase */}
            <div className="order-1 md:order-2 relative">
              {/* Main showcase */}
              <div className="relative">
                {/* Glow effect behind shoe */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-teal-500/20 rounded-full blur-3xl scale-75"></div>

                {/* Rotating ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-80 h-80 md:w-96 md:h-96 border-2 border-dashed border-emerald-500/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                </div>

                {/* Main featured shoe */}
                <div className="relative z-10 flex justify-center">
                  <div className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center hover:scale-105 transition-transform duration-500">
                    <img
                      src={shoes.find(s => s.name === 'Air Pulse')?.image || (process.env.NEXT_PUBLIC_BASE_PATH || '') + '/shoes/sneakers/image288.jpg'}
                      alt="Featured Shoe"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Floating mini cards */}
                <div className="absolute -top-4 -right-4 md:top-4 md:right-0 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <img src={shoes[50]?.image || (process.env.NEXT_PUBLIC_BASE_PATH || '') + '/shoes/boots/image260.jpg'} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-300">Just sold!</p>
                      <p className="text-sm font-bold text-white">Boots</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 md:bottom-8 md:-left-8 bg-emerald-600 rounded-2xl p-4 shadow-xl shadow-emerald-600/30">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-extrabold text-white">250+</div>
                    <div className="text-emerald-100 text-xs leading-tight">Products<br />Available</div>
                  </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute top-1/2 -left-8 w-3 h-3 bg-emerald-400 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
                <div className="absolute bottom-20 right-0 w-2 h-2 bg-teal-400 rounded-full animate-ping" style={{ animationDuration: '2.5s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f0fdf4" />
          </svg>
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
      <section id="shop" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">Our Collection</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">Latest Arrivals</h2>
            </div>
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Sort Dropdown */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="pl-4 pr-8 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.7rem top 50%', backgroundSize: '0.65rem auto' }}
              >
                <option value="name">Name (A-Z)</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search shoes..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(20); // Reset visible count on search
                  }}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(20);
                }}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md transform scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-300'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {filteredShoes.slice(0, visibleCount).map((shoe) => (
              <div key={shoe.id} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col">
                <div className="h-64 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
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
                      onClick={() => openSizeModal(shoe)}
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
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-emerald-600 transition-colors">{shoe.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">Premium {shoe.category.toLowerCase()} designed for modern life.</p>

                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                    <span className="text-xl font-extrabold text-gray-900 dark:text-white">${shoe.price}</span>
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

          {visibleCount < filteredShoes.length && (
            <div className="text-center">
              <button
                onClick={handleSeeMore}
                className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full font-bold transition shadow-sm hover:shadow-md"
              >
                See More Products ({filteredShoes.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-emerald-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-emerald-100 max-w-xl mx-auto">Have questions about sizing, materials, or shipping? We're here to help you step up.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition text-center">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-emerald-100 mb-4">For general inquiries</p>
              <a href="mailto:hello@stepup.com" className="text-white font-semibold hover:text-emerald-400">hello@stepup.com</a>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition text-center">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-emerald-100 mb-4">Mon-Fri, 9am - 6pm</p>
              <a href="tel:+15551234567" className="text-white font-semibold hover:text-emerald-400">+1 (555) 123-4567</a>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition text-center">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Visit Us</h3>
              <p className="text-emerald-100 mb-4">Come say hello</p>
              <address className="text-white font-semibold not-italic">123 Sneaker St, NYC</address>
            </div>
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

      {/* Size Selection Modal */}
      {selectedShoe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-up">
            <div className="relative h-48 bg-gray-100 dark:bg-gray-900">
              <img
                src={selectedShoe.image}
                alt={selectedShoe.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedShoe(null)}
                className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black rounded-full p-2 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <span className="text-emerald-600 text-sm font-bold uppercase tracking-wide">{selectedShoe.category}</span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{selectedShoe.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Select your size to continue.</p>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-8">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg text-sm font-bold border transition-all ${selectedSize === size
                      ? 'border-emerald-600 bg-emerald-600 text-white shadow-md transform scale-105'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-emerald-500 hover:text-emerald-600'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">${selectedShoe.price}</span>
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${selectedSize
                    ? 'bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-emerald-600 dark:hover:bg-emerald-400 shadow-lg transform active:scale-95'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}