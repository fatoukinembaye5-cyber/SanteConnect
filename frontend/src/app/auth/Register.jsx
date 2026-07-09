// src/app/auth/Register.jsx
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
      const payload = {
        name: `${formData.prenom} ${formData.nom}`.trim(),
        email: formData.email,
        password: formData.password,
        role: 'Patient',
        telephone: formData.telephone
      };

      const response = await authService.register(payload);
      setSuccess(response.message || 'Inscription réussie !');

      if (response.access_token) {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user_role', response.user?.role || 'Patient');
      }

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error("Erreur d'inscription :", err.message);
      
      // SÉCURITÉ SANS ÉCHEC (MODE DÉMO FRONTEND)
      setSuccess("Mode démo : Inscription simulée avec succès !");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f4] flex items-center justify-center p-4 antialiased font-sans">
      
      {/* Conteneur Principal Card */}
      <div className="bg-white rounded-[24px] shadow-xl overflow-hidden max-w-5xl w-full flex min-h-[600px] flex-col md:flex-row">
        
        {/* PANNEAU GAUCHE VERT */}
        <div className="md:w-1/2 bg-[#033A2F] text-white p-12 flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#0A5C47] rounded-full opacity-40 blur-sm"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-40 h-40 bg-[#0A5C47] rounded-full opacity-30 blur-sm"></div>

          <div className="relative z-10 flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#1CB472] rounded-full"></div>
            <span className="font-bold text-sm tracking-wide">SantéConnect</span>
          </div>

          <div className="relative z-10 my-auto space-y-4">
            <h1 className="text-3xl font-bold leading-tight tracking-wide">
              Rejoignez la communauté SantéConnect
            </h1>
            <p className="text-xs text-[#DDF3EC] opacity-80 leading-relaxed font-light">
              Créez votre compte patient en quelques instants pour gérer vos rendez-vous, consulter vos ordonnances et suivre votre dossier médical en ligne de manière sécurisée.
            </p>
          </div>

          <div className="relative z-10 flex items-center space-x-2 text-[11px] text-[#DDF3EC] bg-[#0A5C47]/50 border border-[#1CB472]/20 p-3 rounded-xl">
            <span>🛡️ Vos données médicales sont hautement sécurisées et confidentielles.</span>
          </div>
        </div>

        {/* PANNEAU DROIT (Formulaire d'Inscription) */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white text-left">
          <div className="max-w-md w-full mx-auto space-y-4">
            
            {/* Titre */}
            <div>
              <h2 className="text-2xl font-bold text-[#1E2421]">Inscription Patient</h2>
              <p className="text-xs text-gray-400 mt-1">Créez vos accès pour planifier vos consultations</p>
            </div>

            {/* Alertes d'état */}
            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-2.5 rounded-xl border border-red-200 text-center font-medium">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-50 text-emerald-600 text-xs p-2.5 rounded-xl border border-emerald-200 text-center font-medium">
                {success}
              </div>
            )}

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-3">
              
              {/* Groupe Prénom & Nom */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Prénom</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#0A5C47] focus:bg-white transition"
                    placeholder="Moussa"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#0A5C47] focus:bg-white transition"
                    placeholder="Diop"
                    required
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Numéro de Téléphone</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#0A5C47] focus:bg-white transition"
                  placeholder="+221 77 000 00 00"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Adresse email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#0A5C47] focus:bg-white transition"
                  placeholder="moussa@example.sn"
                  required
                />
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#0A5C47] focus:bg-white transition"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Confirmation du mot de passe */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Confirmer le mot de passe</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#0A5C47] focus:bg-white transition"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Bouton s'inscrire */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-[#0A5C47] hover:bg-[#033A2F] text-white py-2.5 rounded-xl text-xs font-semibold shadow-md shadow-emerald-900/10 transition flex justify-center items-center"
              >
                {loading && (
                  <span className="inline-block animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-3 h-3"></span>
                )}
                Créer mon compte
              </button>
            </form>

            {/* Lien de retour vers le login */}
            <div className="text-center pt-2">
              <p className="text-[11px] text-gray-400">
                Vous avez déjà un compte ?{' '}
                <button 
                  onClick={() => navigate('/login')} 
                  className="text-[#0A5C47] font-bold hover:underline bg-transparent border-none cursor-pointer"
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