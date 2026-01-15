import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ccb86954`;

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`API Error on ${endpoint}:`, response.status, errorText);
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const text = await response.text();
    if (!text) {
      return {};
    }
    
    return JSON.parse(text);
  } catch (error) {
    console.error(`Fetch error on ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  // Initialize data
  init: () => fetchAPI('/init', { method: 'POST' }),

  // Admin
  login: (password: string) => fetchAPI('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  }),
  changePassword: (currentPassword: string, newPassword: string) => fetchAPI('/admin/change-password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword }),
  }),

  // Logo
  getLogo: () => fetchAPI('/logo'),
  updateLogo: (logoUrl: string) => fetchAPI('/logo', {
    method: 'PUT',
    body: JSON.stringify({ logoUrl }),
  }),

  // Landing page
  getLanding: () => fetchAPI('/landing'),
  updateLanding: (data: any) => fetchAPI('/landing', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Contacts
  getContacts: () => fetchAPI('/contacts'),
  updateContacts: (data: any) => fetchAPI('/contacts', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  getContactInstructions: () => fetchAPI('/contact-instructions'),
  updateContactInstructions: (instructions: string) => fetchAPI('/contact-instructions', {
    method: 'PUT',
    body: JSON.stringify({ instructions }),
  }),

  // Notices
  getNotices: () => fetchAPI('/notices'),
  updateNotices: (data: any) => fetchAPI('/notices', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Resources
  getResources: () => fetchAPI('/resources'),
  updateResources: (data: any) => fetchAPI('/resources', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Footer
  getFooter: () => fetchAPI('/footer'),
  updateFooter: (data: any) => fetchAPI('/footer', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // About
  getAbout: () => fetchAPI('/about'),
  updateAbout: (data: any) => fetchAPI('/about', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};