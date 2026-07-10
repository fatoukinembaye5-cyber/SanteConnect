import { useEffect, useState } from 'react';
import { createRendezvous, fetchPatients, fetchMedecins } from '../services/rendezvousService';
import './rendezvous.css';

function AjouterRendezVous() {
  const [formData, setFormData] = useState({
    patient_id: '',
    medecin_id: '',
    motif: 'Consultation générale',
    date_rendezvous: '',
    heure_rendezvous: '09:30',
    notes: '',
  });
  const [patients, setPatients] = useState([]);
  const [medecins, setMedecins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [patientsData, medecinsData] = await Promise.all([
          fetchPatients(),
          fetchMedecins(),
        ]);
        setPatients(patientsData);
        setMedecins(medecinsData);
      } catch {
        setMessage('Impossible de charger les patients ou médecins.');
      }
    };
    loadOptions();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await createRendezvous({
        patient_id: formData.patient_id,
        medecin_id: formData.medecin_id,
        date_rendezvous: formData.date_rendezvous,
        heure_rendezvous: formData.heure_rendezvous,
        motif: formData.motif,
      });
      setMessage('Rendez-vous créé avec succès.');
      setFormData({
        patient_id: '',
        medecin_id: '',
        motif: 'Consultation générale',
        date_rendezvous: '',
        heure_rendezvous: '09:30',
        notes: '',
      });
    } catch (err) {
      setMessage(err.message || 'Erreur lors de la création du rendez-vous.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      patient_id: '',
      medecin_id: '',
      motif: 'Consultation générale',
      date_rendezvous: '',
      heure_rendezvous: '09:30',
      notes: '',
    });
    setMessage('');
  };

  return (
    <div className="card">
      <h2>Nouveau rendez-vous</h2>

      <form onSubmit={handleSubmit}>
        {message ? (
          <div className="message-card">{message}</div>
        ) : null}

        <label>Patient</label>
        <select
          name="patient_id"
          value={formData.patient_id}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionner un patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.prenom} {patient.nom} — {patient.email}
            </option>
          ))}
        </select>

        <label>Médecin</label>
        <select
          name="medecin_id"
          value={formData.medecin_id}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionner un médecin</option>
          {medecins.map((medecin) => (
            <option key={medecin.id} value={medecin.id}>
              {medecin.prenom} {medecin.nom} — {medecin.email}
            </option>
          ))}
        </select>

        <label>Motif de consultation</label>
        <select
          name="motif"
          value={formData.motif}
          onChange={handleChange}
        >
          <option>Consultation générale</option>
          <option>Pédiatrie</option>
          <option>Cardiologie</option>
          <option>Gynécologie</option>
          <option>Suivi grossesse</option>
        </select>

        {/* Bloc conteneur pour mettre Date et Heure côte à côte */}
        <div className="datetime-container">
          <div className="datetime-field">
            <label>Date</label>
            <input
              type="date"
              name="date_rendezvous"
              value={formData.date_rendezvous}
              onChange={handleChange}
            />
          </div>

          <div className="datetime-field">
            <label>Heure</label>
            <select
              name="heure_rendezvous"
              value={formData.heure_rendezvous}
              onChange={handleChange}
            >
              <option>08:00</option>
              <option>08:30</option>
              <option>09:00</option>
              <option>09:30</option>
              <option>10:00</option>
              <option>10:30</option>
              <option>11:00</option>
              <option>11:30</option>
              <option>12:00</option>
              <option>14:00</option>
              <option>15:00</option>
              <option>15:30</option>
            </select>
          </div>
        </div>

        <label>Notes</label>
        <textarea
          name="notes"
          placeholder="Motif de consultation, observations..."
          value={formData.notes}
          onChange={handleChange}
        />

        <div className="submit-row">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Confirmer'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

export default AjouterRendezVous;