import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { dealsProducts, newArrivals, bestSellers, heroSlides as initialHeroSlides } from '../mock/mock';
import { 
  fetchProductsFromAPI, addProductAPI, updateProductAPI, deleteProductAPI, deleteAllProductsAPI,
  fetchHeroSlidesAPI, addHeroSlideAPI, updateHeroSlideAPI, deleteHeroSlideAPI
} from '../services/api';
import ProductDetailModal from '../components/ProductDetailModal';

const ProductContext = createContext();

const initialMockProducts = () => {
  const map = new Map();

  dealsProducts.forEach((p) => {
    if (p && p.id) map.set(p.id, { ...p, isDeal: true, isNewArrival: false, isBestSeller: false });
  });

  newArrivals.forEach((p) => {
    if (p && p.id) {
      const existing = map.get(p.id) || p;
      map.set(p.id, { ...existing, isNewArrival: true });
    }
  });

  bestSellers.forEach((p) => {
    if (p && p.id) {
      const existing = map.get(p.id) || p;
      map.set(p.id, { ...existing, isBestSeller: true });
    }
  });

  return Array.from(map.values());
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('rgms_products');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter((p) => !p.id?.startsWith('gps-') && !p.id?.startsWith('deal-') && !p.id?.startsWith('new-') && !p.id?.startsWith('best-'));
        }
      }
    } catch (e) {
      // ignore
    }
    return [];
  });

  // Stale-While-Revalidate: Instant 0ms render if cached products exist
  const [loading, setLoading] = useState(() => {
    try {
      const saved = localStorage.getItem('rgms_products');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return false;
        }
      }
    } catch (e) {}
    return true;
  });

  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Hero Slides State
  const [heroSlides, setHeroSlides] = useState(() => {
    try {
      const saved = localStorage.getItem('rgms_hero_slides');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return initialHeroSlides;
  });
  const [heroSlidesLoading, setHeroSlidesLoading] = useState(false);

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  // Sync products from Express backend REST API in background
  const refreshProducts = useCallback(async () => {
    // If no products in cache, show skeleton indicator
    setProducts((current) => {
      if (!current || current.length === 0) {
        setLoading(true);
      }
      return current;
    });

    try {
      const apiData = await fetchProductsFromAPI('all');
      if (apiData && Array.isArray(apiData)) {
        const realProducts = apiData.filter(
          (p) => !p.id?.startsWith('gps-') && !p.id?.startsWith('deal-') && !p.id?.startsWith('new-') && !p.id?.startsWith('best-')
        );
        setProducts(realProducts);
        try {
          localStorage.setItem('rgms_products', JSON.stringify(realProducts));
        } catch (e) {
          console.warn('localStorage quota warning:', e.message);
        }
        setError(null);
      }
    } catch (err) {
      console.warn('Using cached products state:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch Hero Slides from Backend API
  const refreshHeroSlides = useCallback(async () => {
    setHeroSlidesLoading(true);
    try {
      const apiSlides = await fetchHeroSlidesAPI();
      if (apiSlides && Array.isArray(apiSlides) && apiSlides.length > 0) {
        setHeroSlides(apiSlides);
        try {
          localStorage.setItem('rgms_hero_slides', JSON.stringify(apiSlides));
        } catch (e) {}
      }
    } catch (err) {
      console.warn('Using cached hero slides state:', err.message);
    } finally {
      setHeroSlidesLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
    refreshHeroSlides();
  }, [refreshProducts, refreshHeroSlides]);

  // Add Product (calls backend REST API + updates frontend state)
  const addProduct = async (newProdData) => {
    const payload = {
      ...newProdData,
      isDeal: Boolean(newProdData.isDeal),
      isNewArrival: newProdData.isNewArrival !== undefined ? Boolean(newProdData.isNewArrival) : true,
      isBestSeller: Boolean(newProdData.isBestSeller),
    };

    try {
      const createdProd = await addProductAPI(payload);
      setProducts((prev) => {
        const updated = [createdProd, ...prev];
        localStorage.setItem('rgms_products', JSON.stringify(updated));
        return updated;
      });
      return createdProd;
    } catch (err) {
      const token = localStorage.getItem('rgms_admin_token');
      if (token) {
        throw err;
      }
      // Fallback local creation if token/backend not configured
      const fallbackProd = {
        id: `prod-${Date.now()}`,
        ...payload,
        price: Number(payload.price),
        oldPrice: payload.oldPrice ? Number(payload.oldPrice) : null,
        rating: Number(payload.rating) || 5.0,
        reviews: Number(payload.reviews) || 0,
        stock: Number(payload.stock) || 20,
        image: payload.image || '/assets/asset-1.png'
      };
      setProducts((prev) => {
        const updated = [fallbackProd, ...prev];
        localStorage.setItem('rgms_products', JSON.stringify(updated));
        return updated;
      });
      return fallbackProd;
    }
  };

  // Update Product
  const updateProduct = async (id, updatedFields) => {
    try {
      const updatedProd = await updateProductAPI(id, updatedFields);
      setProducts((prev) => {
        const updated = prev.map((p) => (p.id === id ? updatedProd : p));
        localStorage.setItem('rgms_products', JSON.stringify(updated));
        return updated;
      });
      return updatedProd;
    } catch (err) {
      const token = localStorage.getItem('rgms_admin_token');
      if (token) {
        throw err;
      }
      setProducts((prev) => {
        const updated = prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
        localStorage.setItem('rgms_products', JSON.stringify(updated));
        return updated;
      });
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      await deleteProductAPI(id);
      setProducts((prev) => {
        const updated = prev.filter((p) => p.id !== id);
        localStorage.setItem('rgms_products', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      const token = localStorage.getItem('rgms_admin_token');
      if (token) {
        throw err;
      }
      setProducts((prev) => {
        const updated = prev.filter((p) => p.id !== id);
        localStorage.setItem('rgms_products', JSON.stringify(updated));
        return updated;
      });
    }
  };

  // Clear All Products
  const clearAllProducts = async () => {
    try {
      await deleteAllProductsAPI();
    } catch (err) {
      // ignore
    }
    setProducts([]);
    localStorage.setItem('rgms_products', JSON.stringify([]));
  };

  // Hero Slide CRUD actions
  const addHeroSlide = async (slideData) => {
    try {
      const res = await addHeroSlideAPI(slideData);
      const newSlide = res.slide || res;
      setHeroSlides((prev) => {
        const updated = [...prev, newSlide];
        localStorage.setItem('rgms_hero_slides', JSON.stringify(updated));
        return updated;
      });
      return newSlide;
    } catch (err) {
      const token = localStorage.getItem('rgms_admin_token');
      if (token) throw err;
      const fallbackSlide = {
        id: `slide-${Date.now()}`,
        ...slideData
      };
      setHeroSlides((prev) => {
        const updated = [...prev, fallbackSlide];
        localStorage.setItem('rgms_hero_slides', JSON.stringify(updated));
        return updated;
      });
      return fallbackSlide;
    }
  };

  const updateHeroSlide = async (id, slideData) => {
    try {
      const res = await updateHeroSlideAPI(id, slideData);
      const updatedSlide = res.slide || res;
      setHeroSlides((prev) => {
        const updated = prev.map((s) => (s.id === id ? updatedSlide : s));
        localStorage.setItem('rgms_hero_slides', JSON.stringify(updated));
        return updated;
      });
      return updatedSlide;
    } catch (err) {
      const token = localStorage.getItem('rgms_admin_token');
      if (token) throw err;
      setHeroSlides((prev) => {
        const updated = prev.map((s) => (s.id === id ? { ...s, ...slideData } : s));
        localStorage.setItem('rgms_hero_slides', JSON.stringify(updated));
        return updated;
      });
      return { id, ...slideData };
    }
  };

  const deleteHeroSlide = async (id) => {
    try {
      await deleteHeroSlideAPI(id);
    } catch (err) {}
    setHeroSlides((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      localStorage.setItem('rgms_hero_slides', JSON.stringify(updated));
      return updated;
    });
  };

  // Section specific getters strictly controlled by Admin placement checkboxes
  const dealsProductsList = products.filter((p) => Boolean(p.isDeal));
  const newArrivalsList = products.filter((p) => Boolean(p.isNewArrival));
  const bestSellersList = products.filter((p) => Boolean(p.isBestSeller));

  return (
    <ProductContext.Provider
      value={{
        products,
        dealsProductsList,
        newArrivalsList,
        bestSellersList,
        loading,
        error,
        selectedProduct,
        openProductModal,
        closeProductModal,
        refreshProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        clearAllProducts,
        // Hero Slides
        heroSlides,
        heroSlidesLoading,
        refreshHeroSlides,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide
      }}
    >
      {children}
      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} onClose={closeProductModal} />
      )}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
