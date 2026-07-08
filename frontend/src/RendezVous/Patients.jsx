import './rendezvous.css';

const Patients = () => {
  return (
    <div>
      <div className="header">
        <div>
          <h1>Patients</h1>
          <p>Liste et statut des patients enregistrés.</p>
        </div>
      </div>

      <div className="card">
        <h2>Patients récents</h2>
        <p>Affichage simple des patients inscrits et de leurs dossiers.</p>
      </div>
    </div>
  );
};

export default Patients;
