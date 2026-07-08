import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Dossiers() {
  const { id } = useParams(); // Récupère dynamiquement l'ID (ex: P-0042) passé dans l'URL

  // Simulation de l'historique médical pour le patient sélectionné
  const consultations = [
    { date: '08/07/2026', motif: 'Consultation de routine', medecin: 'Dr. Diallo', constantes: 'TA: 12/8, Pouls: 72 bpm', observations: 'Patient en bonne forme. Continuer le traitement préventif.' },
    { date: '14/05/2026', motif: 'Fièvre et maux de tête', medecin: 'Dr. Diallo', constantes: 'Température: 39°C', observations: 'Test Palu Positif. Prescription d\'un traitement CTA.' }
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f4f5f7', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Bouton de retour */}
        <Link to="/admin" style={{ color: '#0f766e', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
          ← Retour à la liste des patients
        </Link>

        {/* Fiche d'identité du Dossier */}
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div>
              <span style={{ fontFamily: 'monospace', backgroundColor: '#f0fdfa', color: '#0f766e', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                ID: {id || 'P-0042'}
              </span>
              <h2 style={{ margin: '8px 0 0 0', color: '#111827' }}>Dossier Médical Électronique</h2>
            </div>
            <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 'bold' }}>
              Dossier Actif
            </span>
          </div>

          <hr style={{ border: '0', borderTop: '1px solid #e5e7eb', margin: '15px 0' }} />

          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', fontSize: '14px' }}>
            <div>
              <p style={{ color: '#9ca3af', margin: '0 0 4px 0', fontSize: '12px' }}>Groupe Sanguin</p>
              <p style={{ margin: '0', fontWeight: 'bold', color: '#1f2937' }}>O+</p>
            </div>
            <div>
              <p style={{ color: '#9ca3af', margin: '0 0 4px 0', fontSize: '12px' }}>Allergies connues</p>
              <p style={{ margin: '0', fontWeight: 'bold', color: '#dc2626' }}>Pénicilline</p>
            </div>
            <div>
              <p style={{ color: '#9ca3af', margin: '0 0 4px 0', fontSize: '12px' }}>Région / Ville</p>
              <p style={{ margin: '0', fontWeight: 'bold', color: '#1f2937' }}>Dakar, Sénégal</p>
            </div>
          </div>
        </div>

        {/* Section Historique Clinique */}
        <div>
          <h3 style={{ color: '#111827', marginBottom: '15px' }}>Historique des Consultations</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {consultations.map((item, index) => (
              <div key={index} style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold', color: '#0f766e' }}>{item.motif}</span>
                  <span style={{ color: '#9ca3af', fontFamily: 'monospace' }}>{item.date}</span>
                </div>
                <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#6b7280' }}>
                  Médecin : {item.medecin} | <span style={{ fontFamily: 'monospace' }}>{item.constantes}</span>
                </p>
                <div style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #0f766e', fontSize: '14px', color: '#374151' }}>
                  {item.observations}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}