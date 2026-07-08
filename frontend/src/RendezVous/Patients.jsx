import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Patients() {
  // Données fictives des patients au Sénégal
  const [patientsData] = useState([
    { id: 'P-0042', nom: 'Sira Diaw', initials: 'SD', age: '28 ans', genre: 'F', medecin: 'Dr. Diallo', telephone: '+221 77 123 45 67', statut: 'Suivi' },
    { id: 'P-0041', nom: 'Mamadou Tall', initials: 'MT', age: '45 ans', genre: 'M', medecin: 'Dr. Diallo', telephone: '+221 76 987 65 43', statut: 'Urgence' },
    { id: 'P-0039', nom: 'Omar Sow', initials: 'OS', age: '8 ans', genre: 'M', medecin: 'Dr. Mbaye', telephone: '+221 70 345 21 09', statut: 'Suivi' },
    { id: 'P-0038', nom: 'Aissatou Ba', initials: 'AB', age: '62 ans', genre: 'F', medecin: 'Dr. Diallo', telephone: '+221 77 555 44 33', statut: 'Stable' },
    { id: 'P-0035', nom: 'Ibrahima Fall', initials: 'IF', age: '34 ans', genre: 'M', medecin: 'Dr. Diallo', telephone: '+221 77 444 11 22', statut: 'Stable' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les patients selon la recherche
  const filteredPatients = patientsData.filter(patient =>
    patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '24px', backgroundColor: '#f4f5f7', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* En-tête avec statistiques */}
        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
          <div>
            <h1 style={{ margin: '0 0 4px 0', color: '#111827', fontSize: '24px' }}>Gestion des Patients</h1>
            <p style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>Liste globale et accès aux dossiers médicaux électroniques.</p>
          </div>
          <button style={{ backgroundColor: '#0f766e', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
            + Enregistrer un patient
          </button>
        </div>

        {/* Barre de recherche */}
        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Rechercher un patient par nom ou identifiant (ex: P-0042)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none' }}
          />
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            {filteredPatients.length} patient(s) trouvé(s)
          </div>
        </div>

        {/* Tableau des patients */}
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
              {filteredPatients.map((patient) => (
                <tr key={patient.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ccfbf1', color: '#115e59', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {patient.initials}
                      </div>
                      <span style={{ fontWeight: 'bold', color: '#111827' }}>{patient.nom}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontFamily: 'monospace', color: '#0f766e', fontWeight: 'bold', fontSize: '12px' }}>{patient.id}</div>
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