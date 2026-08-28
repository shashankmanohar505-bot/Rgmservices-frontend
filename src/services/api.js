const PROD_API_BASE = 'https://rgms-backend.vercel.app/api';
const LOCAL_API_BASE = 'http://localhost:5000/api';

let ACTIVE_API_BASE = PROD_API_BASE;

const getApiBase = async () => {
  // In production (Vercel), always use the deployed backend
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    ACTIVE_API_BASE = PROD_API_BASE;
    return ACTIVE_API_BASE;
  }

  // In local development, try localhost first, fallback to production
  try {
    const res = await fetch(`${LOCAL_API_BASE}/health`, { signal: AbortSignal.timeout(1000) });
    if (res.ok) {
      ACTIVE_API_BASE = LOCAL_API_BASE;
      return ACTIVE_API_BASE;
    }
  } catch (e) {
    // Local backend not running, use production
    ACTIVE_API_BASE = PROD_API_BASE;
  }
  return ACTIVE_API_BASE;
};

// Helper to get JWT headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('rgms_admin_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Fetch products from backend
export const fetchProductsFromAPI = async (category = 'all') => {
  try {
    const baseUrl = await getApiBase();
    const res = await fetch(`${baseUrl}/products?category=${category}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (err) {
    console.warn('Backend API fetch error:', err.message);
    return null;
  }
};

// Admin Login with JWT
export const loginAdminAPI = async (username, password) => {
  const baseUrl = await getApiBase();
  const res = await fetch(`${baseUrl}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
};

// Verify JWT Token
export const verifyTokenAPI = async () => {
  try {
    const baseUrl = await getApiBase();
    const res = await fetch(`${baseUrl}/admin/verify`, {
      headers: { ...getAuthHeaders() }
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data.valid;
  } catch (err) {
    return false;
  }
};

// Upload Product Image to Cloudinary via backend
export const uploadProductImageAPI = async (imageFileOrBase64) => {
  try {
    const baseUrl = await getApiBase();
    const formData = new FormData();
    if (imageFileOrBase64 instanceof File) {
      formData.append('image', imageFileOrBase64);
    } else {
      formData.append('image', imageFileOrBase64);
    }

    const res = await fetch(`${baseUrl}/upload`, {
      method: 'POST',
      body: imageFileOrBase64 instanceof File ? formData : JSON.stringify({ image: imageFileOrBase64 }),
      headers: imageFileOrBase64 instanceof File ? {} : { 'Content-Type': 'application/json' }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Image upload failed');
    return data.url;
  } catch (err) {
    console.error('Image upload service error:', err);
    throw err;
  }
};

// Add New Product
export const addProductAPI = async (productData) => {
  const baseUrl = await getApiBase();
  const res = await fetch(`${baseUrl}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(productData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create product');
  return data.product;
};

// Update Product
export const updateProductAPI = async (id, productData) => {
  const baseUrl = await getApiBase();
  const res = await fetch(`${baseUrl}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(productData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update product');
  return data.product;
};

// Delete Product
export const deleteProductAPI = async (id) => {
  const baseUrl = await getApiBase();
  const res = await fetch(`${baseUrl}/products/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders() }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to delete product');
  return data;
};

// Clear All Products
export const deleteAllProductsAPI = async () => {
  const baseUrl = await getApiBase();
  const res = await fetch(`${baseUrl}/products/all`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders() }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to delete all products');
  return data;
};

// Send Contact Message (Public)
export const sendContactMessageAPI = async (contactData) => {
  const newMsgObj = {
    id: `msg-${Date.now()}`,
    name: (contactData.name || '').trim(),
    phone: (contactData.phone || '').trim(),
    email: (contactData.email || '').trim(),
    subject: contactData.subject || 'General Inquiry',
    message: (contactData.message || '').trim(),
    status: 'unread',
    createdAt: new Date().toISOString()
  };

  // Always save to local backup array in localStorage
  try {
    const existing = JSON.parse(localStorage.getItem('rgms_contact_messages') || '[]');
    localStorage.setItem('rgms_contact_messages', JSON.stringify([newMsgObj, ...existing]));
  } catch (e) {
    // ignore
  }

  try {
    const baseUrl = await getApiBase();
    const res = await fetch(`${baseUrl}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send message');
    return data;
  } catch (err) {
    console.warn('Saved message to local storage fallback:', err.message);
    return { message: 'Saved locally', contact: newMsgObj };
  }
};

// Fetch Contact Messages (Admin Protected + localStorage Merge)
export const fetchContactMessagesAPI = async () => {
  let localMsgs = [];
  try {
    localMsgs = JSON.parse(localStorage.getItem('rgms_contact_messages') || '[]');
  } catch (e) {
    localMsgs = [];
  }

  try {
    const baseUrl = await getApiBase();
    const res = await fetch(`${baseUrl}/contact`, {
      headers: { ...getAuthHeaders() }
    });
    if (res.ok) {
      const remoteMsgs = await res.json();
      if (Array.isArray(remoteMsgs)) {
        // Merge remote and local by ID
        const map = new Map();
        [...remoteMsgs, ...localMsgs].forEach(m => {
          if (m && m.id && !map.has(m.id)) map.set(m.id, m);
        });
        const merged = Array.from(map.values()).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        localStorage.setItem('rgms_contact_messages', JSON.stringify(merged));
        return merged;
      }
    }
  } catch (err) {
    console.warn('Backend contact API unavailable, using local messages:', err.message);
  }

  return localMsgs;
};

// Mark Contact Message as Read (Admin Protected)
export const markContactMessageReadAPI = async (id) => {
  try {
    const msgs = JSON.parse(localStorage.getItem('rgms_contact_messages') || '[]');
    const updated = msgs.map(m => m.id === id ? { ...m, status: 'read' } : m);
    localStorage.setItem('rgms_contact_messages', JSON.stringify(updated));
  } catch (e) {
    // ignore
  }

  try {
    const baseUrl = await getApiBase();
    const res = await fetch(`${baseUrl}/contact/${id}/read`, {
      method: 'PUT',
      headers: { ...getAuthHeaders() }
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return { message: 'Marked read locally', id };
  }
};

// Delete Contact Message (Admin Protected)
export const deleteContactMessageAPI = async (id) => {
  try {
    const msgs = JSON.parse(localStorage.getItem('rgms_contact_messages') || '[]');
    const updated = msgs.filter(m => m.id !== id);
    localStorage.setItem('rgms_contact_messages', JSON.stringify(updated));
  } catch (e) {
    // ignore
  }

  try {
    const baseUrl = await getApiBase();
    const res = await fetch(`${baseUrl}/contact/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() }
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return { message: 'Deleted locally', id };
  }
};
