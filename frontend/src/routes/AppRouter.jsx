import { Routes, Route, Navigate } from "react-router-dom";
import MedecinLayout from "../layouts/MedecinLayout";
import MedecinDashboard from "../dashboard/MedecinDashboard";

// ─── PAGES DE TEST TEMPORAIRES ───
// Ces composants évitent les bugs si vos fichiers de pages ne sont pas encore créés.
const MonAgenda = () => (
  <div style={{ padding: "30px", color: "#2c3e50" }}>
    <h2>🗓️ Mon Agenda</h2>
    <p>Le calendrier et la gestion des rendez-vous s'afficheront ici.</p>
  </div>
);

const MesPatients = () => (
  <div style={{ padding: "30px", color: "#2c3e50" }}>
    <h2>👥 Mes Patients</h2>
    <p>La liste complète de vos patients s'affichera ici.</p>
  </div>
);

const DossiersMedicaux = () => (
  <div style={{ padding: "30px", color: "#2c3e50" }}>
    <h2>📁 Dossiers Médicaux</h2>
    <p>L'historique médical et les antécédents s'afficheront ici.</p>
  </div>
);

const Ordonnances = () => (
  <div style={{ padding: "30px", color: "#2c3e50" }}>
    <h2>📄 Ordonnances</h2>
    <p>La création et le suivi des ordonnances s'afficheront ici.</p>
  </div>
);

const Messages = () => (
  <div style={{ padding: "30px", color: "#2c3e50" }}>
    <h2>💬 Messages</h2>
    <p>Votre messagerie interne sécurisée s'affichera ici.</p>
  </div>
);

const NouvelleConsultation = () => (
  <div style={{ padding: "30px", color: "#2c3e50" }}>
    <h2>➕ Nouvelle Consultation</h2>
    <p>Le formulaire de saisie pour une nouvelle consultation s'affichera ici.</p>
  </div>
);

// ─── ROUTEUR PRINCIPAL ───
export default function AppRouter() {
  return (
    <Routes>
      {/* Redirection automatique de la racine vers le tableau de bord */}
      <Route path="/" element={<Navigate to="/medecin/tableau-de-board" replace />} />

      {/* Groupe de navigation principal pour le médecin */}
      <Route path="/medecin" element={<MedecinLayout />}>
        {/* Gestion des deux orthographes (bord et board) pour éviter tout écran blanc */}
        <Route path="tableau-de-bord" element={<MedecinDashboard />} />
        <Route path="tableau-de-board" element={<MedecinDashboard />} />
        
        {/* Liens de la barre latérale */}
        <Route path="mon-agenda" element={<MonAgenda />} />
        <Route path="mes-patients" element={<MesPatients />} />
        <Route path="dossiers-medicaux" element={<DossiersMedicaux />} />
        <Route path="ordonnances" element={<Ordonnances />} />
        <Route path="messages" element={<Messages />} />

        {/* Liens d'actions spécifiques depuis le tableau de bord */}
        <Route path="nouvelle-consultation" element={<NouvelleConsultation />} />
      </Route>

      {/* Sécurité : Si l'URL n'existe pas, retour au tableau de bord */}
      <Route path="*" element={<Navigate to="/medecin/tableau-de-board" replace />} />
    </Routes>
  );
}
