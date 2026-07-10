import { useEffect, useState } from 'react';
import { fetchRendezvous } from '../services/rendezvousService';
import './rendezvous.css';

function Calendrier() {
  const [rendezVous, setRendezVous] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadRendezVous = async () => {
      try {
        const data = await fetchRendezvous();
        if (!mounted) return;
        const sorted = data
          .slice()
          .sort((a, b) => (a.date_rendezvous || a.date || '').localeCompare(b.date_rendezvous || b.date || ''))
          .map((rdv) => ({
            heure: rdv.heure_rendezvous || rdv.heure || '—',
            patient: rdv.patient?.name || `${rdv.patient?.prenom || ''} ${rdv.patient?.nom || ''}`.trim() || 'Patient',
            consultation: rdv.motif || 'Consultation',
            statut: rdv.statut || 'En attente',
            classe: rdv.statut === 'annule' ? 'annule' : rdv.statut === 'termine' ? 'termine' : rdv.statut === 'confirme' ? 'encours' : 'attente',
          }));
        setRendezVous(sorted);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || 'Impossible de charger l’agenda.');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    loadRendezVous();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="agenda">
      <h2>Agenda</h2>

      {loading && <div className="text-center py-6 text-gray-500">Chargement de l'agenda...</div>}
      {error && <div className="text-center py-6 text-red-600">{error}</div>}
      {!loading && !error && rendezVous.length === 0 && (
        <div className="text-center py-6 text-gray-500">Aucun rendez-vous programmé.</div>
      )}

      {rendezVous.map((rdv, index) => (
        <div className="rdv" key={index}>
          <div className="heure">{rdv.heure}</div>

          <div className={`event ${rdv.classe}`}>
            <h4>{rdv.patient}</h4>
            {rdv.consultation && <p>{rdv.consultation}</p>}
            {rdv.statut && <small>{rdv.statut}</small>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Calendrier;
