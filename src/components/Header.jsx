import React, { useState, useEffect, useMemo } from 'react';
import { Search, User, ShoppingCart, ChevronDown, Menu, X, Trash2, Minus, Plus, Sparkles, ShieldCheck, Camera, Tv, Flame, Zap, ArrowRight, Tag, Filter, Command, MessageCircle, Radio, MapPin, Package, Phone } from 'lucide-react';
import { megaMenu, formatPrice, dealsProducts, newArrivals, bestSellers } from '../mock/mock';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Link } from 'react-router-dom';
import { WhatsAppIcon } from './BottomSections';

const Header = () => {
  const [shopOpen, setShopOpen] = useState(false);
  const [gpsMenuOpen, setGpsMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { count, items, total, open, setOpen, removeFromCart, updateQty, addToCart } = useCart();
  const { products: contextProducts } = useProducts();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut (Cmd/Ctrl + K or Esc) to focus inline search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('header-inline-search')?.focus();
      }
      if (e.key === 'Escape') {
        document.getElementById('header-inline-search')?.blur();
        setIsSearchFocused(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    let message = "Hello RGMS! I would like to place an order/checkout the following items:\n\n";
    items.forEach((item, index) => {
      const matchedProduct = contextProducts?.find((p) => p.id === item.id);
      const priceStr = formatPrice(matchedProduct?.price || item.price);
      message += `${index + 1}. ${item.name} (Qty: ${item.qty}) - ${priceStr}\n`;
    });
    
    message += `\nTotal Amount: ${formatPrice(total)}`;
    
    const whatsappUrl = `https://wa.me/917707019501?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setOpen(false);
  };

  // All products for instant spotlight search
  const allProducts = useMemo(() => {
    if (contextProducts && contextProducts.length > 0) {
      return contextProducts;
    }
    const map = new Map();
    [...dealsProducts, ...newArrivals, ...bestSellers].forEach((p) => map.set(p.id, p));
    return Array.from(map.values());
  }, [contextProducts]);

  // Filtered search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return allProducts.slice(0, 4);
    const q = searchQuery.toLowerCase();
    return allProducts.filter((p) => p.name.toLowerCase().includes(q) || (p.badge && p.badge.toLowerCase().includes(q)));
  }, [searchQuery, allProducts]);

  const trendingTags = ['4G Solar Camera', 'Color Night Vision', '4K Smart Projector', 'Dashcam 3in1', 'V360 WiFi'];

  return (
    <>

      {/* Main Billion-Dollar Glassmorphic Animated Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(8,47,137,0.1)] py-1'
            : 'bg-white/90 backdrop-blur-md shadow-[0_1px_10px_rgba(8,47,137,0.04)] py-1.5 sm:py-2.5'
          }`}
        data-testid="site-header"
      >
        <div className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 h-[56px] sm:h-[64px] flex items-center justify-between gap-2.5 sm:gap-4 w-full">

          {/* Logo (Always Left) */}
          <div className="flex items-center shrink-0 order-1">
            <a href="#top" className="flex items-center gap-2 shrink-0 group py-0.5" aria-label="RGMS home" data-testid="logo-link">
              <img
                src="/assets/rgms-logo-transparent.png"
                alt="RGMS Smarthome"
                className="h-7 sm:h-10 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                width="140"
                height="40"
              />
            </a>
          </div>

          {/* Desktop Navigation Links (Middle on Desktop) */}
          <nav className="hidden lg:flex items-center justify-center gap-7 lg:order-2 flex-1 mx-6 text-[14px] font-bold text-[#07152e]" aria-label="Primary">
            <Link to="/" className="py-4 hover:text-[#082f89] transition-colors relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-0 after:h-[2.5px] after:bg-[#082f89] after:rounded-full hover:after:w-full after:transition-all after:duration-300">
              Home
            </Link>

            {/* Hoverable Categories Dropdown */}
            <div className="relative group py-4">
              <button className="flex items-center gap-1 hover:text-[#082f89] transition-colors focus:outline-none py-1">
                <span>Shop Now</span>
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 text-[#082f89]" />
              </button>
              
              {/* Dropdown Card */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[280px] bg-white rounded-2xl border border-slate-200 shadow-[0_20px_40px_rgba(8,47,137,0.12)] p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 origin-top pointer-events-auto z-50">
                <Link to="/category/cctv-camera" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#e8eeff]/60 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#e8eeff] text-[#082f89] flex items-center justify-center shrink-0">
                    <Camera size={16} />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-extrabold text-[#07152e]">CCTV Camera</p>
                    <p className="text-[10px] text-[#64748b] font-semibold">Cameras, DVR & NVR systems</p>
                  </div>
                </Link>

                <Link to="/category/gps-trackers" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#e6f9ee]/60 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#e6f9ee] text-[#01a345] flex items-center justify-center shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-extrabold text-[#07152e]">GPS Tracker</p>
                    <p className="text-[10px] text-[#64748b] font-semibold">Real-time vehicle security</p>
                  </div>
                </Link>

                <Link to="/category/accessories" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#f3eeff]/60 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#f3eeff] text-[#7c3aed] flex items-center justify-center shrink-0">
                    <Package size={16} />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-extrabold text-[#07152e]">All Accessories</p>
                    <p className="text-[10px] text-[#64748b] font-semibold">SMPS, PoE switches, racks & cables</p>
                  </div>
                </Link>

                <Link to="/category/access-control" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#fff0f0]/60 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#fff0f0] text-[#dc2626] flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-extrabold text-[#07152e]">Access Control</p>
                    <p className="text-[10px] text-[#64748b] font-semibold">Biometrics & smart locks</p>
                  </div>
                </Link>

                <Link to="/category/intercom" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#fffbeb]/60 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#fffbeb] text-[#d97706] flex items-center justify-center shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-extrabold text-[#07152e]">Intercom</p>
                    <p className="text-[10px] text-[#64748b] font-semibold">EPBx & internal voice systems</p>
                  </div>
                </Link>
              </div>
            </div>

            <Link to="/products" className="py-4 hover:text-[#082f89] transition-colors relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-0 after:h-[2.5px] after:bg-[#082f89] after:rounded-full hover:after:w-full after:transition-all after:duration-300" data-testid="products-nav-link">
              Products
            </Link>

            <Link to="/about" className="py-4 hover:text-[#082f89] transition-colors relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-0 after:h-[2.5px] after:bg-[#082f89] after:rounded-full hover:after:w-full after:transition-all after:duration-300">
              About Us
            </Link>

            <Link to="/contact" className="py-4 hover:text-[#082f89] transition-colors relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-0 after:h-[2.5px] after:bg-[#082f89] after:rounded-full hover:after:w-full after:transition-all after:duration-300">
              Contact Us
            </Link>
          </nav>

          {/* Clean & Clear Search Bar (Middle on Mobile, Right on Desktop) */}
          <div className="relative order-2 lg:order-3 flex-1 min-w-0 lg:flex-initial lg:w-[320px] xl:w-[360px] mx-1.5 lg:mx-0">
            <div className="relative flex items-center bg-[#f8fafc] focus-within:bg-white rounded-full border border-slate-200/90 focus-within:border-[#082f89] focus-within:ring-2 focus-within:ring-[#082f89]/15 transition-all shadow-xs overflow-hidden">
              <Search size={16} className="absolute left-3 sm:left-3.5 text-[#082f89] pointer-events-none shrink-0" strokeWidth={2.2} />
              <input
                id="header-inline-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Search cameras, GPS, projectors..."
                className="w-full bg-transparent text-[12px] sm:text-[13px] font-semibold text-[#07152e] placeholder:text-[#94a3b8] pl-8 sm:pl-10 pr-7 sm:pr-9 py-1.5 sm:py-2 outline-none truncate"
                data-testid="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-[#94a3b8] hover:text-[#07152e] p-0.5 rounded-full hover:bg-slate-200 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Clean Dropdown - Displays ONLY when user types a search query */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_20px_40px_rgba(8,47,137,0.18)] border border-slate-200 overflow-hidden z-50 animate-fadeIn">
                <div className="max-h-[300px] overflow-y-auto p-2 space-y-1 bg-white">
                  <div className="px-3 py-1.5 flex items-center justify-between border-b border-slate-100">
                    <span className="text-[11px] font-black text-[#64748b] uppercase tracking-wider">
                      Matching Products ({searchResults.length})
                    </span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-[11px] font-bold text-[#082f89] hover:underline"
                    >
                      Clear
                    </button>
                  </div>

                  {searchResults.length === 0 ? (
                    <div className="py-6 text-center text-[#94a3b8]">
                      <p className="text-[13px] font-bold text-[#07152e]">No matching products found</p>
                      <p className="text-[11px] text-[#64748b] mt-0.5">Try "GPS", "WiFi", "Solar", or "4G"</p>
                    </div>
                  ) : (
                    searchResults.map((p) => (
                      <div
                        key={p.id}
                        onMouseDown={(e) => e.preventDefault()}
                        className="flex items-center gap-3 p-2 rounded-xl bg-white hover:bg-[#e8eeff]/60 border border-transparent hover:border-slate-100 transition-colors group cursor-pointer"
                      >
                        <div className="w-11 h-11 bg-[#f8fafc] rounded-xl flex items-center justify-center p-1 shrink-0 border border-slate-100 overflow-hidden">
                          <img src={p.image} alt="" className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            {p.badge && (
                              <span className="bg-[#f00102] text-white text-[9px] font-black px-1.5 py-0.2 rounded shrink-0">
                                {p.badge}
                              </span>
                            )}
                            <p className="text-[12.5px] font-bold text-[#07152e] truncate group-hover:text-[#082f89] transition-colors">
                              {p.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[12.5px] font-black text-[#082f89]">{formatPrice(p.price)}</span>
                            {p.oldPrice && (
                              <span className="text-[10.5px] text-[#94a3b8] line-through font-medium">{formatPrice(p.oldPrice)}</span>
                            )}
                          </div>
                        </div>
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(p);
                          }}
                          className="bg-[#082f89] hover:bg-[#0e45c4] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-xl transition-all shadow-sm shrink-0 active:scale-95"
                        >
                          + Add
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Area: Cart Trigger + Mobile Menu Toggle */}
          <div className="order-3 flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href="http://rgms.millitrack.com/modern/#/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 bg-[#01a345] hover:bg-[#018e3c] text-white text-[12px] sm:text-[13px] font-extrabold px-3.5 py-2 rounded-xl shadow-md transition-all active:scale-95 duration-200"
            >
              <User size={14} className="shrink-0" />
              <span>GPS Login</span>
            </a>

            <button
              onClick={() => setOpen(true)}
              className="relative bg-[#082f89] hover:bg-[#0e45c4] text-white p-2 sm:p-2.5 rounded-xl shadow-sm transition-all active:scale-95 flex items-center justify-center"
              aria-label="Shopping Cart"
              data-testid="header-cart-button"
            >
              <ShoppingCart size={18} />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#f00102] text-white text-[10px] font-black w-4 sm:w-5 h-4 sm:h-5 rounded-full flex items-center justify-center shadow-md animate-scaleUp">
                  {count}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-[#07152e] hover:text-[#082f89] active:bg-slate-100 p-1.5 sm:p-2 rounded-xl transition-all duration-200 flex items-center justify-center min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] shrink-0"
              aria-label="Open menu"
              data-testid="mobile-menu-toggle"
            >
              <Menu size={20} className="sm:w-[22px] sm:h-[22px]" strokeWidth={2.2} />
            </button>
          </div>


        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-full sm:max-w-sm p-0 flex flex-col bg-white">
          <SheetHeader className="px-5 py-4 border-b flex-row items-center space-y-0 bg-[#041b54] text-white pr-14">
            <div className="flex items-center gap-3">
              <img src="/assets/rgms-logo-transparent.png" alt="RGMS" className="h-8 w-auto object-contain bg-white rounded-xl p-1.5 shadow-sm" />
              <SheetTitle className="text-white text-[15px] font-black tracking-wide">Menu</SheetTitle>
            </div>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-3">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block py-3 px-4 text-[15px] font-bold text-[#07152e] hover:text-[#082f89] hover:bg-[#e8eeff] rounded-2xl transition-all">🏠 Home</Link>
            
            <div className="py-2 px-4 space-y-2 border-y border-slate-100">
              <p className="text-[11px] font-black text-[#64748b] uppercase tracking-wider">Shop Now</p>
              <div className="grid grid-cols-1 gap-1 pl-2">
                <Link to="/category/cctv-camera" onClick={() => setMobileOpen(false)} className="block py-2 text-[13.5px] font-bold text-[#07152e] hover:text-[#082f89] transition-colors">📷 CCTV Camera</Link>
                <Link to="/category/gps-trackers" onClick={() => setMobileOpen(false)} className="block py-2 text-[13.5px] font-bold text-[#07152e] hover:text-[#082f89] transition-colors">📍 GPS Tracker</Link>
                <Link to="/category/accessories" onClick={() => setMobileOpen(false)} className="block py-2 text-[13.5px] font-bold text-[#07152e] hover:text-[#082f89] transition-colors">📦 All Accessories</Link>
                <Link to="/category/access-control" onClick={() => setMobileOpen(false)} className="block py-2 text-[13.5px] font-bold text-[#07152e] hover:text-[#082f89] transition-colors">🛡️ Access Control</Link>
                <Link to="/category/intercom" onClick={() => setMobileOpen(false)} className="block py-2 text-[13.5px] font-bold text-[#07152e] hover:text-[#082f89] transition-colors">☎️ Intercom</Link>
              </div>
            </div>

            <Link to="/products" onClick={() => setMobileOpen(false)} className="block py-3 px-4 text-[15px] font-extrabold text-[#082f89] bg-[#e8eeff] hover:bg-[#d5e2ff] rounded-2xl transition-all flex items-center justify-between">
              <span>🛍️ All Products</span>
              <span className="bg-[#01a345] text-white text-[9.5px] font-black px-2 py-0.5 rounded uppercase">ALL</span>
            </Link>

            <a
              href="http://rgms.millitrack.com/modern/#/login"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-4 text-[15px] font-extrabold text-white bg-[#01a345] hover:bg-[#018e3c] rounded-2xl transition-all flex items-center justify-between shadow-md"
            >
              <span className="flex items-center gap-2">🔑 GPS Login Portal</span>
              <span className="bg-white text-[#01a345] text-[9.5px] font-black px-2 py-0.5 rounded uppercase tracking-wider">LOGIN</span>
            </a>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="block py-3 px-4 text-[15px] font-bold text-[#07152e] hover:text-[#082f89] hover:bg-[#e8eeff] rounded-2xl transition-all">About Us</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="block py-3 px-4 text-[15px] font-bold text-[#07152e] hover:text-[#082f89] hover:bg-[#e8eeff] rounded-2xl transition-all">Contact Us</Link>
            <a
              href="https://wa.me/917707019501?text=Hello%20RGMS%20Team!%20I%20have%20an%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 text-[14.5px] font-bold text-[#25D366] flex items-center gap-2 bg-[#e2f5ec] rounded-2xl"
            >
              <WhatsAppIcon size={18} /> WhatsApp: +91 7707 019 501
            </a>
          </div>
        </SheetContent>
      </Sheet>

      {/* Shopping Cart Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-md flex flex-col p-0 bg-white" data-testid="cart-drawer">
          <SheetHeader className="px-5 py-4 border-b bg-[#041b54] text-white pr-14">
            <SheetTitle className="text-[16px] font-bold text-white flex items-center gap-3">
              <span>Shopping Cart</span>
              <span className="text-[12px] bg-[#01a345] text-white px-2.5 py-0.5 rounded-full font-black">
                {count} items
              </span>
            </SheetTitle>
          </SheetHeader>
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
              <div className="w-20 h-20 rounded-full bg-[#e8eeff] flex items-center justify-center text-[#082f89]">
                <ShoppingCart size={40} />
              </div>
              <p className="text-[#07152e] text-base font-extrabold">Your cart is empty</p>
              <p className="text-[#64748b] text-xs text-center max-w-xs font-medium">Explore RGMS AI security cameras and smart home devices.</p>
              <button
                onClick={() => setOpen(false)}
                className="btn-primary text-[13px] font-bold px-8 py-3 rounded-full shadow-lg"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {items.map((item) => {
                  const matchedProduct = contextProducts?.find((p) => p.id === item.id);
                  const displayImage = matchedProduct?.image || item.image;
                  return (
                    <div key={item.id} className="flex gap-3 items-center border border-slate-100 rounded-2xl p-3 shadow-sm bg-white">
                      <div className="w-16 h-16 bg-[#f1f5f9] rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                        <img src={displayImage} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] font-bold text-[#07152e] truncate">{item.name}</p>
                        <p className="text-[13px] font-black text-[#082f89] mt-0.5">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity" className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-[#07152e] hover:border-[#082f89] hover:text-[#082f89] transition-colors"><Minus size={12} /></button>
                          <span className="text-[13px] font-bold w-5 text-center tabular-nums">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity" className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-[#07152e] hover:border-[#082f89] hover:text-[#082f89] transition-colors"><Plus size={12} /></button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-[#9aa7ba] hover:text-[#f00102] transition-colors shrink-0 p-2" aria-label="Remove">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="border-t px-5 py-5 space-y-3 bg-[#f8fafc]">
                <div className="flex justify-between text-[15px] font-black text-[#07152e]">
                  <span>TOTAL AMOUNT:</span>
                  <span className="tabular-nums text-[#082f89]">{formatPrice(total)}</span>
                </div>
                <button 
                  onClick={handleCheckout} 
                  className="w-full btn-primary text-[13px] font-extrabold py-3.5 rounded-full shadow-lg"
                >
                  PROCEED TO CHECKOUT
                </button>
                <button onClick={() => setOpen(false)} className="w-full bg-white border border-slate-200 hover:border-[#082f89] hover:text-[#082f89] text-[#07152e] text-[13px] font-bold py-3 rounded-full transition-colors">
                  CONTINUE SHOPPING
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;
