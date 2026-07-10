import { NavLink, Outlet } from 'react-router-dom';
import './rendezvous.css';
	
const RendezVousLayout = () => {
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
        </div>
      </aside>

      <main className="contenu">
        <Outlet />
      </main>
    </div>
  );
};

export default RendezVousLayout;


