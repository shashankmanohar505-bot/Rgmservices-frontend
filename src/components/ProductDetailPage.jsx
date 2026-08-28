import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import { Footer, WhatsAppIcon } from './BottomSections';
import SEO from './SEO';
import ProductCard from './ProductCard';
import FAQSection from './FAQSection';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { formatPrice, convertToSlug } from '../mock/mock';
import { toast } from 'sonner';
import { 
  Star, CheckCircle2, 
  ShoppingBag, Plus, Minus, ArrowRight, ChevronRight, Phone, MessageSquare, ArrowLeft, Share2, Heart, HelpCircle, ChevronDown
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { id: rawId } = useParams();
  const id = rawId && rawId.includes('prod-') ? 'prod-' + rawId.split('prod-').pop() : rawId;
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Scroll to top on page mount or product ID change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Find product by ID
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between">
        <Header />
        <div className="max-w-[1280px] mx-auto px-4 py-20 text-center space-y-4">
          <div className="w-16 h-16 bg-[#fee2e2] text-[#f00102] rounded-full flex items-center justify-center mx-auto text-2xl font-black">
            !
          </div>
          <h2 className="text-2xl font-black text-[#07152e]">Product Not Found</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto font-medium">
            The product you are looking for may have been removed or is temporarily unavailable in our inventory catalog.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#082f89] hover:bg-[#0e45c4] text-white px-6 py-3 rounded-full text-xs font-black transition-all shadow-md mt-4"
          >
            <ArrowLeft size={16} /> Explore All Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setOpen(true);
  };

  const savings = product.price && product.oldPrice && product.oldPrice > product.price 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const savingsAmount = product.price && product.oldPrice && product.oldPrice > product.price 
    ? product.oldPrice - product.price 
    : 0;

  // Find related products in same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && String(p.id) !== String(product.id))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#07152e]">
      <SEO 
        title={`${product.name} | RGMS Official Store`}
        description={product.description || `Buy ${product.name} at best price in India with Express Delivery.`}
        canonical={`/product/${convertToSlug(product.name)}-${product.id}`}
      />
      <Header />

      {/* Main Content Area */}
      <main className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8 space-y-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-[#64748b] flex-wrap">
          <Link to="/" className="hover:text-[#082f89] transition-colors">Home</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <Link to="/products" className="hover:text-[#082f89] transition-colors">Products</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <Link to={`/category/${product.category}`} className="hover:text-[#082f89] transition-colors uppercase font-bold text-[#082f89]">
            {product.category}
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-[#07152e] font-extrabold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Hero Showcase Grid */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-[0_10px_35px_rgba(8,47,137,0.06)] grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Product Image Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-gradient-to-b from-[#f8fafc] to-slate-100 rounded-3xl p-6 border border-slate-200/80 relative flex items-center justify-center min-h-[340px] md:min-h-[420px] overflow-hidden group">
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.badge && (
                  <span className="bg-[#f00102] text-white text-[10.5px] font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-md">
                    {product.badge}
                  </span>
                )}
              </div>

              {savings > 0 && (
                <span className="absolute top-4 right-4 bg-[#01a345] text-white text-[10.5px] font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-md z-10">
                  {savings}% OFF
                </span>
              )}

              {/* Main Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[300px] md:max-h-[360px] max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>


          </div>

          {/* Right Column: Details, Price & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header info */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-4">
                <span className="bg-[#e8eeff] text-[#082f89] text-[10.5px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category}
                </span>

                {/* Rating */}
                <div className="flex items-center gap-1.5 bg-[#f8fafc] px-3 py-1 rounded-full border border-slate-200">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star 
                        key={s} 
                        size={13} 
                        className={s <= Math.round(product.rating || 5) ? 'fill-[#f5a623] text-[#f5a623]' : 'fill-slate-200 text-slate-200'} 
                      />
                    ))}
                  </div>
                  <span className="text-[11.5px] font-bold text-[#07152e] tabular-nums">
                    {(product.rating || 5).toFixed(1)} ({product.reviews || 0} reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#07152e] leading-tight tracking-tight">
                {product.name}
              </h1>
            </div>

            {/* Price Box */}
            <div className="bg-gradient-to-br from-[#e8eeff]/60 to-[#f8fafc] rounded-2xl p-5 border border-[#082f89]/20 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#082f89] tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-base text-slate-400 line-through font-bold tabular-nums">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>

                {savingsAmount > 0 && (
                  <p className="text-xs font-black text-[#01a345] mt-1">
                    You Save {formatPrice(savingsAmount)} ({savings}% Discount)
                  </p>
                )}
              </div>

              <div className="bg-[#e2f5ec] text-[#01a345] text-xs font-extrabold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-[#01a345]/30">
                <CheckCircle2 size={14} /> In Stock (Ready to Ship)
              </div>
            </div>

            {/* Description Short */}
            <p className="text-xs sm:text-sm text-[#4a5568] leading-relaxed font-medium">
              {product.description || 'Official RGMS Smart Security Device engineered for 24/7 protection, instant motion alerts, HD video clarity, and seamless mobile access.'}
            </p>

            {/* Key Features Bullet points */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-black text-[#07152e] uppercase tracking-wider">Key Highlights:</p>
                <div className="grid sm:grid-cols-2 gap-2 text-xs font-bold text-[#334155]">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-[#01a345] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              
              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-black text-[#07152e] uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center border-2 border-slate-200 rounded-xl bg-[#f8fafc] overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-slate-200 text-[#07152e] transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center font-black text-sm text-[#07152e] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-slate-200 text-[#07152e] transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Main CTA Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-white hover:bg-slate-50 border-2 border-[#082f89] text-[#082f89] py-3.5 rounded-2xl font-black text-xs transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag size={18} />
                  <span>Add to Cart ({quantity})</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#082f89] hover:bg-[#0e45c4] text-white py-3.5 rounded-2xl font-black text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Buy Now</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* WhatsApp Direct Inquiry Button */}
              <a
                href={`https://wa.me/917707019501?text=Hello%20RGMS!%20I%20am%20interested%20in%20buying%20${encodeURIComponent(product.name)}%20(${formatPrice(product.price)}).%20Please%20provide%20more%20details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 rounded-2xl font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <WhatsAppIcon size={18} />
                <span>Ask Product Inquiry on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-4 border-b border-slate-200 pb-4 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-2 text-xs sm:text-sm font-black uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'description'
                  ? 'border-[#082f89] text-[#082f89]'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Product Description & Overview
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2 text-xs sm:text-sm font-black uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'border-[#082f89] text-[#082f89]'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`pb-2 text-xs sm:text-sm font-black uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'faq'
                  ? 'border-[#082f89] text-[#082f89]'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Product FAQs & Support
            </button>
          </div>

          {activeTab === 'description' && (
            <div className="space-y-4 text-xs sm:text-sm text-[#4a5568] leading-relaxed font-medium">
              <p>
                {product.description || 'The RGMS Smart Security Device is engineered with cutting-edge AI technology to provide comprehensive protection for Indian homes, offices, and vehicles. Equipped with full HD video clarity, wide-angle surveillance, and remote smartphone connectivity.'}
              </p>
              <p>
                With effortless 2-minute Do-It-Yourself (DIY) setup, zero technician required, RGMS brings unmatched reliability and peace of mind to over 5,000+ protected premises across India.
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-slate-200 flex justify-between">
                <span className="font-extrabold text-slate-500">Brand</span>
                <span className="font-black text-[#07152e]">RGMS Smarthome & Security</span>
              </div>
              <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-slate-200 flex justify-between">
                <span className="font-extrabold text-slate-500">Model ID</span>
                <span className="font-mono font-bold text-[#082f89]">{product.id}</span>
              </div>
              <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-slate-200 flex justify-between">
                <span className="font-extrabold text-slate-500">Category</span>
                <span className="font-bold text-[#07152e] uppercase">{product.category}</span>
              </div>

              <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-slate-200 flex justify-between">
                <span className="font-extrabold text-slate-500">Installation</span>
                <span className="font-bold text-[#07152e]">DIY 2-Minute Setup</span>
              </div>
              <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-slate-200 flex justify-between">
                <span className="font-extrabold text-slate-500">Certifications</span>
                <span className="font-bold text-[#07152e]">ISO 9001:2025 & BIS Certified</span>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3 text-xs">
              <div className="bg-[#f8fafc] rounded-2xl p-4 border border-slate-200 space-y-1">
                <p className="font-black text-[#082f89]">Q: Does this RGMS product require professional installation?</p>
                <p className="text-slate-600 font-medium leading-relaxed">A: No! All RGMS products are engineered for 2-minute Do-It-Yourself (DIY) plug-and-play setup. Step-by-step video help is available over WhatsApp.</p>
              </div>

              <div className="bg-[#f8fafc] rounded-2xl p-4 border border-slate-200 space-y-1">
                <p className="font-black text-[#082f89]">Q: How long does delivery take?</p>
                <p className="text-slate-600 font-medium leading-relaxed">A: Orders are dispatched via Express Delivery within 24 hours. Delivery takes 2–4 business days across India.</p>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Carousel Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-[#07152e] tracking-tight">
              Related Products in <span className="text-[#082f89] uppercase">{product.category}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relProd) => (
                <ProductCard key={relProd.id} product={relProd} />
              ))}
            </div>
          </div>
        )}

        {/* Dedicated FAQ Section */}
        <FAQSection />

      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
