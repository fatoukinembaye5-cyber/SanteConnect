import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth
import Login from '../app/auth/Login';
import Register from '../app/auth/Register';

// Dashboards
import MedecinLayout from '../layouts/MedecinLayout';
import MedecinDashboardPage from '../Dashboard/MedecinDashboard';
import PatientDashboard from '../Dashboard/PatientDashboard';

// Layouts
import PatientLayout from '../layouts/PatientLayout';

// Rendez-vous
import RendezVousLayout from '../RendezVous/RendezVousLayout';
import RendezVousDashboard from '../RendezVous/RendezVousDashboard';
import ListeRendezVous from '../RendezVous/ListeRendezVous';
import AjouterRendezVous from '../RendezVous/AjouterRendezVous';
import Calendrier from '../RendezVous/Calendrier';
import MesRendezVous from '../RendezVous/MesRendezVous';
import Patients from '../RendezVous/Patients';
import Medecins from '../RendezVous/Medecins';
import Dossiers from '../RendezVous/Dossiers';
import Statistiques from '../RendezVous/Statistiques';

// Context & Protection (removed) - routes are public

const AppRouter = () => {
  const token = localStorage.getItem('access_token');
  const userRole = (localStorage.getItem('user_role') || '').toLowerCase();

  const getHomePath = () => {
    if (userRole.includes('admin')) return '/admin';
    if (userRole.includes('medecin')) return '/medecin/tableau-de-board';
    if (userRole.includes('patient')) return '/patient/dashboard';
    return '/rendezvous/dashboard';
  };

  const RequireAuth = ({ children }) => {
    if (!token) return <Navigate to="/login" replace />;
    return children;
  };

  const RedirectIfAuthenticated = ({ children }) => {
    if (token) return <Navigate to={getHomePath()} replace />;
    return children;
  };

  return (
    <Router>
      <Routes>
          {/* 1. Redirection de la racine -> toujours vers /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 2. Routes Publiques */}
          <Route path="/login" element={<RedirectIfAuthenticated><Login /></RedirectIfAuthenticated>} />
          <Route path="/register" element={<RedirectIfAuthenticated><Register /></RedirectIfAuthenticated>} />

          {/* 3. Espace Patient (avec Layout et Dashboard) */}
          <Route path="/patient" element={<RequireAuth><PatientLayout /></RequireAuth>}>
            <Route path="dashboard" element={<PatientDashboard />} />
          </Route>

          {/* 4. Autres Espaces Privés */}
          <Route path="/admin" element={<RequireAuth><Navigate to="/rendezvous/dashboard" replace /></RequireAuth>} />
          <Route path="/medecin" element={<RequireAuth><MedecinLayout /></RequireAuth>}>
            <Route index element={<Navigate to="tableau-de-board" replace />} />
            <Route path="tableau-de-board" element={<MedecinDashboardPage />} />
          </Route>

          {/* 5. Routes Rendez-vous */}
          <Route path="/rendezvous" element={<RequireAuth><RendezVousLayout /></RequireAuth>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<RendezVousDashboard />} />
            <Route path="liste" element={<ListeRendezVous />} />
            <Route path="ajouter" element={<AjouterRendezVous />} />
            <Route path="calendrier" element={<Calendrier />} />
            <Route path="mes" element={<MesRendezVous />} />
            <Route path="patients" element={<Patients />} />
            <Route path="medecins" element={<Medecins />} />
            <Route path="dossiers" element={<Dossiers />} />
            <Route path="statistiques" element={<Statistiques />} />
          </Route>

          {/* 6. Redirection 404 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;