import { apiFetch } from './api';

export async function loginRequest(email, password) {
  return apiFetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export async function registerRequest(name, email, password, role = 'Patient') {
  return apiFetch('/api/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, role })
  });
}

export async function meRequest() {
  return apiFetch('/api/me', { method: 'GET' });
}

export async function logoutRequest() {
  return apiFetch('/api/logout', { method: 'POST' });
}
// services/authService.js

// CORRECTION VITE : Remplacement de process.env par import.meta.env
const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.message || 'Erreur serveur';
    const err = new Error(message);
    err.status = response.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const authService = {
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(res);
  },

  register: async (userData) => {
    // Expecting { name, email, password, role, telephone? }
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(res);
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
  }
};