import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { 
  loginAdminAPI, uploadProductImageAPI, verifyTokenAPI, 
  fetchContactMessagesAPI, markContactMessageReadAPI, deleteContactMessageAPI 
} from '../services/api';
import SEO from './SEO';
import { WhatsAppIcon } from './BottomSections';
import { 
  Package, Plus, Edit3, Trash2, Search, SlidersHorizontal, 
  ShieldCheck, Upload, LogOut, Lock, User, CheckCircle2, X, RefreshCw, Layers, Sparkles, Image as ImageIcon,
  MessageSquare, Mail, Phone, Clock, Eye, Check, ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';

export const AdminPanel = () => {
  const { products, addProduct, updateProduct, deleteProduct, clearAllProducts, refreshProducts, loading } = useProducts();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleClearAll = async () => {
    if (window.confirm('⚠️ WARNING: Are you sure you want to DELETE ALL PRODUCTS from inventory?')) {
      await clearAllProducts();
      toast.success('All products deleted from inventory catalog.');
    }
  };
  const [authChecking, setAuthChecking] = useState(true);

  // Tab State: 'products' | 'messages'
  const [activeTab, setActiveTab] = useState('products');

  // Contact Messages State
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'cctv-camera',
    price: '',
    oldPrice: '',
    badge: 'NEW',
    stock: 20,
    image: '',
    description: '',
    featuresText: 'Free Express Shipping Across India'
  });

  // Fetch Contact Messages
  const loadMessages = useCallback(async () => {
    setLoadingMessages(true);
    try {
      const data = await fetchContactMessagesAPI();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (err) {
      console.warn('Error loading messages:', err.message);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadMessages();
    }
  }, [isAuthenticated, loadMessages]);

  const handleMarkRead = async (id) => {
    try {
      await markContactMessageReadAPI(id);
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: 'read' } : m)));
      toast.success('Message marked as read');
    } catch (err) {
      toast.error('Failed to update message');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm('Delete this message from admin record?')) {
      try {
        await deleteContactMessageAPI(id);
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage && selectedMessage.id === id) setSelectedMessage(null);
        toast.success('Message deleted');
      } catch (err) {
        toast.error('Failed to delete message');
      }
    }
  };

  // Verify stored JWT token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('rgms_admin_token');
      if (token) {
        const isValid = await verifyTokenAPI();
        if (isValid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('rgms_admin_token');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setAuthChecking(false);
    };
    checkAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSubmitting(true);
    try {
      const data = await loginAdminAPI(loginUsername, loginPassword);
      localStorage.setItem('rgms_admin_token', data.token);
      setIsAuthenticated(true);
      toast.success('Successfully logged in to Admin Panel!');
    } catch (err) {
      setLoginError(err.message || 'Invalid username or password');
      toast.error(err.message || 'Login failed');
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('rgms_admin_token');
    setIsAuthenticated(false);
    toast.info('Logged out from Admin Panel');
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'cctv-camera',
      price: '',
      oldPrice: '',
      badge: 'NEW',
      stock: 20,
      image: '',
      description: '',
      featuresText: 'Free Express Shipping Across India',
      isDeal: false,
      isNewArrival: true,
      isBestSeller: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name || '',
      category: prod.category || 'cctv-camera',
      price: prod.price || '',
      oldPrice: prod.oldPrice || '',
      badge: prod.badge || 'NEW',
      stock: prod.stock !== undefined ? prod.stock : 20,
      image: prod.image || '/assets/asset-1.png',
      description: prod.description || '',
      featuresText: Array.isArray(prod.features) ? prod.features.join('\n') : '',
      isDeal: Boolean(prod.isDeal),
      isNewArrival: prod.isNewArrival !== undefined ? Boolean(prod.isNewArrival) : true,
      isBestSeller: Boolean(prod.isBestSeller),
    });
    setIsModalOpen(true);
  };

  // Image Upload handler (Cloudinary API integration)
  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const uploadedUrl = await uploadProductImageAPI(file);
      setFormData((prev) => ({ ...prev, image: uploadedUrl }));
      toast.success('Product image uploaded successfully!');
    } catch (err) {
      // Fallback base64 preview if Cloudinary API is offline
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
        toast.info('Image loaded in local preview.');
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Product Name is required!');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      category: formData.category,
      price: formData.price ? Number(formData.price) : null,
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      badge: formData.badge,
      stock: Number(formData.stock) || 0,
      image: formData.image || '/assets/asset-1.png',
      description: formData.description || 'Official RGMS Smart Security Device.',
      features: formData.featuresText
        ? formData.featuresText.split('\n').filter((f) => f.trim().length > 0)
        : ['Dedicated Tech Support'],
      isDeal: Boolean(formData.isDeal),
      isNewArrival: Boolean(formData.isNewArrival),
      isBestSeller: Boolean(formData.isBestSeller),
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
        toast.success('Product updated successfully!');
      } else {
        await addProduct(payload);
        toast.success('New product added to catalog successfully!');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to save product');
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from inventory?`)) {
      try {
        await deleteProduct(id);
        toast.success(`Deleted ${name}`);
      } catch (err) {
        toast.error(err.message || `Failed to delete "${name}"`);
      }
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.id && p.id.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#041b54] flex items-center justify-center text-white">
        <div className="flex items-center gap-3 text-sm font-bold">
          <RefreshCw className="animate-spin text-[#01a345]" size={20} />
          Verifying Admin Credentials...
        </div>
      </div>
    );
  }

  // Render Login Form if Not Authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#041b54] via-[#082f89] to-[#041b54] flex items-center justify-center p-4">
        <SEO title="Admin Login | RGMS Smarthome & Security" description="RGMS Admin Portal" />

        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-[0_30px_90px_rgba(0,0,0,0.3)] border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#e8eeff] text-[#082f89] flex items-center justify-center mx-auto mb-3 shadow-inner">
              <ShieldCheck size={36} />
            </div>
            <h1 className="text-2xl font-black text-[#07152e]">RGMS Management Center</h1>
            <p className="text-xs text-[#64748b] font-medium mt-1">Sign in with your credentials to manage inventory & products.</p>
          </div>

          {loginError && (
            <div className="bg-[#fee2e2] text-[#f00102] text-xs font-bold p-3 rounded-xl mb-4 border border-[#fca5a5] flex items-center gap-2">
              <X size={16} /> {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-[#07152e] uppercase mb-1">Username</label>
              <div className="relative flex items-center">
                <User size={16} className="absolute left-3 text-slate-400" />
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-9 pr-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold text-[#07152e] focus:outline-none focus:ring-2 focus:ring-[#082f89]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#07152e] uppercase mb-1">Password</label>
              <div className="relative flex items-center">
                <Lock size={16} className="absolute left-3 text-slate-400" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full pl-9 pr-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold text-[#07152e] focus:outline-none focus:ring-2 focus:ring-[#082f89]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginSubmitting}
              className="w-full bg-[#082f89] hover:bg-[#0e45c4] text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {loginSubmitting ? <RefreshCw size={16} className="animate-spin" /> : <Lock size={16} />}
              <span>Authenticate & Access Admin</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs font-extrabold text-[#082f89] hover:underline">
              ← Return to Main Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#07152e]">
      <SEO title="Admin Inventory Manager | RGMS Official Store" description="Manage RGMS products catalog" />

      {/* Admin Top Header */}
      <header className="bg-[#041b54] text-white py-4 px-4 lg:px-8 border-b border-white/10 sticky top-0 z-40 shadow-lg">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#01a345] text-white flex items-center justify-center shadow-md">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight">RGMS Catalog Manager</h1>
              <p className="text-[11px] text-[#cbd5e1] font-semibold">MongoDB / Express REST API & Cloudinary Enabled</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshProducts}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
              title="Refresh Catalog from Backend"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              to="/products"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Package size={14} />
              <span className="hidden sm:inline">View Store</span>
            </Link>

            <button
              onClick={handleLogout}
              className="bg-[#f00102] hover:bg-[#d00102] text-white text-xs font-extrabold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1360px] mx-auto px-4 lg:px-8 py-8 space-y-8">
        {isModalOpen ? (
          <div className="space-y-6 animate-fadeSlideIn">
            {/* Inline Page View Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#082f89] text-white flex items-center justify-center shadow-md">
                  {editingProduct ? <Edit3 size={20} /> : <Plus size={20} />}
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#07152e]">
                    {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Add New Product to Catalog'}
                  </h2>
                  <p className="text-xs text-[#64748b] font-medium">Enter details below to publish live to RGMS storefront.</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-white border border-[#d4dce7] hover:border-[#082f89] hover:text-[#082f89] text-[#1e2c45] text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <ArrowLeft size={16} />
                <span>Back to Catalog</span>
              </button>
            </div>

            {/* Inline Form Body */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm max-w-3xl mx-auto">
              <form onSubmit={handleSubmitForm} className="space-y-4 text-xs font-bold text-[#07152e]">
                <div>
                  <label className="block mb-1 font-extrabold uppercase">Product Title / Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. RGMS Smart 4G Solar Surveillance Camera"
                    className="w-full p-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#082f89]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-extrabold uppercase">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#082f89]"
                    >
                      <option value="cctv-camera">CCTV Camera</option>
                      <option value="wifi-cameras">WiFi Camera</option>
                      <option value="solar-cameras">Solar Camera</option>
                      <option value="gps-trackers">GPS Tracker</option>
                      <option value="wired-gps">Wired GPS</option>
                      <option value="magnet-gps">Magnetic GPS</option>
                      <option value="accessories">All Accessories</option>
                      <option value="access-control">Access Control System</option>
                      <option value="door-lock">Smart Door Lock</option>
                      <option value="intercom">Intercom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 font-extrabold uppercase">Badge Tag</label>
                    <select
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      className="w-full p-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#082f89]"
                    >
                      <option value="HOT">HOT</option>
                      <option value="NEW">NEW</option>
                      <option value="SALE">SALE</option>
                      <option value="BESTSELLER">BESTSELLER</option>
                      <option value="FLAT 48% OFF">FLAT 48% OFF</option>
                      <option value="SOLAR 4G">SOLAR 4G</option>
                      <option value="WIRELESS">WIRELESS</option>
                      <option value="4K">4K</option>
                    </select>
                  </div>
                </div>

                {/* Homepage Section Placement Toggles */}
                <div className="bg-[#e8eeff]/60 border border-[#082f89]/20 rounded-xl p-3.5 space-y-2">
                  <label className="block font-extrabold uppercase text-[#082f89]">Homepage Display Sections</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-lg border border-slate-200 hover:border-[#082f89]">
                      <input
                        type="checkbox"
                        checked={Boolean(formData.isDeal)}
                        onChange={(e) => setFormData({ ...formData, isDeal: e.target.checked })}
                        className="w-4 h-4 text-[#082f89] rounded focus:ring-2 focus:ring-[#082f89]"
                      />
                      <span className="text-xs font-extrabold text-[#07152e]">Deals in FOCUS</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-lg border border-slate-200 hover:border-[#082f89]">
                      <input
                        type="checkbox"
                        checked={Boolean(formData.isNewArrival)}
                        onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                        className="w-4 h-4 text-[#082f89] rounded focus:ring-2 focus:ring-[#082f89]"
                      />
                      <span className="text-xs font-extrabold text-[#07152e]">New Arrivals</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-lg border border-slate-200 hover:border-[#082f89]">
                      <input
                        type="checkbox"
                        checked={Boolean(formData.isBestSeller)}
                        onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                        className="w-4 h-4 text-[#082f89] rounded focus:ring-2 focus:ring-[#082f89]"
                      />
                      <span className="text-xs font-extrabold text-[#07152e]">Best Sellers</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-1 font-extrabold uppercase">Selling Price (₹)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="1999"
                      className="w-full p-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#082f89]"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-extrabold uppercase">Original Price (₹)</label>
                    <input
                      type="number"
                      value={formData.oldPrice}
                      onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                      placeholder="3999"
                      className="w-full p-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#082f89]"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-extrabold uppercase">Stock Count</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="20"
                      className="w-full p-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#082f89]"
                    />
                  </div>
                </div>

                {/* Product Image Section: File Upload or Direct URL */}
                <div className="space-y-2 border-t border-b border-slate-100 py-3 my-2">
                  <label className="block font-extrabold uppercase">Product Image (Cloudinary Integration)</label>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-[#f8fafc] border border-slate-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                      {formData.image ? (
                        <img src={formData.image} alt="" className="max-h-full max-w-full object-contain" />
                      ) : (
                        <ImageIcon size={22} className="text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <label className="inline-flex items-center gap-2 bg-[#e8eeff] hover:bg-[#082f89] hover:text-white text-[#082f89] font-extrabold text-xs px-4 py-2.5 rounded-xl cursor-pointer transition-colors shadow-xs">
                        {uploadingImage ? <RefreshCw size={14} className="animate-spin" /> : <Upload size={14} />}
                        <span>{uploadingImage ? 'Uploading to Cloudinary...' : 'Upload Image File'}</span>
                        <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" disabled={uploadingImage} />
                      </label>
                      <p className="text-[10px] text-[#64748b] font-medium">Or paste direct image URL below:</p>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="Paste Cloudinary image URL or file path..."
                        className="w-full p-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-[11px] font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-extrabold uppercase">Product Description</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Comprehensive description of product..."
                    className="w-full p-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-extrabold uppercase">Key Features (One feature per line)</label>
                  <textarea
                    rows={3}
                    value={formData.featuresText}
                    onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                    placeholder="Remote Engine Cutoff&#10;Live Voice Listening"
                    className="w-full p-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold focus:outline-none font-mono"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#07152e] font-extrabold text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-[#082f89] hover:bg-[#0e45c4] text-white font-extrabold text-xs shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={16} />
                    <span>{editingProduct ? 'Save Changes' : 'Publish Product'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            {/* Dashboard Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-black text-[#64748b] uppercase tracking-wider">Total Products</p>
                  <p className="text-2xl font-black text-[#082f89] mt-1">{products.length}</p>
                </div>
                <div className="w-11 h-11 bg-[#e8eeff] text-[#082f89] rounded-xl flex items-center justify-center">
                  <Package size={22} />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-black text-[#64748b] uppercase tracking-wider">Contact Messages</p>
                  <p className="text-2xl font-black text-[#01a345] mt-1">
                    {messages.length}
                    {messages.filter(m => m.status === 'unread').length > 0 && (
                      <span className="text-xs bg-[#f00102] text-white px-2 py-0.5 rounded-full ml-2 font-black">
                        {messages.filter(m => m.status === 'unread').length} NEW
                      </span>
                    )}
                  </p>
                </div>
                <div className="w-11 h-11 bg-[#e2f5ec] text-[#01a345] rounded-xl flex items-center justify-center">
                  <MessageSquare size={22} />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-black text-[#64748b] uppercase tracking-wider">Active Badges</p>
                  <p className="text-2xl font-black text-[#f00102] mt-1">
                    {products.filter(p => p.badge && p.badge !== 'NONE').length}
                  </p>
                </div>
                <div className="w-11 h-11 bg-[#fee2e2] text-[#f00102] rounded-xl flex items-center justify-center">
                  <Sparkles size={22} />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-black text-[#64748b] uppercase tracking-wider">In Stock Inventory</p>
                  <p className="text-2xl font-black text-[#07152e] mt-1">
                    {products.reduce((acc, p) => acc + (p.stock || 0), 0)} pcs
                  </p>
                </div>
                <div className="w-11 h-11 bg-[#f1f5f9] text-[#07152e] rounded-xl flex items-center justify-center">
                  <CheckCircle2 size={22} />
                </div>
              </div>
            </div>

            {/* Tab Navigation Bar */}
            <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'products'
                    ? 'bg-[#082f89] text-white shadow-md'
                    : 'text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#07152e]'
                }`}
              >
                <Package size={16} />
                <span>Products Catalog ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 relative ${
                  activeTab === 'messages'
                    ? 'bg-[#082f89] text-white shadow-md'
                    : 'text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#07152e]'
                }`}
              >
                <MessageSquare size={16} />
                <span>Contact Messages ({messages.length})</span>
                {messages.filter((m) => m.status === 'unread').length > 0 && (
                  <span className="bg-[#f00102] text-white text-[9.5px] font-black px-2 py-0.5 rounded-full uppercase animate-pulse">
                    {messages.filter((m) => m.status === 'unread').length} NEW
                  </span>
                )}
              </button>
            </div>

            {/* Action Bar & Table Controls */}
            {activeTab === 'products' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <h2 className="text-xl font-black text-[#07152e]">Store Inventory Catalog</h2>
                    <p className="text-xs text-[#64748b] font-medium mt-0.5">Manage products across Home sections, Categories, and Search</p>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    {products.length > 0 && (
                      <button
                        onClick={handleClearAll}
                        className="bg-[#fee2e2] hover:bg-[#f00102] hover:text-white text-[#f00102] text-xs font-black px-4 py-3 rounded-2xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                        title="Delete all products from inventory"
                      >
                        <Trash2 size={16} />
                        <span>Delete All Products</span>
                      </button>
                    )}

                    <button
                      onClick={openAddModal}
                      className="bg-[#082f89] hover:bg-[#0e45c4] text-white text-xs font-black px-5 py-3 rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Plus size={18} />
                      <span>Add New Product</span>
                    </button>
                  </div>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="relative flex-1 w-full">
                    <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products by title or ID..."
                      className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold text-[#07152e] focus:outline-none focus:ring-2 focus:ring-[#082f89]"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full md:w-auto pb-1 md:pb-0">
                    <SlidersHorizontal size={16} className="text-slate-400 shrink-0" />
                    {['all', 'cctv-camera', 'wifi-cameras', 'solar-cameras', 'gps-trackers', 'wired-gps', 'magnet-gps', 'accessories', 'access-control', 'door-lock', 'intercom'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all uppercase tracking-wider ${
                          selectedCategory === cat
                            ? 'bg-[#082f89] text-white shadow-sm'
                            : 'bg-[#f1f5f9] text-[#64748b] hover:bg-[#e8eeff] hover:text-[#082f89]'
                        }`}
                      >
                        {cat.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Inventory Table */}
                <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-[#041b54] text-white text-[11px] font-black uppercase tracking-wider">
                        <th className="p-3.5 pl-5">Product Details</th>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Price</th>
                        <th className="p-3.5">Badge</th>
                        <th className="p-3.5">Stock</th>
                        <th className="p-3.5 pr-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-semibold text-[#07152e]">
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-10 text-center text-slate-400 font-bold">
                            No products found matching your search query.
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((prod) => (
                          <tr key={prod.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3.5 pl-5">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-[#f8fafc] p-1 border border-slate-200 shrink-0 flex items-center justify-center overflow-hidden">
                                  <img src={prod.image} alt="" className="max-h-full max-w-full object-contain" />
                                </div>
                                <div>
                                  <p className="font-extrabold text-[#07152e] text-[13px] line-clamp-1">{prod.name}</p>
                                  <p className="text-[10.5px] text-[#64748b] font-mono mt-0.5">ID: {prod.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5">
                              <span className="bg-[#e8eeff] text-[#082f89] text-[10.5px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">
                                {prod.category}
                              </span>
                            </td>
                            <td className="p-3.5 font-extrabold text-[#082f89]">
                              {prod.price !== null && prod.price !== undefined && prod.price !== '' ? `₹${prod.price}` : 'Price on Request'}
                              {prod.oldPrice && (
                                <span className="text-[11px] text-[#94a3b8] line-through font-semibold ml-1.5">₹{prod.oldPrice}</span>
                              )}
                            </td>
                            <td className="p-3.5">
                              {prod.badge ? (
                                <span className="bg-[#f00102] text-white text-[9.5px] font-black px-2 py-0.5 rounded uppercase">
                                  {prod.badge}
                                </span>
                              ) : (
                                <span className="text-slate-300">-</span>
                              )}
                            </td>
                            <td className="p-3.5">
                              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                (prod.stock || 20) > 5 ? 'bg-[#e2f5ec] text-[#01a345]' : 'bg-[#fee2e2] text-[#f00102]'
                              }`}>
                                {prod.stock !== undefined ? prod.stock : 20} in stock
                              </span>
                            </td>
                            <td className="p-3.5 pr-5 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openEditModal(prod)}
                                  className="bg-[#e8eeff] hover:bg-[#082f89] hover:text-white text-[#082f89] p-2 rounded-xl transition-all"
                                  title="Edit Product"
                                >
                                  <Edit3 size={15} />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(prod.id, prod.name)}
                                  className="bg-[#fee2e2] hover:bg-[#f00102] hover:text-white text-[#f00102] p-2 rounded-xl transition-all"
                                  title="Delete Product"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Contact Messages View */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <h2 className="text-xl font-black text-[#07152e]">Customer Contact Messages</h2>
                    <p className="text-xs text-[#64748b] font-medium mt-0.5">Inquiries submitted from the Contact Us form</p>
                  </div>

                  <button
                    onClick={loadMessages}
                    className="bg-[#e8eeff] hover:bg-[#082f89] hover:text-white text-[#082f89] text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all"
                  >
                    <RefreshCw size={14} className={loadingMessages ? 'animate-spin' : ''} />
                    <span>Refresh Messages</span>
                  </button>
                </div>

                {messages.length === 0 ? (
                  <div className="py-16 text-center text-slate-400 space-y-2">
                    <MessageSquare size={40} className="mx-auto text-slate-300" />
                    <p className="text-sm font-bold text-[#07152e]">No contact messages received yet</p>
                    <p className="text-xs text-[#64748b]">Submissions from visitors on the Contact Us page will show up here.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead>
                        <tr className="bg-[#041b54] text-white text-[11px] font-black uppercase tracking-wider">
                          <th className="p-3.5 pl-5">Status</th>
                          <th className="p-3.5">Customer</th>
                          <th className="p-3.5">Contact Details</th>
                          <th className="p-3.5">Topic / Subject</th>
                          <th className="p-3.5">Date</th>
                          <th className="p-3.5 pr-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs font-semibold text-[#07152e]">
                        {messages.map((msg) => (
                          <tr key={msg.id} className={`hover:bg-slate-50 transition-colors ${msg.status === 'unread' ? 'bg-[#e8eeff]/30 font-bold' : ''}`}>
                            <td className="p-3.5 pl-5">
                              {msg.status === 'unread' ? (
                                <span className="bg-[#f00102] text-white text-[9.5px] font-black px-2 py-0.5 rounded uppercase animate-pulse">
                                  NEW
                                </span>
                              ) : (
                                <span className="bg-slate-100 text-slate-600 text-[9.5px] font-bold px-2 py-0.5 rounded uppercase">
                                  READ
                                </span>
                              )}
                            </td>
                            <td className="p-3.5 font-extrabold text-[#07152e]">
                              {msg.name}
                            </td>
                            <td className="p-3.5 space-y-0.5">
                              <p className="flex items-center gap-1 text-[#082f89] font-bold"><Phone size={12} /> {msg.phone}</p>
                              {msg.email && <p className="flex items-center gap-1 text-[#64748b] text-[11px]"><Mail size={12} /> {msg.email}</p>}
                            </td>
                            <td className="p-3.5">
                              <span className="bg-[#e8eeff] text-[#082f89] text-[10.5px] font-black px-2.5 py-0.5 rounded-lg">
                                {msg.subject}
                              </span>
                              <p className="text-[11.5px] text-[#4a5568] font-normal line-clamp-2 mt-1 max-w-xs">{msg.message}</p>
                            </td>
                            <td className="p-3.5 text-[#64748b] text-[11px] whitespace-nowrap">
                              {new Date(msg.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="p-3.5 pr-5 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => {
                                    setSelectedMessage(msg);
                                    if (msg.status === 'unread') handleMarkRead(msg.id);
                                  }}
                                  className="bg-[#e8eeff] hover:bg-[#082f89] hover:text-white text-[#082f89] p-2 rounded-xl transition-all flex items-center gap-1 text-[11px] font-bold"
                                  title="View Full Inquiry Details"
                                >
                                  <Eye size={14} />
                                  <span className="hidden sm:inline">View</span>
                                </button>

                                <a
                                  href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(msg.name)},%20thank%20you%20for%20contacting%20RGMS%20Support!`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-2 rounded-xl transition-all flex items-center gap-1 text-[11px] font-bold shadow-xs"
                                  title="Reply via WhatsApp"
                                >
                                  <WhatsAppIcon size={14} />
                                  <span className="hidden xl:inline">WhatsApp</span>
                                </a>

                                {msg.status === 'unread' && (
                                  <button
                                    onClick={() => handleMarkRead(msg.id)}
                                    className="bg-[#e2f5ec] hover:bg-[#01a345] hover:text-white text-[#01a345] p-2 rounded-xl transition-all"
                                    title="Mark as Read"
                                  >
                                    <Check size={14} />
                                  </button>
                                )}

                                <button
                                  onClick={() => handleDeleteMessage(msg.id)}
                                  className="bg-[#fee2e2] hover:bg-[#f00102] hover:text-white text-[#f00102] p-2 rounded-xl transition-all"
                                  title="Delete Message"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* View Selected Inquiry Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-scaleUp space-y-5">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#e8eeff] text-[#082f89] flex items-center justify-center font-black">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#07152e]">Customer Inquiry Details</h3>
                <p className="text-xs text-[#64748b] font-medium">Submitted on {new Date(selectedMessage.createdAt).toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="bg-[#f8fafc] rounded-2xl p-4 border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-extrabold text-[#64748b]">Customer Name</span>
                <span className="font-black text-[#07152e]">{selectedMessage.name}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-extrabold text-[#64748b]">Phone Number</span>
                <a href={`tel:${selectedMessage.phone}`} className="font-black text-[#082f89] hover:underline flex items-center gap-1">
                  <Phone size={12} /> {selectedMessage.phone}
                </a>
              </div>
              {selectedMessage.email && (
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-extrabold text-[#64748b]">Email Address</span>
                  <span className="font-bold text-[#07152e]">{selectedMessage.email}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#64748b]">Subject / Purpose</span>
                <span className="bg-[#e8eeff] text-[#082f89] font-black px-2.5 py-0.5 rounded-lg text-[11px]">
                  {selectedMessage.subject}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#07152e] uppercase tracking-wider">Inquiry Message</label>
              <div className="bg-[#f1f5f9] rounded-2xl p-4 text-xs font-medium text-[#334155] leading-relaxed max-h-48 overflow-y-auto">
                {selectedMessage.message}
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedMessage.name)},%20thank%20you%20for%20contacting%20RGMS%20Support!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <WhatsAppIcon size={16} />
                <span>Reply on WhatsApp</span>
              </a>

              {selectedMessage.status === 'unread' && (
                <button
                  onClick={() => {
                    handleMarkRead(selectedMessage.id);
                    setSelectedMessage((prev) => prev ? { ...prev, status: 'read' } : null);
                  }}
                  className="bg-[#e2f5ec] hover:bg-[#01a345] hover:text-white text-[#01a345] px-4 py-3 rounded-2xl font-black text-xs transition-all"
                >
                  Mark Read
                </button>
              )}

              <button
                onClick={() => handleDeleteMessage(selectedMessage.id)}
                className="bg-[#fee2e2] hover:bg-[#f00102] hover:text-white text-[#f00102] px-4 py-3 rounded-2xl font-black text-xs transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPanel;
