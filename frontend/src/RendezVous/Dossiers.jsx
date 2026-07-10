import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchDossiers } from '../services/rendezvousService';

export default function Dossiers() {
  const { id } = useParams();
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadDossiers = async () => {
      try {
        const data = await fetchDossiers();
        if (!mounted) return;
        setDossiers(data);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || 'Impossible de charger les dossiers médicaux.');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    loadDossiers();
    return () => { mounted = false; };
  }, []);

  const filteredDossiers = id
    ? dossiers.filter((dossier) => String(dossier.patient_id) === String(id) || String(dossier.patient?.id) === String(id))
    : dossiers;

  return (
    <div style={{ padding: '24px', backgroundColor: '#f4f5f7', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Link to="/rendezvous" style={{ color: '#0f766e', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
          ← Retour à l'espace rendez-vous
        </Link>

        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <div>
              <span style={{ fontFamily: 'monospace', backgroundColor: '#f0fdfa', color: '#0f766e', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                ID: {id || 'Tous'}
              </span>
              <h2 style={{ margin: '8px 0 0 0', color: '#111827' }}>Dossiers Médicaux</h2>
            </div>
            <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 'bold' }}>
              {filteredDossiers.length} dossier(s)
            </span>
          </div>

          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', fontSize: '14px' }}>
            <div>
              <p style={{ color: '#9ca3af', margin: '0 0 4px 0', fontSize: '12px' }}>Dossiers chargés</p>
              <p style={{ margin: '0', fontWeight: 'bold', color: '#1f2937' }}>{filteredDossiers.length}</p>
            </div>
            <div>
              <p style={{ color: '#9ca3af', margin: '0 0 4px 0', fontSize: '12px' }}>Source</p>
              <p style={{ margin: '0', fontWeight: 'bold', color: '#1f2937' }}>API Backend</p>
            </div>
          </div>
        </div>

        {loading && (
          <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', color: '#6b7280' }}>
            Chargement des dossiers...
          </div>
        )}
        {error && (
          <div style={{ backgroundColor: '#fee2e2', padding: '20px', borderRadius: '8px', border: '1px solid #fca5a5', color: '#991b1c' }}>
            {error}
          </div>
        )}
        {!loading && !error && filteredDossiers.length === 0 && (
          <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', color: '#6b7280' }}>
            Aucune entrée de dossier trouvée.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {!loading && !error && filteredDossiers.map((item) => {
            const patientName = item.patient?.name || `${item.patient?.prenom || ''} ${item.patient?.nom || ''}`.trim() || 'Patient inconnu';
            return (
              <div key={item.id} style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold', color: '#0f766e' }}>{patientName}</span>
                  <span style={{ color: '#9ca3af', fontFamily: 'monospace' }}>Dossier #{item.id}</span>
                </div>
                <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#6b7280' }}>
                  Groupe sanguin : {item.groupe_sanguin || 'N/A'} · Allergies : {item.allergies || 'Aucune'}
                </p>
                <div style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #0f766e', fontSize: '14px', color: '#374151' }}>
                  {item.notes || 'Aucune note disponible.'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
