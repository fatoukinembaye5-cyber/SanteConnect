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

export const authService = {
  login: async (email, password, role) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: 'demo-token',
          user: {
            email,
            role,
          },
        });
      }, 300);
    });
  },

  // Nouvelle fonction pour l'inscription
  register: async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email && userData.password && userData.nom) {
          resolve({
            success: true,
            message: "Compte créé avec succès !",
            user: userData
          });
        } else {
          reject(new Error("Veuillez remplir tous les champs obligatoires."));
        }
      }, 1000);
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
  }
};