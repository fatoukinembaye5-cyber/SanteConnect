import { useEffect, useState } from 'react';
import { fetchMesRendezvous } from '../services/rendezvousService';
import './rendezvous.css';

function MesRendezVous() {
  const [mesRendezVous, setMesRendezVous] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadMesRendezVous = async () => {
      try {
        const data = await fetchMesRendezvous();
        if (!mounted) return;
        setMesRendezVous(data);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || 'Impossible de charger vos rendez-vous.');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    loadMesRendezVous();
    return () => { mounted = false; };
  }, []);

  const getClass = (statut) => {
    switch (statut) {
      case 'termine':
        return 'termine';
      case 'en cours':
      case 'confirme':
        return 'encours';
      case 'en attente':
      case 'en_attente':
        return 'attente';
      case 'nouveau':
        return 'nouveau';
      case 'annule':
      case 'annulé':
        return 'annule';
      default:
        return 'attente';
    }
  };

  const formatName = (medecin) =>
    medecin?.name || `${medecin?.prenom || ''} ${medecin?.nom || ''}`.trim() || 'Médecin';

  return (
    <div className="card">
      <h2>Mes rendez-vous</h2>

      <table className="table-rdv">
        <thead>
          <tr>
            <th>Date</th>
            <th>Heure</th>
            <th>Médecin</th>
            <th>Consultation</th>
            <th>Statut</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan={5} className="text-center p-4">Chargement des rendez-vous...</td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={5} className="text-center p-4 text-red-600">{error}</td>
            </tr>
          )}
          {!loading && !error && mesRendezVous.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">Aucun rendez-vous trouvé.</td>
            </tr>
          )}
          {!loading && !error && mesRendezVous.map((rdv) => (
            <tr key={rdv.id}>
              <td>{rdv.date_rendezvous || rdv.date || '—'}</td>
              <td>{rdv.heure_rendezvous || rdv.heure || '—'}</td>
              <td>{formatName(rdv.medecin)}</td>
              <td>{rdv.motif || rdv.consultation || '—'}</td>
              <td>
                <span className={`badge ${getClass(rdv.statut)}`}>
                  {rdv.statut || 'En attente'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MesRendezVous;
