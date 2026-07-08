import './rendezvous.css';

const RendezVousDashboard = () => {
  return (
    <div>
      <div className="header">
        <div>
          <h1>Tableau de bord</h1>
          <p>Accueil des activités et statistiques rapides.</p>
        </div>
      </div>

      <div className="grid-dashboard">
        <div className="card">
          <h2>Rendez-vous prévus</h2>
          <p>12 rendez-vous programmés aujourd'hui.</p>
        </div>
        <div className="card">
          <h2>Patients actifs</h2>
          <p>352 patients suivis sur la plateforme.</p>
        </div>
        <div className="card">
          <h2>Médecins disponibles</h2>
          <p>45 médecins connectés actuellement.</p>
        </div>
      </div>
    </div>
  );
};

export default RendezVousDashboard;
