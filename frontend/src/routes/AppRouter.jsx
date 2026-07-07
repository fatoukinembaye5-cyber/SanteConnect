// routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../app/auth/Login';
import Register from '../app/auth/Register';

// Importe tes autres pages ici au fur et à mesure (Dashboards, etc.)
// import AdminDashboard from '../app/dashboard/AdminDashboard';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* 1. Page par défaut : Redirige la racine '/' directement vers '/login' */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 2. Vos routes d'authentification */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 3. Exemple de route protégée (Dashboard) à activer plus tard */}
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}

        {/* 4. Redirection en cas de page introuvable (404) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;