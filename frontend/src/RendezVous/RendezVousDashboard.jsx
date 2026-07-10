import { useEffect, useState } from 'react';
import { Search, Bell, AlertTriangle, FlaskConical, PackageX } from 'lucide-react';
import './rendezvous.css';

// Données de démonstration — à remplacer par un appel à l'API Laravel
// (ex: GET /api/dashboard/admin) une fois le backend disponible.
const PROCHAINS_RDV = [
  { id: 1, initiales: 'SS', nom: 'Sophie Sarr', motif: 'Consultation générale', heure: '08:30', statut: 'Confirmé', couleur: 'green' },
  { id: 2, initiales: 'SD', nom: 'Sira Diaw', motif: 'Suivi grossesse', heure: '10:00', statut: 'À confirmer', couleur: 'yellow' },
  { id: 3, initiales: 'KD', nom: 'Khady Diène', motif: 'Consultation pédiatrique', heure: '11:00', statut: 'Nouveau patient', couleur: 'blue' },
  { id: 4, initiales: 'AR', nom: 'Abdou Razak', motif: 'Bilan de santé', heure: '15:30', statut: 'Annulé', couleur: 'red' },
];

const ALERTES = [
  { id: 1, type: 'success', icone: FlaskConical, titre: "Résultats d'analyse disponibles", texte: 'Patient : Khadija Ba — il y a 1h' },
  { id: 2, type: 'warning', icone: AlertTriangle, titre: 'RDV annulé — à recontacter', texte: 'Patient : Khadija Fall — 08:15' },
  { id: 3, type: 'danger', icone: PackageX, titre: 'Stock faible — Amoxicilline 500mg', texte: 'Pharmacie interne — à réapprovisionner' },
];

const RDV_SEMAINE = [
  { jour: 'Lun', valeur: 9 },
  { jour: 'Mar', valeur: 14 },
  { jour: 'Mer', valeur: 11 },
  { jour: 'Jeu', valeur: 16 },
  { jour: 'Ven', valeur: 12, aujourdhui: true },
  { jour: 'Sam', valeur: 6 },
  { jour: 'Dim', valeur: 2 },
];

const RendezVousDashboard = () => {
  const [user, setUser] = useState(null);
  const [notifOuvert, setNotifOuvert] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('user') || 'null');
      setUser(stored);
    } catch {
      setUser(null);
    }
  }, []);

  const nomAffiche = user?.name || 'Fatou Mbaye';
  const dateAujourdhui = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  const maxSemaine = Math.max(...RDV_SEMAINE.map((j) => j.valeur));

  return (
    <div>
      <div className="dash-header">
        <div>
          <h1>Tableau de bord</h1>
          <p>
            Bonjour, {nomAffiche} · {dateAujourdhui.charAt(0).toUpperCase() + dateAujourdhui.slice(1)} — Centre de Santé Thiès-Nord
          </p>
        </div>

        <div className="dash-header-actions">
          <button type="button" className="icon-btn" aria-label="Rechercher">
            <Search size={17} />
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label="Notifications"
            onClick={() => setNotifOuvert((v) => !v)}
          >
            <Bell size={17} />
            <span className="dot" />
          </button>
          <div className="avatar-chip">AD</div>
        </div>
      </div>

      {notifOuvert && (
        <div className="panel" style={{ marginBottom: 18 }}>
          <p style={{ fontSize: 13, color: '#6b7a75' }}>
            Vous avez {ALERTES.length} nouvelles notifications — voir le panneau « Alertes & notifications » ci-dessous.
          </p>
        </div>
      )}

      {/* KPI */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">RDV AUJOURD'HUI</span>
          <strong>12</strong>
          <span className="kpi-note up">↑ 2 par rapport à hier</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">PATIENTS EN ATTENTE</span>
          <strong>4</strong>
          <span className="kpi-note warn">Salle d'attente</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">CONSULTATIONS EFFECTUÉES</span>
          <strong>7</strong>
          <span className="kpi-note up">58% aujourd'hui</span>
        </div>
        <div className="kpi-card danger">
          <span className="kpi-label">RDV ANNULÉS</span>
          <strong>1</strong>
          <span className="kpi-note danger">À recontacter</span>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="dash-grid">
        {/* Prochains rendez-vous */}
        <div className="panel">
          <div className="panel-title">
            <h2>Prochains rendez-vous</h2>
            <span className="panel-tag">Aujourd'hui</span>
          </div>

          {PROCHAINS_RDV.map((rdv) => (
            <div key={rdv.id} className={`rdv-item ${rdv.couleur}`}>
              <div className="avatar">{rdv.initiales}</div>
              <div className="rdv-info">
                <h4>{rdv.nom}</h4>
                <p>{rdv.motif}</p>
              </div>
              <div className="rdv-time">
                <strong>{rdv.heure}</strong>
                <span>{rdv.statut}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Alertes & RDV par jour */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="panel">
            <div className="panel-title">
              <h2>Alertes &amp; notifications</h2>
            </div>
            {ALERTES.map((a) => {
              const Icone = a.icone;
              return (
                <div key={a.id} className={`alert-item ${a.type}`}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Icone size={14} /> {a.titre}
                  </h4>
                  <p>{a.texte}</p>
                </div>
              );
            })}
          </div>

          <div className="panel">
            <div className="panel-title">
              <h2>RDV par jour (semaine)</h2>
            </div>
            <div className="week-chart">
              {RDV_SEMAINE.map((j) => (
                <div className="bar-col" key={j.jour}>
                  <div
                    className={`bar ${j.aujourdhui ? 'today' : ''}`}
                    style={{ height: `${(j.valeur / maxSemaine) * 100}%` }}
                    title={`${j.valeur} RDV`}
                  />
                  <span className="bar-label">{j.jour}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RendezVousDashboard;
