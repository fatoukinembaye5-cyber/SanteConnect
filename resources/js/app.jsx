import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importation des pages et composants
import LoginPage from './components/LoginPage';
import Dashboard from './pages/Dashboard';

// Configuration du routage de l'application
ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Route par défaut : Page de connexion */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Route du module de Khady : Tableau de bord */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);