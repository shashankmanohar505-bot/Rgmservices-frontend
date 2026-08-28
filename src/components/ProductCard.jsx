import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { formatPrice, convertToSlug } from '../mock/mock';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleOpenDetail = (e) => {
    e.stopPropagation();
    navigate(`/product/${convertToSlug(product.name)}-${product.id}`);
  };

  return (
    <div
      onClick={handleOpenDetail}
      className="group bg-white rounded-2xl shadow-[0_4px_16px_rgba(8,47,137,0.06)] hover:shadow-[0_16px_38px_rgba(8,47,137,0.14)] hover:-translate-y-1 transition-all duration-300 p-4 flex flex-col h-full relative overflow-hidden border border-slate-100 cursor-pointer"
      data-testid={`product-card-${product.id}`}
    >
      {product.badge && (
        <span className="absolute top-3 left-3 bg-[#f00102] text-white text-[10.5px] font-bold px-2.5 py-1 rounded-md z-10 shadow-[0_4px_10px_rgba(240,1,2,0.28)]">
          {product.badge}
        </span>
      )}
      <div 
        className="h-[170px] flex items-center justify-center mb-3 overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="max-h-full max-w-full object-contain group-hover:scale-[1.05] transition-transform duration-500 select-none pointer-events-none"
        />
      </div>
      {product.rating && (
        <div className="flex items-center gap-1 mb-1.5 cursor-pointer">
          <div className="flex" aria-label={`Rated ${product.rating} out of 5`}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={12} className={s <= Math.round(product.rating) ? 'fill-[#f5a623] text-[#f5a623]' : 'fill-[#e2e8f0] text-[#e2e8f0]'} />
            ))}
          </div>
          <span className="text-[11px] text-[#082f89] font-bold tabular-nums">{product.rating.toFixed(1)} ({product.reviews} reviews)</span>
        </div>
      )}
      <p 
        className="text-[12.5px] font-medium text-[#1e2c45] hover:text-[#082f89] transition-colors leading-snug line-clamp-2 mb-2 min-h-[32px] cursor-pointer" 
        title={product.name}
      >
        {product.name}
      </p>
      <div className="mt-auto">
        <div className="flex items-center gap-2 mb-3">
          {product.oldPrice && (
            <span className="text-[12px] text-[#9aa7ba] line-through tabular-nums">{formatPrice(product.oldPrice)}</span>
          )}
          <span className="text-[15px] font-bold text-[#082f89] tabular-nums">{formatPrice(product.price)}</span>
        </div>
        <div className="flex gap-2">
          {product.outOfStock ? (
            <button className="flex-1 bg-[#f00102] text-white text-[12px] font-bold py-2.5 rounded-full cursor-not-allowed opacity-90 h-10 flex items-center justify-center" disabled>
              Out of Stock
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="flex-1 btn-primary text-[12px] font-bold py-2.5 rounded-full h-10 flex items-center justify-center active:scale-95 transition-transform"
              data-testid={`add-to-cart-${product.id}`}
            >
              Add to Cart
            </button>
          )}
          <Link 
            to={`/product/${convertToSlug(product.name)}-${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-white border border-[#d4dce7] hover:border-[#082f89] hover:text-[#082f89] text-[#1e2c45] text-[12px] font-bold py-2.5 rounded-full h-10 flex items-center justify-center transition-colors active:scale-95"
            data-testid={`view-more-${product.id}`}
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
