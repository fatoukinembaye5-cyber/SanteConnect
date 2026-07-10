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
          <div className="brand-section">
            <div className="logo">
              <h2>SantéConnect</h2>
            </div>
            <p className="brand-tag">Gestion claire des rendez-vous et suivi patient.</p>
          </div>

          <div className="profile-card">
            <div className="profile-avatar">{(user?.name || 'AD').slice(0, 2).toUpperCase()}</div>
            <div>
              <p className="profile-name">{user?.name || 'Administrateur'}</p>
              <p className="profile-role">{user?.role || 'Administration'}</p>
            </div>
          </div>

          <h4>Menu</h4>
          <ul className="sidebar-nav">
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
          <ul className="sidebar-nav">
            <li>
              <NavLink to="statistiques" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                Statistiques
              </NavLink>
            </li>
          </ul>

          <button type="button" onClick={handleLogout} className="logout-btn">
            Déconnexion
          </button>
        </div>
      </aside>

      <main className="contenu">
        <Outlet />
      </main>
    </div>
  );
};

export default RendezVousLayout;
