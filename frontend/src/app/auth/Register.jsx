import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // client-side validation
      const errors = {};
      if (!prenom) errors.prenom = 'Le prénom est requis.';
      if (!nom) errors.nom = 'Le nom est requis.';
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Entrez une adresse email valide.';
      if (!password || password.length < 8) errors.password = 'Le mot de passe doit contenir au moins 8 caractères.';
      if (Object.keys(errors).length) {
        setFieldErrors(errors);
        setLoading(false);
        return;
      }

      const payload = {
        name: `${prenom} ${nom}`.trim(),
        email,
        password,
        role,
        telephone: telephone || null,
      };

      const res = await authService.register(payload);
      if (res.access_token) {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('user_role', (res.user?.role || role).toLowerCase());
        localStorage.setItem('user', JSON.stringify(res.user));
        navigate('/patient');
      } else {
        setError(res.message || 'Inscription impossible');
      }
    } catch (err) {
      const data = err.data || {};
      if (data.errors) {
        setFieldErrors(Object.fromEntries(Object.entries(data.errors).map(([k, v]) => [k, v[0]])));
        setError(data.message || 'Veuillez corriger les champs.');
      } else {
        setError(data.message || err.message || 'Erreur lors de l\'inscription');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden flex bg-transparent">
        <div className="hidden md:block md:w-2/5 bg-gradient-to-b from-[#0f7a57] to-[#053a2d] text-white p-12 relative">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#1CB472] rounded-full" />
            <span className="font-semibold">SantéConnect</span>
          </div>
          <h2 className="mt-12 text-3xl font-extrabold leading-tight">Rejoignez SantéConnect</h2>
          <p className="mt-4 text-sm text-[#DDF3EC]/80 max-w-sm">Créez un compte pour prendre rendez-vous, suivre vos consultations et gérer votre dossier médical en toute sécurité.</p>

          <div className="absolute bottom-6 left-6 right-6 flex gap-4">
            <div className="flex-1 rounded-lg bg-[#05523f] p-3 text-center">
              <div className="text-sm font-bold">1340</div>
              <div className="text-xs text-[#DDF3EC]/70">Patients inscrits</div>
            </div>
            <div className="flex-1 rounded-lg bg-[#05523f] p-3 text-center">
              <div className="text-sm font-bold">45</div>
              <div className="text-xs text-[#DDF3EC]/70">Médecins</div>
            </div>
            <div className="flex-1 rounded-lg bg-[#05523f] p-3 text-center">
              <div className="text-sm font-bold">320</div>
              <div className="text-xs text-[#DDF3EC]/70">RDV/Mois</div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/5 bg-white p-10 md:p-12 rounded-tr-2xl rounded-br-2xl">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-800">Créer un compte</h3>
            <p className="text-sm text-gray-500 mt-1">Entrez vos informations pour commencer</p>

            <div className="mt-6 flex gap-3">
              {['Patient', 'Médecin'].map((r) => (
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

            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <input aria-invalid={fieldErrors.prenom ? 'true' : 'false'} placeholder="Prénom" value={prenom} onChange={(e)=>setPrenom(e.target.value)} className={`w-full rounded-lg px-4 py-3 text-sm ${fieldErrors.prenom ? 'border border-red-400' : 'border border-gray-200'}`} />
                  {fieldErrors.prenom && <div className="mt-1 text-xs text-red-600">{fieldErrors.prenom}</div>}
                </div>
                <div>
                  <input aria-invalid={fieldErrors.nom ? 'true' : 'false'} placeholder="Nom" value={nom} onChange={(e)=>setNom(e.target.value)} className={`w-full rounded-lg px-4 py-3 text-sm ${fieldErrors.nom ? 'border border-red-400' : 'border border-gray-200'}`} />
                  {fieldErrors.nom && <div className="mt-1 text-xs text-red-600">{fieldErrors.nom}</div>}
                </div>
              </div>

              <div>
                <input aria-invalid={fieldErrors.telephone ? 'true' : 'false'} placeholder="Téléphone" value={telephone} onChange={(e)=>setTelephone(e.target.value)} className={`w-full rounded-lg px-4 py-3 text-sm ${fieldErrors.telephone ? 'border border-red-400' : 'border border-gray-200'}`} />
                {fieldErrors.telephone && <div className="mt-1 text-xs text-red-600">{fieldErrors.telephone}</div>}
              </div>

              <div>
                <input aria-invalid={fieldErrors.email ? 'true' : 'false'} placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className={`w-full rounded-lg px-4 py-3 text-sm ${fieldErrors.email ? 'border border-red-400' : 'border border-gray-200'}`} />
                {fieldErrors.email && <div className="mt-1 text-xs text-red-600">{fieldErrors.email}</div>}
              </div>

              <div>
                <input aria-invalid={fieldErrors.password ? 'true' : 'false'} type="password" placeholder="Mot de passe" value={password} onChange={(e)=>setPassword(e.target.value)} className={`w-full rounded-lg px-4 py-3 text-sm ${fieldErrors.password ? 'border border-red-400' : 'border border-gray-200'}`} />
                {fieldErrors.password && <div className="mt-1 text-xs text-red-600">{fieldErrors.password}</div>}
              </div>

              <div>
                <button type="submit" className="w-full bg-[#06B17A] hover:bg-[#05a16a] text-white rounded-lg py-3 font-semibold">{loading ? 'Création...' : "S'inscrire"}</button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm">
              Déjà inscrit ? <a href="/login" className="text-[#06B17A] font-medium">Se connecter</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
