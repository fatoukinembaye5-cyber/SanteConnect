// app/auth/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation rapide du mot de passe
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      const response = await authService.register(formData);
      setSuccess(response.message);
      
      // Redirection vers la page de login après 2 secondes
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f4] flex items-center justify-center p-4 antialiased font-sans">
      
      {/* Conteneur Principal Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full flex min-h-[650px]">
        
        {/* PANNEAU GAUCHE (Identique au Login pour la cohérence visuelle) */}
        <div className="w-1/2 bg-[#003822] text-white p-12 flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-[#004d30] rounded-full opacity-50"></div>
          <div className="absolute bottom-[-30px] left-[-30px] w-32 h-32 bg-[#004d30] rounded-full opacity-30"></div>

          <div className="relative z-10 flex items-center space-x-2">
            <div className="w-4 h-4 bg-emerald-400 rounded-full"></div>
            <span className="font-semibold text-lg tracking-wide">SantéConnect</span>
          </div>

          <div className="relative z-10 my-auto space-y-4">
            <h1 className="text-3xl font-bold leading-tight">
              Rejoignez la communauté SantéConnect
            </h1>
            <p className="text-emerald-100 text-sm leading-relaxed opacity-80">
              Créez votre compte patient en quelques instants pour gérer vos rendez-vous, consulter vos ordonnances et suivre votre dossier médical en ligne de manière sécurisée.
            </p>
          </div>

          <div className="relative z-10 flex items-center space-x-2 text-xs text-emerald-300 bg-[#004d30] bg-opacity-40 p-3 rounded-xl框架">
            <span>🛡️ Vos données médicales sont hautement sécurisées et confidentielles.</span>
          </div>
        </div>

        {/* PANNEAU DROIT (Formulaire d'Inscription) */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-[#fafbfa]">
          <div className="max-w-md w-full mx-auto space-y-5">
            
            {/* Titre */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Inscription Patient</h2>
              <p className="text-sm text-gray-500 mt-1">Créez vos accès pour planifier vos consultations</p>
            </div>

            {/* Alertes d'état */}
            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-50 text-emerald-600 text-xs p-3 rounded-lg border border-emerald-200">
                {success} 🔄 Redirection vers la page de connexion...
              </div>
            )}

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-3">
              
              {/* Groupe Prénom & Nom */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 uppercase tracking-wider mb-1">Prénom</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006b43] text-sm text-gray-700"
                    placeholder="Moussa"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 uppercase tracking-wider mb-1">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006b43] text-sm text-gray-700"
                    placeholder="Diop"
                    required
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-[11px] font-medium text-gray-600 uppercase tracking-wider mb-1">Numéro de Téléphone</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006b43] text-sm text-gray-700"
                  placeholder="+221 77 000 00 00"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-medium text-gray-600 uppercase tracking-wider mb-1">Adresse email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006b43] text-sm text-gray-700"
                  placeholder="moussa@example.sn"
                  required
                />
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-[11px] font-medium text-gray-600 uppercase tracking-wider mb-1">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006b43] text-sm text-gray-700"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Confirmation du mot de passe */}
              <div>
                <label className="block text-[11px] font-medium text-gray-600 uppercase tracking-wider mb-1">Confirmer le mot de passe</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006b43] text-sm text-gray-700"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Bouton s'inscrire */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#006b43] hover:bg-[#005233] text-white font-medium py-2.5 rounded-lg transition-colors duration-200 text-sm shadow-md mt-2 flex justify-center items-center"
              >
                {loading ? (
                  <span className="inline-block animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                ) : null}
                Créer mon compte
              </button>
            </form>

            {/* Lien de retour vers le login */}
            <div className="text-center pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Vous avez déjà un compte ?{' '}
                <button 
                  onClick={() => navigate('/login')} 
                  className="text-[#006b43] font-semibold hover:underline bg-transparent border-none cursor-pointer"
                >
                  Se connecter
                </button>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;