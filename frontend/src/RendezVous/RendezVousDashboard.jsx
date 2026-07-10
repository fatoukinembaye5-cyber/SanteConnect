import { useEffect, useState } from 'react';
import { Search, Bell, AlertTriangle, FlaskConical, PackageX } from 'lucide-react';
import { fetchDashboardStats, fetchRendezvous } from '../services/rendezvousService';
import './rendezvous.css';

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
  const [stats, setStats] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifOuvert, setNotifOuvert] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const [statsData, rdvs] = await Promise.all([fetchDashboardStats(), fetchRendezvous()]);
        if (!mounted) return;
        setStats(statsData);
        const next = rdvs
          .sort((a, b) => (a.date_rendezvous || a.date || '').localeCompare(b.date_rendezvous || b.date || ''))
          .slice(0, 4)
          .map((rdv) => ({
            id: rdv.id,
            initials: rdv.patient?.name
              ? rdv.patient.name.split(' ').slice(0, 2).map((part) => part[0]).join('')
              : `${rdv.patient?.prenom || ''} ${rdv.patient?.nom || ''}`.trim().split(' ').slice(0, 2).map((part) => part[0]).join(''),
            nom: rdv.patient?.name || `${rdv.patient?.prenom || ''} ${rdv.patient?.nom || ''}`.trim() || 'Patient',
            motif: rdv.motif || 'Consultation',
            heure: rdv.heure_rendezvous || rdv.heure || '—',
            statut: rdv.statut === 'confirme' ? 'Confirmé' : rdv.statut === 'annule' ? 'Annulé' : rdv.statut === 'termine' ? 'Terminé' : 'À confirmer',
            couleur: rdv.statut === 'annule' ? 'red' : rdv.statut === 'termine' ? 'green' : rdv.statut === 'confirme' ? 'green' : 'yellow',
          }));
        setUpcoming(next);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || 'Erreur lors du chargement du tableau de bord.');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    try {
      const stored = JSON.parse(localStorage.getItem('user') || 'null');
      if (stored) setUser(stored);
    } catch {
      setUser(null);
    }

    loadData();
    return () => { mounted = false; };
  }, []);

  const nomAffiche = user?.name || 'Utilisateur';
  const dateAujourdhui = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  const maxSemaine = Math.max(...RDV_SEMAINE.map((j) => j.valeur));

  const getStatCards = () => {
    return [
      {
        label: "RDV AUJOURD'HUI",
        value: stats?.mes_rendezvous ?? stats?.total_rendezvous ?? '—',
        note: 'Rendez-vous disponibles du compte',
      },
      {
        label: 'PATIENTS EN ATTENTE',
        value: stats?.total_patients ?? stats?.patients_uniques ?? '—',
        note: 'Cumul global ou local selon rôle',
      },
      {
        label: 'CONSULTATIONS EFFECTUÉES',
        value: stats?.total_consultations ?? stats?.mes_consultations ?? '—',
        note: 'Informations du tableau de bord',
      },
      {
        label: 'RDV ANNULÉS',
        value: '—',
        note: 'Donnée de disponibilité à venir',
        danger: true,
      },
    ];
  };

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
          <div className="avatar-chip">{nomAffiche.slice(0, 2).toUpperCase()}</div>
        </div>
      </div>

      {notifOuvert && (
        <div className="panel" style={{ marginBottom: 18 }}>
          <p style={{ fontSize: 13, color: '#6b7a75' }}>
            Vous avez {ALERTES.length} nouvelles notifications — voir le panneau « Alertes & notifications » ci-dessous.
          </p>
        </div>
      )}

      <div className="kpi-grid">
        {getStatCards().map((card) => (
          <div key={card.label} className={`kpi-card ${card.danger ? 'danger' : ''}`}>
            <span className="kpi-label">{card.label}</span>
            <strong>{card.value}</strong>
            <span className={`kpi-note ${card.danger ? 'danger' : card.value !== '—' ? 'up' : ''}`}>{card.note}</span>
          </div>
        ))}
      </div>

      <div className="dash-grid">
        <div className="panel">
          <div className="panel-title">
            <h2>Prochains rendez-vous</h2>
            <span className="panel-tag">Aujourd'hui</span>
          </div>

          {loading && <div className="text-center p-6 text-gray-500">Chargement des rendez-vous...</div>}
          {error && <div className="text-center p-6 text-red-600">{error}</div>}
          {!loading && !error && upcoming.length === 0 && (
            <div className="text-center p-6 text-gray-500">Aucun rendez-vous à venir.</div>
          )}
          {!loading && !error && upcoming.map((rdv) => (
            <div key={rdv.id} className={`rdv-item ${rdv.couleur}`}>
              <div className="avatar">{rdv.initials}</div>
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
