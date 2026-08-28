import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import HeroProduct from './components/HeroProduct';
import DealsSection from './components/DealsSection';
import { NewArrivals, BrandSection, BestSellers, UsageTypes } from './components/ProductSections';
import { CustomerLove, NewsletterCards, Footer } from './components/BottomSections';
import TrustedBy from './components/TrustedBy';
import WhyChooseUs from './components/WhyChooseUs';
import FAQSection from './components/FAQSection';
import VideoShowcase from './components/VideoShowcase';
import StatMarquee from './components/StatMarquee';

import CategoryPage from './components/CategoryPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import AdminPanel from './components/AdminPanel';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ProductProvider } from './context/ProductContext';
import SEO from './components/SEO';

const Home = () => (
  <div className="min-h-screen bg-white overflow-x-hidden">
    <SEO 
      title="RGMS Smarthome & Security | Smart AI CCTV Cameras & GPS Trackers"
      description="Shop RGMS smart security cameras, 4G solar surveillance, vehicle GPS trackers with remote engine lock, and 4K smart projectors. Express shipping and dedicated support across India."
      canonical="/"
    />
    <Header />
    <main>
      <HeroBanner />
      <StatMarquee />
      <HeroProduct />
      <DealsSection />
      <NewArrivals />
      <BestSellers />

      <WhyChooseUs />
      <VideoShowcase />
      <TrustedBy />
      <BrandSection />
      <UsageTypes />
      <FAQSection />
      <CustomerLove />
      <NewsletterCards />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <ProductProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/products" element={<CategoryPage />} />
              <Route path="/shop-all" element={<CategoryPage />} />
              <Route path="/all-products" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/item/:id" element={<ProductDetailPage />} />
              <Route path="/rgmsadmin" element={<AdminPanel />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin-panel" element={<AdminPanel />} />
            </Routes>
          </BrowserRouter>
          <Toaster position="bottom-right" richColors closeButton />
        </ProductProvider>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;
