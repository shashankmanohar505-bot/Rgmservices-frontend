import React, { useState } from 'react';
import { X, Star, CheckCircle2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { formatPrice } from '../mock/mock';
import { useCart } from '../context/CartContext';
import { WhatsAppIcon } from './BottomSections';

const ProductDetailModal = ({ product, onClose }) => {
  const cartContext = useCart();
  const addToCart = cartContext?.addToCart || (() => {});
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    onClose();
  };

  const savings = product.oldPrice && product.oldPrice > product.price 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const whatsappMessage = encodeURIComponent(
    `Hello RGMS Team! I am interested in purchasing: "${product.name}" (Price: ${formatPrice(product.price)}). Please provide more details.`
  );

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#020b22]/75 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={onClose}
      data-testid="product-detail-modal-backdrop"
    >
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-auto animate-scaleUp text-[#07152e]"
        onClick={(e) => e.stopPropagation()}
        data-testid="product-detail-modal"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-[#082f89] hover:text-white text-[#07152e] flex items-center justify-center transition-all shadow-sm"
          aria-label="Close product modal"
          data-testid="modal-close-btn"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8">
          {/* Left Column: Image Preview & Badges */}
          <div className="space-y-4">
            <div className="bg-[#f8fafc] rounded-2xl p-6 border border-slate-200/80 flex items-center justify-center min-h-[300px] sm:min-h-[380px] relative overflow-hidden group">
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#f00102] text-white text-xs font-black px-3 py-1 rounded-md shadow-md z-10">
                  {product.badge}
                </span>
              )}
              {savings && (
                <span className="absolute top-3 right-3 bg-[#01a345] text-white text-xs font-black px-3 py-1 rounded-md shadow-md z-10">
                  {savings}% OFF
                </span>
              )}

              <img
                src={product.image || '/assets/asset-1.png'}
                alt={product.name}
                className="max-h-[280px] sm:max-h-[340px] max-w-full object-contain group-hover:scale-105 transition-transform duration-500 select-none"
              />
            </div>


          </div>

          {/* Right Column: Details & Actions */}
          <div className="flex flex-col justify-between space-y-5">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#082f89] bg-[#e8eeff] px-2.5 py-1 rounded-full border border-[#082f89]/20">
                  {product.category || 'RGMS Security'}
                </span>
                
                {product.rating && (
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} className={s <= Math.round(product.rating) ? 'fill-[#f5a623] text-[#f5a623]' : 'fill-[#e2e8f0] text-[#e2e8f0]'} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#082f89]">{product.rating.toFixed(1)} ({product.reviews || 0} reviews)</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-[#07152e] leading-snug mb-3">
                {product.name}
              </h2>

              {/* Price & Savings */}
              <div className="flex items-baseline gap-3 mb-4 p-3.5 bg-[#f8fafc] rounded-2xl border border-slate-200/70">
                <span className="text-2xl sm:text-3xl font-black text-[#082f89]">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="text-sm sm:text-base text-slate-400 line-through font-semibold">{formatPrice(product.oldPrice)}</span>
                )}
                {savings && (
                  <span className="text-xs font-extrabold text-[#01a345] bg-[#01a345]/10 px-2.5 py-1 rounded-full ml-auto">
                    Save {formatPrice(product.oldPrice - product.price)} ({savings}%)
                  </span>
                )}
              </div>

              {/* Product Description */}
              <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed font-medium mb-4">
                {product.description || 'Official RGMS Smart Security Device featuring AI technology, high-definition optics, and robust anti-theft capabilities.'}
              </p>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-1.5 mb-5 text-xs font-semibold text-[#07152e]">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#01a345] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions & Quantity */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-extrabold text-[#07152e] uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center border border-slate-200 rounded-full bg-[#f8fafc] p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 flex items-center justify-center text-[#07152e] transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-[#07152e]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 flex items-center justify-center text-[#07152e] transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <span className="text-xs font-bold text-[#01a345] ml-auto flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#01a345] animate-ping" /> In Stock (Ready to Ship)
                </span>
              </div>

              {/* Main Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-white border-2 border-[#082f89] text-[#082f89] hover:bg-[#082f89] hover:text-white text-xs font-extrabold py-3.5 px-4 rounded-full transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                  data-testid="modal-add-to-cart"
                >
                  <ShoppingBag size={16} /> Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#082f89] hover:bg-[#0e45c4] text-white text-xs font-extrabold py-3.5 px-4 rounded-full transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
                  data-testid="modal-buy-now"
                >
                  Buy Now <ArrowRight size={16} />
                </button>
              </div>

              {/* WhatsApp Inquiry Button */}
              <a
                href={`https://wa.me/917707019501?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-extrabold py-3 px-4 rounded-full transition-all shadow-md active:scale-95"
              >
                <WhatsAppIcon size={16} /> Ask Product Inquiry on WhatsApp
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
