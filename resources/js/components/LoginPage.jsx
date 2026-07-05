import React, { useState } from 'react';

const roles = ['Administrateur', 'Médecin', 'Patient'];

export default function LoginPage() {
  const [activeRole, setActiveRole] = useState('Administrateur');
  const [email, setEmail] = useState('admin@santeconnect.sn');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = document.querySelector('meta[name="csrf-token"]').content;

      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        body: JSON.stringify({ email, password, role: activeRole }),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.redirect || '/';
      } else {
        const data = await response.json();
        setError(data.message || 'Identifiants incorrects.');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* LEFT COLUMN */}
        <div style={styles.left}>
          <div style={styles.circleTop}></div>
          <div style={styles.circleBottom}></div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={styles.logoRow}>
              <span style={styles.logoDot}></span>
              <span style={styles.logoText}>SantéConnect</span>
            </div>

            <h1 style={styles.title}>
              Gestion intelligente des soins de santé au Sénégal
            </h1>
            <p style={styles.subtitle}>
              Plateforme numérique intégrée pour la gestion des rendez-vous
              médicaux, le suivi des patients et la coordination des équipes
              soignantes.
            </p>
          </div>

          <div style={styles.statsRow}>
            <div style={styles.statBox}>
              <div style={styles.statNumber}>1240</div>
              <div style={styles.statLabel}>Patients inscrits</div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statNumber}>48</div>
              <div style={styles.statLabel}>Médecins</div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statNumber}>320</div>
              <div style={styles.statLabel}>RDV/Mois</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={styles.right}>
          <h2 style={styles.formTitle}>Connexion</h2>
          <p style={styles.formSubtitle}>Accédez à votre espace personnel</p>

          <div style={styles.tabRow}>
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                style={{
                  ...styles.tab,
                  ...(activeRole === role ? styles.tabActive : {}),
                }}
                type="button"
              >
                {role}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Adresse email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <div style={styles.forgotRow}>
              <a href="/forgot-password" style={styles.link}>Mot de passe oublié ?</a>
            </div>

            {error && (
              <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>
                {error}
              </p>
            )}

            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div style={styles.divider}>
            <div style={styles.line}></div>
            <span style={styles.orText}>ou</span>
            <div style={styles.line}></div>
          </div>

          <p style={styles.bottomText}>
            Nouveau patient ?{' '}
            <a href="/register/patient" style={styles.link}>Créer un compte</a>
          </p>
        </div>
      </div>
    </div>
  );
}

const GREEN_DARK = '#0f2b20';
const GREEN = '#166534';

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f3f4f6',
    fontFamily: 'Segoe UI, Arial, sans-serif',
    padding: '20px',
  },
  card: {
    display: 'flex',
    width: '100%',
    maxWidth: '1000px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  },
  left: {
    flex: '0 0 40%',
    background: GREEN_DARK,
    color: '#fff',
    padding: '40px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  circleTop: {
    position: 'absolute',
    top: '-40px',
    right: '-60px',
    width: '220px',
    height: '220px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
  },
  circleBottom: {
    position: 'absolute',
    bottom: '90px',
    left: '-60px',
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
  },
  logoRow: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '60px' },
  logoDot: { width: '12px', height: '12px', borderRadius: '50%', background: '#4ade80' },
  logoText: { fontWeight: 600, fontSize: '18px' },
  title: { fontSize: '28px', fontWeight: 700, lineHeight: 1.3, marginBottom: '16px' },
  subtitle: { fontSize: '14px', color: '#d1d5db', lineHeight: 1.6, maxWidth: '280px' },
  statsRow: { display: 'flex', gap: '10px', marginTop: '40px', position: 'relative', zIndex: 1 },
  statBox: {
    flex: 1,
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '12px',
    textAlign: 'center',
  },
  statNumber: { fontWeight: 700, fontSize: '18px' },
  statLabel: { fontSize: '11px', color: '#d1d5db', marginTop: '4px' },

  right: {
    flex: '0 0 60%',
    background: '#fff',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formTitle: { fontSize: '24px', fontWeight: 700, color: '#1f2937', marginBottom: '4px' },
  formSubtitle: { fontSize: '14px', color: '#9ca3af', marginBottom: '24px' },
  tabRow: { display: 'flex', gap: '8px', marginBottom: '24px' },
  tab: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '13px',
    fontWeight: 500,
    background: '#f3f4f6',
    color: '#9ca3af',
    cursor: 'pointer',
  },
  tabActive: { background: GREEN_DARK, color: '#fff' },
  label: { fontSize: '13px', color: '#4b5563', display: 'block', marginBottom: '6px' },
  input: {
    width: '100%',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '13px',
    marginBottom: '16px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  forgotRow: { textAlign: 'right', marginBottom: '16px', marginTop: '-8px' },
  link: {
    color: GREEN,
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'none',
  },
  submitBtn: {
    width: '100%',
    padding: '11px',
    borderRadius: '8px',
    border: 'none',
    background: GREEN,
    color: '#fff',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  divider: { display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0' },
  line: { flex: 1, height: '1px', background: '#e5e7eb' },
  orText: { fontSize: '12px', color: '#9ca3af' },
  bottomText: { textAlign: 'center', fontSize: '13px', color: '#6b7280' },
};
