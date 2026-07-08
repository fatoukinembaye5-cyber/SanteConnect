import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth
import Login from '../app/auth/Login';
import Register from '../app/auth/Register';

// Dashboards
import AdminDashboard from '../app/dashboard/AdminDashboard';
import MedecinDashboard from '../app/dashboard/MedecinDashboard';
import PatientDashboard from '../app/dashboard/PatientDashboard';

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
  const RequireAuth = ({ children }) => {
    const token = localStorage.getItem('access_token');
    return token ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
          {/* 1. Redirection de la racine -> toujours vers /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 2. Routes Publiques */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 3. Espace Patient (avec Layout et Dashboard) */}
          <Route
            path="/patient"
            element={
              <RequireAuth>
                <PatientLayout />
              </RequireAuth>
            }
          >
            <Route path="dashboard" element={<PatientDashboard />} />
          </Route>

          {/* 4. Autres Espaces Privés */}
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/medecin"
            element={
              <RequireAuth>
                <MedecinDashboard />
              </RequireAuth>
            }
          />

          {/* 5. Routes Rendez-vous */}
          <Route
            path="/rendezvous"
            element={
              <RequireAuth>
                <RendezVousLayout />
              </RequireAuth>
            }
          >
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