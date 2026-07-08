import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
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
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_role', role);
      }

      redirectionParRole(role);

    } catch (err) {
      console.error("Erreur d'authentification :", err.message);
      setError(`Mode démo : redirection forcée (${err.message})`);
      setTimeout(() => {
        redirectionParRole(role);
      }, 1000);
    }
  };

  const redirectionParRole = (userRole) => {
    if (userRole === 'Administrateur') {
      navigate('/admin'); 
    } else if (userRole === 'Médecin') {
      navigate('/medecin'); 
    } else if (userRole === 'Patient') {
      navigate('/patient'); 
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4EF] flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] shadow-xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        
        {/* PANNEAU GAUCHE VERT (#033A2F) */}
        <div className="md:w-1/2 bg-[#033A2F] text-white p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#0A5C47] rounded-full opacity-40 blur-sm"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-40 h-40 bg-[#0A5C47] rounded-full opacity-30 blur-sm"></div>

          <div className="relative z-10 flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#1CB472] rounded-full"></div>
            <span className="font-bold text-sm tracking-wide">SantéConnect</span>
          </div>

          <div className="relative z-10 my-auto pt-8">
            <h1 className="text-3xl font-bold leading-tight tracking-wide">
              Gestion intelligente des soins de santé au Sénégal
            </h1>
            <p className="text-xs text-[#DDF3EC] mt-4 opacity-80 leading-relaxed font-light">
              Plateforme numérique intégrée pour la gestion des rendez-vous médicaux, le suivi des patients et la coordination des équipes soignantes.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-2 mt-8">
            <div className="bg-[#0A5C47]/50 border border-[#1CB472]/20 rounded-xl p-3 text-center">
              <div className="text-sm font-bold">1340</div>
              <div className="text-[9px] uppercase tracking-wider text-[#DDF3EC]/70 mt-0.5">Patients</div>
            </div>
            <div className="bg-[#0A5C47]/50 border border-[#1CB472]/20 rounded-xl p-3 text-center">
              <div className="text-sm font-bold">45</div>
              <div className="text-[9px] uppercase tracking-wider text-[#DDF3EC]/70 mt-0.5">Médecins</div>
            </div>
            <div className="bg-[#0A5C47]/50 border border-[#1CB472]/20 rounded-xl p-3 text-center">
              <div className="text-sm font-bold">531</div>
              <div className="text-[9px] uppercase tracking-wider text-[#DDF3EC]/70 mt-0.5">Hôpitaux</div>
            </div>
          </div>
        </div>

        {/* PANNEAU DROIT FORMULAIRE (BLANC) */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center bg-white text-left">
          <h2 className="text-2xl font-bold text-[#1E2421]">Connexion</h2>
          <p className="text-xs text-gray-400 mt-1">Accédez à votre espace personnel</p>

          {error && (
            <div className="mt-4 p-2.5 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] rounded-xl text-center font-medium">
              {error}
            </div>
          )}

          {/* SÉLECTEUR DE RÔLE */}
          <div className="bg-gray-100/80 p-1 rounded-xl flex space-x-1 mt-6">
            {['Administrateur', 'Médecin', 'Patient'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all duration-150 ${
                  role === item
                    ? 'bg-[#0A5C47] text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1.5 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#0A5C47] focus:bg-white transition"
                placeholder="Ex: nom@santeconnect.sn"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Mot de passe
                </label>
                <a href="#forgot" className="text-[10px] text-[#0A5C47] font-semibold hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1.5 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#0A5C47] focus:bg-white transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-[#0A5C47] hover:bg-[#033A2F] text-white py-3 rounded-xl text-xs font-semibold shadow-md shadow-emerald-900/10 transition dynamic-btn"
            >
              Se connecter
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-[11px] text-gray-400">
              Nouveau patient ?{' '}
              <a href="/register" className="text-[#0A5C47] font-bold hover:underline">
                Créer un compte
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;