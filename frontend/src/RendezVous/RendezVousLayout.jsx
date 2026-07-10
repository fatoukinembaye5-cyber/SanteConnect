import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './rendezvous.css';

const RendezVousLayout = () => {
  const navigate = useNavigate();
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    user = null;
  }

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="page-rdv">
      <aside className="sidebar">
        <div>
          <div className="logo">
            <h2>SantéConnect</h2>
          </div>

          <h4>Navigation</h4>
          <ul>
            <li>
              <NavLink to="dashboard" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                Tableau de bord
              </NavLink>
            </li>
            <li>
              <NavLink to="liste" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                Rendez-vous <span className="badge-menu">12</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="patients" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                Patients
              </NavLink>
            </li>
            <li>
              <NavLink to="medecins" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                Médecins
              </NavLink>
            </li>
            <li>
              <NavLink to="dossiers" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                Dossiers
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="bottom-menu">
          <ul>
            <li>
              <NavLink to="statistiques" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                Statistiques
              </NavLink>
            </li>
          </ul>

          <div style={{ borderTop: '1px solid #0d4f45', marginTop: 16, paddingTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, padding: '0 4px' }}>
              <div className="avatar-chip">{(user?.name || 'AD').slice(0, 2).toUpperCase()}</div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'white', lineHeight: 1.2 }}>
                  {user?.name || 'Administrateur'}
                </p>
                <p style={{ fontSize: 11, color: '#7f8c8d' }}>{user?.role || 'Administration'}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                width: '100%', textAlign: 'left', background: 'transparent', border: 'none',
                color: '#e57373', fontSize: 12, padding: '6px 4px', cursor: 'pointer',
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </aside>

      <main className="contenu">
        <Outlet />
      </main>
    </div>
  );
};

export default RendezVousLayout;
