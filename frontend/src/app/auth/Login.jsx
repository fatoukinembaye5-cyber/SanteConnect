import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const Login = () => {
  const [role, setRole] = useState('Administrateur');
  const [email, setEmail] = useState('admin@santeconnect.sn');
  const [password, setPassword] = useState('thies2024');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authService.login(email, password);
      if (response && response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user_role', role);
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/rendezvous/dashboard');
      } else {
        setError('Impossible de récupérer le jeton d’authentification.');
      }
    } catch (err) {
      setError(err.message || 'Échec de connexion. Vérifiez vos identifiants.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F3EE] flex items-center justify-center p-6 md:p-12 font-sans">
      
      {/* CADRE PRINCIPAL AGRANDI : 
          - max-w-5xl (au lieu de max-w-4xl) pour élargir 
          - min-h-[580px] (au lieu de 480px) pour donner de la hauteur */}
      <div className="bg-white rounded-3xl shadow-xl max-w-5xl w-full overflow-hidden flex flex-col md:flex-row min-h-[580px]">

        {/* --- PANNEAU GAUCHE --- */}
        <div className="md:w-1/2 bg-[#003B2B] text-white p-10 md:p-14 flex flex-col justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2.5">
            <span className="w-3 h-3 bg-[#10B981] rounded-full inline-block" />
            <span className="font-bold text-base tracking-wide">SantéConnect</span>
          </div>

          {/* Titre & Description */}
          <div className="my-auto py-6">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-white">
              Gestion intelligente des soins de santé au Sénégal
            </h1>
            <p className="text-xs md:text-sm text-[#A8D5C8] mt-4 leading-relaxed font-normal opacity-90 max-w-md">
              Plateforme numérique intégrée pour la gestion des rendez-vous médicaux, le suivi des patients et la coordination des équipes soignantes.
            </p>
          </div>

          {/* Statistiques en bas */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-[#002D21] rounded-xl p-3.5 text-center">
              <div className="text-base font-bold text-white">1340</div>
              <div className="text-[9px] uppercase font-bold text-[#A8D5C8] tracking-wider mt-1">Patients</div>
            </div>
            <div className="bg-[#002D21] rounded-xl p-3.5 text-center">
              <div className="text-base font-bold text-white">45</div>
              <div className="text-[9px] uppercase font-bold text-[#A8D5C8] tracking-wider mt-1">Médecins</div>
            </div>
            <div className="bg-[#002D21] rounded-xl p-3.5 text-center">
              <div className="text-base font-bold text-white">531</div>
              <div className="text-[9px] uppercase font-bold text-[#A8D5C8] tracking-wider mt-1">Hôpitaux</div>
            </div>
          </div>

        </div>

        {/* --- PANNEAU DROIT --- */}
        <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center bg-white">
          <div className="w-full max-w-sm mx-auto">
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 notranslate">Connexion</h2>
            <p className="text-xs text-gray-400 mt-1">Accédez à votre espace personnel</p>

            {/* Sélecteur de rôle */}
            <div className="bg-[#F3F4F6] p-1.5 rounded-xl flex space-x-1 mt-6">
              {['Administrateur', 'Médecin', 'Patient'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRole(item)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    role === item
                      ? 'bg-[#003B2B] text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Formulaire */}
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-4">
                {error}
              </div>
            )}
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#003B2B] focus:bg-white transition"
                  placeholder="admin@santeconnect.sn"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Mot de passe
                  </label>
                  <a href="#forgot" className="text-[10px] text-[#003B2B] font-semibold hover:underline">
                    Mot de passe oublié ?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#003B2B] focus:bg-white transition"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#003B2B] hover:bg-[#002D21] text-white py-3 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                Se connecter
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              Nouveau patient ?{' '}
              <Link to="/register" className="font-bold text-[#003B2B] hover:underline">
                Créer un compte
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;