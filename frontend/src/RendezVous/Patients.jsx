import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPatients } from '../services/rendezvousService';

export default function Patients() {
  const [patientsData, setPatientsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadPatients = async () => {
      try {
        const data = await fetchPatients();
        if (!mounted) return;
        setPatientsData(data);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || 'Impossible de charger les patients.');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    loadPatients();
    return () => { mounted = false; };
  }, []);

  const mappedPatients = patientsData.map((patient) => {
    const fullName = patient.name || `${patient.prenom || ''} ${patient.nom || ''}`.trim() || 'Patient';
    const initials = fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('') || 'PA';
    const age = patient.date_naissance ? `${new Date().getFullYear() - new Date(patient.date_naissance).getFullYear()} ans` : '—';
    return {
      id: patient.id,
      displayId: `P-${String(patient.id).padStart(4, '0')}`,
      name: fullName,
      initials,
      age,
      genre: patient.sexe || '—',
      medecin: patient.medecin || '—',
      telephone: patient.telephone || patient.email || '—',
      statut: patient.statut || 'Nouveau',
    };
  });

  const filteredPatients = mappedPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.displayId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '24px', backgroundColor: '#f4f5f7', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
          <div>
            <h1 style={{ margin: '0 0 4px 0', color: '#111827', fontSize: '24px' }}>Gestion des Patients</h1>
            <p style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>Liste globale et accès aux dossiers médicaux électroniques.</p>
          </div>
          <button style={{ backgroundColor: '#0f766e', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
            + Enregistrer un patient
          </button>
        </div>

        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Rechercher un patient par nom ou identifiant (ex: P-0042)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none' }}
          />
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            {loading ? 'Chargement...' : `${filteredPatients.length} patient(s) trouvé(s)`}
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', color: '#374151', textTransform: 'uppercase', fontSize: '12px' }}>
              <tr>
                <th style={{ padding: '12px 16px' }}>Patient</th>
                <th style={{ padding: '12px 16px' }}>ID / Contact</th>
                <th style={{ padding: '12px 16px' }}>Âge / Genre</th>
                <th style={{ padding: '12px 16px' }}>Médecin Réf.</th>
                <th style={{ padding: '12px 16px' }}>Statut</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>Chargement des patients...</td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#b91c1c' }}>{error}</td>
                </tr>
              )}
              {!loading && !error && filteredPatients.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>Aucun patient trouvé.</td>
                </tr>
              )}
              {!loading && !error && filteredPatients.map((patient) => (
                <tr key={patient.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ccfbf1', color: '#115e59', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {patient.initials}
                      </div>
                      <span style={{ fontWeight: 'bold', color: '#111827' }}>{patient.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontFamily: 'monospace', color: '#0f766e', fontWeight: 'bold', fontSize: '12px' }}>{patient.displayId}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{patient.telephone}</div>
                  </td>
                  <td style={{ padding: '16px', color: '#4b5563' }}>{patient.age} ({patient.genre})</td>
                  <td style={{ padding: '16px', color: '#4b5563', fontWeight: '500' }}>{patient.medecin}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                      backgroundColor: patient.statut === 'Urgence' ? '#fee2e2' : patient.statut === 'Suivi' ? '#dbeafe' : '#dcfce7',
                      color: patient.statut === 'Urgence' ? '#991b1b' : patient.statut === 'Suivi' ? '#1e40af' : '#166534'
                    }}>
                      {patient.statut}
                    </span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <Link
                      to={`/admin/patients/dossier/${patient.id}`}
                      style={{ textDecoration: 'none', backgroundColor: '#f3f4f6', color: '#374151', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', border: '1px solid #e5e7eb', display: 'inline-block' }}
                    >
                      Dossier Médical
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
