import { apiFetch } from './api';

export const authService = {
  login: async (email, password) => {
    return apiFetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData) => {
    const payload = {
      name: `${userData.prenom} ${userData.nom}`.trim(),
      email: userData.email,
      password: userData.password,
      role: userData.role || 'Patient',
    };

    return apiFetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  me: async () => {
    return apiFetch('/api/me', { method: 'GET' });
  },

  logout: async () => {
    try {
      await apiFetch('/api/logout', { method: 'POST' });
    } catch (err) {
      // ignore logout API errors and clear local storage anyway
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user');
  }
};