import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const Login = () => {
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('admin@santeconnect.sn');
  const [password, setPassword] = useState('thies2024');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authService.login(email, password);
      if (response.access_token) {
        const userRole = (response.user?.role || role).toString().toLowerCase();
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user_role', userRole);
        localStorage.setItem('user', JSON.stringify(response.user));
        redirectionParRole(userRole);
      } else {
        setError('Impossible de récupérer le jeton d’authentification.');
      }
    } catch (err) {
      console.error("Erreur d'authentification :", err.message);
      setError(err.message || 'Erreur d’authentification.');
    }
  };

  const redirectionParRole = (userRole) => {
    const normalizedRole = userRole.toString().toLowerCase();
    if (normalizedRole === 'administrateur' || normalizedRole === 'admin') {
      navigate('/admin');
    } else if (normalizedRole === 'medecin' || normalizedRole === 'médecin') {
      navigate('/medecin');
    } else {
      navigate('/patient');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-10 lg:flex-row lg:items-center lg:gap-12">
        <section className="mb-10 rounded-[32px] bg-gradient-to-br from-cyan-700 via-slate-900 to-emerald-800 p-10 shadow-2xl shadow-slate-950/40 lg:flex-1 lg:p-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100/90">
              SantéConnect · Espace sécurisé
            </div>

            <h1 className="mt-10 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Bienvenue sur votre espace santé.
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-cyan-100/80 sm:text-base">
              Gérez vos rendez-vous, suivez vos consultations et accédez à votre dossier médical avec une interface claire et réactive.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/80">Rendez-vous</p>
                <p className="mt-3 text-lg font-medium text-white">Planifiez en quelques clics</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/80">Dossier</p>
                <p className="mt-3 text-lg font-medium text-white">Accès instantané à vos informations</p>
              </div>
            </div>
          </div>
        </section>

        <main className="lg:flex-1">
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="border-b border-slate-800/80 bg-slate-900/80 px-8 py-7">
              <div className="flex items-center justify-between gap-4 text-slate-200">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Connexion</p>
                  <h2 className="mt-3 text-2xl font-semibold">Entrez vos identifiants</h2>
                </div>
                <div className="rounded-2xl bg-slate-800 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
                  Mode réel
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              {error && (
                <div className="mb-6 rounded-3xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                  {error}
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-3">
                {['administrateur', 'medecin', 'patient'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setRole(item)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                      role === item
                        ? 'border-cyan-400 bg-cyan-500/10 text-cyan-100 shadow-inner shadow-cyan-500/10'
                        : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-cyan-400 hover:text-white'
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-slate-200">
                  Adresse email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="contact@santeconnect.sn"
                    required
                  />
                </label>

                <label className="block text-sm font-medium text-slate-200">
                  Mot de passe
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="••••••••"
                    required
                  />
                </label>

                <div className="flex items-center justify-between text-sm text-slate-400">
                  <button type="button" className="font-medium text-cyan-300 hover:text-cyan-100">
                    Mot de passe oublié ?
                  </button>
                  <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                    {role}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-950 transition hover:bg-cyan-400"
                >
                  Se connecter
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-slate-400">
                <p>
                  Nouveau sur SantéConnect ?{' '}
                  <a href="/register" className="text-cyan-300 hover:text-cyan-100">
                    Créez un compte
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
