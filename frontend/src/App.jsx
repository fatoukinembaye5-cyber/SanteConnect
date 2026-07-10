import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RendezVousLayout from './RendezVous/RendezVousLayout';
import RendezVousDashboard from './RendezVous/RendezVousDashboard'; 
import ListeRendezVous from './RendezVous/ListeRendezVous';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirection automatique de la racine vers le dashboard si besoin */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* On utilise le Layout pour le chemin "/dashboard" */}
        <Route path="/dashboard" element={<RendezVousLayout />}>
          
          {/* L'index s'affiche directement dans l'unité <Outlet /> de la page */}
          <Route index element={<RendezVousDashboard />} />
          
          {/* Si vous cliquez sur le sous-menu liste */}
          <Route path="liste" element={<ListeRendezVous />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;