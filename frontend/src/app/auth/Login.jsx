import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const Login = () => {
  const [role, setRole] = useState('administrateur');
  const [email, setEmail] = useState('admin@santeconnect.sn');
  const [password, setPassword] = useState('thies2024');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    // client-side validation
    const errors = {};
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Entrez une adresse email valide.';
    if (!password || password.length < 6) errors.password = 'Le mot de passe doit contenir au moins 6 caractères.';
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }
    try {
      const response = await authService.login(email, password);
      if (response.access_token) {
        const userRole = (response.user?.role || role).toString().toLowerCase();
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user_role', userRole);
        localStorage.setItem('user', JSON.stringify(response.user));
        if (userRole.includes('admin')) navigate('/admin');
        else if (userRole.includes('medecin')) navigate('/medecin/tableau-de-board');
        else navigate('/patient/dashboard');
      } else {
        setError('Impossible de récupérer le jeton d’authentification.');
      }
    } catch (err) {
      // handle structured errors returned from backend
      const data = err.data || {};
      if (data.errors) {
        // Laravel validator style
        const firstField = Object.keys(data.errors)[0];
        setFieldErrors(Object.fromEntries(Object.entries(data.errors).map(([k, v]) => [k, v[0]])));
        setError(data.message || 'Veuillez corriger les erreurs.');
      } else {
        setError(data.message || err.message || 'Erreur d’authentification.');
      }
    }
  };

  return (
    <div className="h-screen bg-[#f3f4f6] flex items-center justify-center text-center py-12 px-4">
      <div className="w-full  h-full overflow-hidden flex bg-transparent">
        {/* Left panel */}
        <div className="md:block md:w-2/5 bg-gradient-to-b from-[#0f7a57] to-[#053a2d] text-white p-12 h-full w-full flex flex-col items-between justify-center relative overflow-hidden">
          <div className="absolute -top-10 -right-16 w-56 h-56 rounded-full bg-white/5" />
          <div className="absolute bottom-16 -left-14 w-40 h-40 rounded-full bg-white/5" />

          <div className="flex items-end gap-3 justify-start relative">
            <div className="w-3 h-3 bg-[#1CB472] rounded-full" />
            <span className="font-semibold">SantéConnect</span>
          </div>
          <h2 className="mt-12 text-3xl font-extrabold leading-tight relative">Gestion intelligente des soins de santé au Sénégal</h2>
          <p className="mt-4 text-sm text-[#DDF3EC]/80 max-w-sm relative">Plateforme numérique intégrée pour la gestion des rendez-vous médicaux, le suivi des patients et la coordination des équipes soignantes.</p>

          <div className="mt-10 flex flex-row gap-4 w-full max-w-md relative">
            <div className="rounded-xl bg-[#075a41] p-3 text-center">
              <div className="text-sm font-semibold">1,240</div>
              <div className="text-xs text-[#DDF3EC]/70">Patients inscrits</div>
            </div>
            <div className="rounded-xl bg-[#075a41] p-3 text-center">
              <div className="text-sm font-semibold">48</div>
              <div className="text-xs text-[#DDF3EC]/70">Médecins</div>
            </div>
            <div className="rounded-xl bg-[#075a41] p-3 text-center">
              <div className="text-sm font-semibold">320</div>
              <div className="text-xs text-[#DDF3EC]/70">RDV/Mois</div>
            </div>
          </div>
        </div>

        {/* Right panel (form) */}
        <div className="w-full md:w-3/5 bg-white p-10 md:p-12 rounded-tr-2xl rounded-br-2xl flex flex-col items-center justify-center text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-800">Connexion</h3>
            <p className="text-sm text-gray-500 mt-1">Accédez à votre espace personnel</p>

            <div className="mt-6 flex gap-3">
              {['Administrateur', 'Médecin', 'Patient'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r.toLowerCase())}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${role === r.toLowerCase() ? 'bg-[#06B17A] text-white shadow' : 'bg-[#F3F4F6] text-gray-700 border border-gray-200'}`}>
                  {r}
                </button>
              ))}
            </div>

            {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

            <form className="mt-6" onSubmit={handleSubmit}>
              <label className="block text-xs text-gray-600 uppercase tracking-wider">Adresse email</label>
              <input aria-invalid={fieldErrors.email ? 'true' : 'false'} type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`mt-2 w-full rounded-lg px-4 py-3 text-sm focus:outline-none ${fieldErrors.email ? 'border border-red-400' : 'border border-gray-200'}`} />
              {fieldErrors.email && <div className="mt-1 text-xs text-red-600">{fieldErrors.email}</div>}

              <div className="mt-4 flex items-center justify-between">
                <label className="block text-xs text-gray-600 uppercase tracking-wider">Mot de passe</label>
                <a href="#" className="text-sm text-[#06B17A]">Mot de passe oublié ?</a>
              </div>
              <input aria-invalid={fieldErrors.password ? 'true' : 'false'} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`mt-2 w-full rounded-lg px-4 py-3 text-sm focus:outline-none ${fieldErrors.password ? 'border border-red-400' : 'border border-gray-200'}`} />
              {fieldErrors.password && <div className="mt-1 text-xs text-red-600">{fieldErrors.password}</div>}

              <div className="mt-6">
                <button type="submit" className="w-full bg-[#06B17A] hover:bg-[#05a16a] text-white rounded-lg py-3 font-semibold shadow">Se connecter</button>
              </div>

              <div className="mt-6 flex items-center justify-center text-sm text-gray-400 gap-3">
                <span className="w-20 border-t border-gray-200" />
                <span>ou</span>
                <span className="w-20 border-t border-gray-200" />
              </div>

              <div className="mt-6 text-center text-sm">
                Nouveau patient ? <a href="/register" className="text-[#06B17A] font-medium">Créer un compte</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
