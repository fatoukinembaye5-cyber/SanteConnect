// src/app/auth/Register.jsx
import { useState } from 'react';
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
        role: 'patient',
        telephone: formData.telephone
      };

      const response = await authService.register(payload);
      setSuccess(response.message || 'Inscription réussie !');

      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user_role', response.user?.role || 'patient');
        localStorage.setItem('user', JSON.stringify(response.user));
      }

      setTimeout(() => {
        navigate('/login');
      }, 1800);
    } catch (err) {
      console.error("Erreur d'inscription :", err.message);
      setError(err.message || 'Impossible de créer le compte.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-10 lg:flex-row lg:items-center lg:gap-12">
        <section className="mb-10 rounded-[32px] bg-gradient-to-br from-emerald-700 via-slate-900 to-cyan-800 p-10 shadow-2xl shadow-slate-950/40 lg:flex-1 lg:p-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-emerald-100/90">
              Nouveau compte patient
            </div>

            <h1 className="mt-10 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Créez votre espace SantéConnect.
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-emerald-100/80 sm:text-base">
              Inscrivez-vous rapidement pour gérer vos rendez-vous, consulter vos ordonnances et accéder à votre dossier médical en toute sécurité.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-200/80">Support</p>
                <p className="mt-3 text-lg font-medium text-white">Assistance médicale continue</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-200/80">Sécurité</p>
                <p className="mt-3 text-lg font-medium text-white">Confidentialité de vos données</p>
              </div>
            </div>
          </div>
        </section>

        <main className="lg:flex-1">
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="border-b border-slate-800/80 bg-slate-900/80 px-8 py-7">
              <div className="flex items-center justify-between gap-4 text-slate-200">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/80">Inscription</p>
                  <h2 className="mt-3 text-2xl font-semibold">Rejoignez SantéConnect</h2>
                </div>
                <div className="rounded-2xl bg-slate-800 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
                  Patient uniquement
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              {error && (
                <div className="mb-6 rounded-3xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-6 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                  {success}
                </div>
              )}

              <form className="grid gap-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-slate-300">
                    <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-slate-500">Prénom</span>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                      placeholder="Moussa"
                      required
                    />
                  </label>

                  <label className="block text-sm text-slate-300">
                    <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-slate-500">Nom</span>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                      placeholder="Diop"
                      required
                    />
                  </label>
                </div>

                <label className="block text-sm text-slate-300">
                  <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-slate-500">Téléphone</span>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                    placeholder="+221 77 000 00 00"
                    required
                  />
                </label>

                <label className="block text-sm text-slate-300">
                  <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-slate-500">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                    placeholder="moussa@example.sn"
                    required
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-slate-300">
                    <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-slate-500">Mot de passe</span>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                      placeholder="••••••••"
                      required
                    />
                  </label>

                  <label className="block text-sm text-slate-300">
                    <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-slate-500">Confirmer</span>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                      placeholder="••••••••"
                      required
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-3xl bg-emerald-400 px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Création en cours...' : 'Créer mon compte'}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-slate-400">
                <p>
                  Déjà membre ?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-emerald-300 hover:text-emerald-100"
                  >
                    Connectez-vous
                  </button>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;
