export const API_URL = 'http://127.0.0.1:8000/api'

export const api = {
  // Get token from localStorage
  getToken: () => typeof window !== 'undefined' ? localStorage.getItem('iuea_token') : null,

  // Authenticated request helper
  authFetch: async (endpoint: string, options: any = {}) => {
    const token = api.getToken()
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          ...options.headers,
        },
      })

      if (response.status === 401) {
        // Handle unauthorized (optional: trigger logout)
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          localStorage.removeItem('iuea_token')
          localStorage.removeItem('iuea_user')
          localStorage.removeItem('iuea_role')
          window.location.href = '/login'
        }
      }

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.message || `Request failed with status ${response.status}`)
      }

      return data
    } catch (error: any) {
      console.error(`API Error (${endpoint}):`, error)
      if (error.message === 'Failed to fetch') {
        throw new Error('Could not connect to the server. Please ensure the backend is running.')
      }
      throw error
    }
  },

  // Auth
  login: (email: string, password: string) =>
    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then(async r => {
      const data = await r.json().catch(() => null)
      if (!r.ok) {
        throw new Error(data?.message || 'Login failed')
      }
      return data
    }).catch(error => {
      if (error.message === 'Failed to fetch') {
        throw new Error('Could not connect to the server. Please ensure the backend is running.')
      }
      throw error
    }),

  logout: () => api.authFetch('/auth/logout', { method: 'POST' }),
  me: () => api.authFetch('/auth/me'),

  // Dashboard stats
  getStats: () => api.authFetch('/stats'),

  // Products
  getProducts: () => api.authFetch('/products'),
  getPublicProducts: (params: any = {}) => {
    const query = new URLSearchParams(params).toString()
    return fetch(`${API_URL}/products${query ? `?${query}` : ''}`)
      .then(r => r.ok ? r.json() : null)
      .catch(() => null)
  },
  getProductBySlug: (slug: string) =>
    fetch(`${API_URL}/products/${slug}`)
      .then(r => r.ok ? r.json() : null)
      .catch(() => null),
  createProduct: (data: any) => api.authFetch('/products', {
    method: 'POST', body: JSON.stringify(data)
  }),

  // Categories
  getCategories: () =>
    fetch(`${API_URL}/categories`)
      .then(r => r.ok ? r.json() : null)
      .catch(() => null),

  // Orders
  getOrders: () => api.authFetch('/orders'),
  trackOrder: (orderNumber: string) =>
    fetch(`${API_URL}/orders/track/${orderNumber}`)
      .then(r => r.ok ? r.json() : null)
      .catch(() => null),
  updateOrderStatus: (id: number | string, status: string) => api.authFetch(`/orders/${id}/status`, {
    method: 'PUT', body: JSON.stringify({ status })
  }),

  // News
  getNews: () => api.authFetch('/news'),
  getPublicNews: (params: any = {}) => {
    const query = new URLSearchParams(params).toString()
    return fetch(`${API_URL}/news${query ? `?${query}` : ''}`)
      .then(r => r.ok ? r.json() : null)
      .catch(() => null)
  },
  getNewsBySlug: (slug: string) =>
    fetch(`${API_URL}/news/${slug}`)
      .then(r => r.ok ? r.json() : null)
      .catch(() => null),
  createNews: (data: any) => api.authFetch('/news', {
    method: 'POST', body: JSON.stringify(data)
  }),

  // Contacts
  getContacts: () => api.authFetch('/contacts'),
  replyContact: (id: number | string, message: string) => api.authFetch(`/contacts/${id}/reply`, {
    method: 'POST', body: JSON.stringify({ reply_message: message })
  }),

  // Intakes
  getIntakes: () => api.authFetch('/intakes'),
  getPublishedIntakes: () =>
    fetch(`${API_URL}/intakes/published`)
      .then(r => r.ok ? r.json() : null)
      .catch(() => null),
  activateIntake: (id: number | string) => api.authFetch(`/intakes/${id}/activate`, {
    method: 'POST'
  }),

  // Gallery
  getGallery: () => api.authFetch('/gallery'),

  // Super Admin only
  getAdmins: () => api.authFetch('/admins'),
  createAdmin: (data: any) => api.authFetch('/admins', {
    method: 'POST', body: JSON.stringify(data)
  }),
  toggleAdmin: (id: number | string) => api.authFetch(`/admins/${id}/toggle`, {
    method: 'PUT'
  }),
  deleteAdmin: (id: number | string) => api.authFetch(`/admins/${id}`, {
    method: 'DELETE'
  }),
  getLogs: () => api.authFetch('/logs'),

  // SEO Management
  getSeo: (pageName: string) =>
    fetch(`${API_URL}/seo/${pageName}`)
      .then(r => r.ok ? r.json() : null)
      .catch(() => null),
  getAllSeo: () => api.authFetch('/seo'),
  updateSeo: (data: any) => api.authFetch('/seo/update', {
    method: 'POST', body: JSON.stringify(data)
  }),
}

export default api
