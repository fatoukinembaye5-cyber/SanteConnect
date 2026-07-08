import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth
import Login from '../app/auth/Login';
import Register from '../app/auth/Register';

// Composants temporaires simples pour tester les redirections
const AdminDashboard = () => <div className="p-8 text-2xl font-bold text-emerald-800 bg-emerald-50 min-h-screen">👋 Bienvenue dans l'Espace Administrateur (SantéConnect)</div>;
const MedecinDashboard = () => <div className="p-8 text-2xl font-bold text-blue-800 bg-blue-50 min-h-screen">🩺 Bienvenue dans l'Espace Médecin (SantéConnect)</div>;
const PatientDashboard = () => <div className="p-8 text-2xl font-bold text-purple-800 bg-purple-50 min-h-screen">👤 Bienvenue dans l'Espace Patient (SantéConnect)</div>;

const AppRouter = () => {
  return (
    <Router>
      <Routes>
          {/* 1. Redirection de la racine -> toujours vers /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 2. Routes Publiques */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        {/* 3. Les nouvelles routes de redirection pour tes espaces utilisateurs */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/medecin" element={<MedecinDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />

        {/* 4. Redirection en cas de page introuvable (404) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;