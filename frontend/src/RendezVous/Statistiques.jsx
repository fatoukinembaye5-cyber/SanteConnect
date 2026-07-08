import './rendezvous.css';

const Statistiques = () => {
  return (
    <div>
      <div className="header">
        <div>
          <h1>Statistiques</h1>
          <p>Vue d'ensemble des indicateurs de performance.</p>
        </div>
      </div>

      <div className="grid-dashboard">
        <div className="card">
          <h2>Rendez-vous ce mois</h2>
          <p>324</p>
        </div>
        <div className="card">
          <h2>Taux de présence</h2>
          <p>88%</p>
        </div>
        <div className="card">
          <h2>Nouveaux patients</h2>
          <p>52</p>
        </div>
      </div>
    </div>
  );
};

export default Statistiques;
