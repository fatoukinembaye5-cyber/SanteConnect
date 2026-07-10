import { useEffect, useState } from 'react';
import { fetchDashboardStats } from '../services/rendezvousService';
import './rendezvous.css';

const Statistiques = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadStats = async () => {
      try {
        const data = await fetchDashboardStats();
        if (!mounted) return;
        setStats(data);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || 'Impossible de charger les statistiques.');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    loadStats();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <div className="header">
        <div>
          <h1>Statistiques</h1>
          <p>Vue d'ensemble des indicateurs de performance.</p>
        </div>
      </div>

      {loading && <div className="p-6 text-gray-500">Chargement des statistiques...</div>}
      {error && <div className="p-6 text-red-600">{error}</div>}

      {!loading && !error && (
        <div className="grid-dashboard">
          <div className="card">
            <h2>Rendez-vous</h2>
            <p>{stats?.total_rendezvous ?? stats?.mes_rendezvous ?? '—'}</p>
            <small>{stats?.total_rendezvous != null ? 'Total de rendez-vous' : 'Rendez-vous de votre compte'}</small>
          </div>
          <div className="card">
            <h2>Consultations</h2>
            <p>{stats?.total_consultations ?? stats?.mes_consultations ?? '—'}</p>
            <small>{stats?.total_consultations != null ? 'Total consultations' : 'Vos consultations'}</small>
          </div>
          <div className="card">
            <h2>Patients</h2>
            <p>{stats?.total_patients ?? stats?.patients_uniques ?? '—'}</p>
            <small>{stats?.total_patients != null ? 'Total patients' : 'Patients uniques'}</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistiques;
