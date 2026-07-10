import React, { useState } from 'react';

// Composant Patient qui accepte des propriétés (props)
const Patient = ({ nom, prenom, age, pathologie, numeroDossier }) => {
  // État pour savoir si le patient est actuellement hospitalisé
  const [estAdmis, setEstAdmis] = useState(true);

  // Fonction pour changer le statut du patient
  const dechargerPatient = () => {
    setEstAdmis(!estAdmis);
  };

  return (
    < div style={styles.card}>
      <h2 style={styles.header}>
        {prenom} {nom}
      </h2>
      <p style={styles.text}><strong>N° Dossier :</strong> {numeroDossier}</p>
      <p style={styles.text}><strong>Âge :</strong> {age} ans</p>
      <p style={styles.text}><strong>Diagnostic :</strong> {pathologie}</p>
      
      <p style={styles.text}>
        <strong>Statut : </strong>
        < span style={estAdmis ? styles.badgeAdmis : styles.badgeSorti}>
          {estAdmis ? "En cours de traitement" : "Sorti / Libéré"}
        </span>
      </p>

      <button 
        onClick={dechargerPatient} 
        style={estAdmis ? styles.buttonDanger : styles.buttonSuccess}
      >
        {estAdmis ? "Enregistrer la sortie" : "Ré-admettre le patient"}
      </button>
    </div>
  );
};

// Styles basiques en ligne pour le rendu (CSS-in-JS)
const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '400px',
    margin: '15px auto',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    margin: '0 0 15px 0',
    color: '#2c3e50',
    borderBottom: '2px solid #3498db',
    paddingBottom: '5px'
  },
  text: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '8px'
  },
  badgeAdmis: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '14px'
  },
  badgeSorti: {
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '14px'
  },
  buttonDanger: {
    backgroundColor: '#e67e22',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
    fontSize: '15px'
  },
  buttonSuccess: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
    fontSize: '15px'
  }
};

export default Patient;