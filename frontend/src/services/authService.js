// services/authService.js

export const authService = {
  login: async (email, password, role) => {
    // ... ton code de login existant
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