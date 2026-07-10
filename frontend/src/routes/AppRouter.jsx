import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth
import Login from '../app/auth/Login';
import Register from '../app/auth/Register';

const AppRouter = () => {
  const RequireAuth = ({ children }) => {
    const token = localStorage.getItem('access_token');
    return token ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* La racine affiche DIRECTEMENT ton bel écran de connexion vert */}
        <Route path="/" element={<Login />} />

        {/* Les routes d'authentification */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Si l'application cherche une autre page, elle revient d'office sur le Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;