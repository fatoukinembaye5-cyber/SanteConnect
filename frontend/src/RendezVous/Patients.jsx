import './rendezvous.css';

const patients = [
  {
    id: 1,
    name: 'Awa Diop',
    age: '34 ans',
    lastVisit: 'Dernière visite : 10 juin 2026',
    doctor: 'Dr. Faye',
    status: 'Suivi régulier',
    statusClass: 'good',
  },
  {
    id: 2,
    name: 'Moussa Sarr',
    age: '47 ans',
    lastVisit: 'Dernière visite : 02 juin 2026',
    doctor: 'Dr. Ndiaye',
    status: 'À contrôler',
    statusClass: 'warning',
  },
  {
    id: 3,
    name: 'Khady Mbaye',
    age: '29 ans',
    lastVisit: 'Dernière visite : 28 mai 2026',
    doctor: 'Dr. Sall',
    status: 'Rendez-vous demain',
    statusClass: 'info',
  },
];

const Patients = () => {
  return (
    <div className="patients-page">
      <div className="header">
        <div>
          <h1>Patients</h1>
          <p>Liste et suivi des patients enregistrés.</p>
        </div>
        <button className="btn btn-primary">+ Nouveau patient</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total patients</span>
          <strong>248</strong>
          <small>+12% ce mois</small>
        </div>
        <div className="stat-card">
          <span className="stat-label">Rendez-vous aujourd’hui</span>
          <strong>18</strong>
          <small>4 en attente</small>
        </div>
        <div className="stat-card">
          <span className="stat-label">Dossiers à compléter</span>
          <strong>7</strong>
          <small>2 urgents</small>
        </div>
      </div>

      <div className="card patients-card">
        <div className="patients-toolbar">
          <div>
            <h2>Patients récents</h2>
            <p>Consultez les dossiers et le statut de suivi de chaque patient.</p>
          </div>
          <div className="toolbar-actions">
            <input type="text" placeholder="Rechercher un patient" />
            <select defaultValue="all">
              <option value="all">Tous les statuts</option>
              <option value="good">Suivi régulier</option>
              <option value="warning">À contrôler</option>
              <option value="info">Rendez-vous demain</option>
            </select>
          </div>
        </div>

        <div className="patient-list">
          {patients.map((patient) => (
            <div className="patient-item" key={patient.id}>
              <div className="patient-main">
                <div className="avatar">
                  {patient.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </div>
                <div>
                  <h3>{patient.name}</h3>
                  <p>{patient.age} • {patient.lastVisit}</p>
                </div>
              </div>

              <div className="patient-meta">
                <span className={`status-pill ${patient.statusClass}`}>{patient.status}</span>
                <p>{patient.doctor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patients;
