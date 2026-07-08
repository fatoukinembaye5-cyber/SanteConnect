import { useState } from "react";
import "./rendezvous.css";

function AjouterRendezVous() {
  const [formData, setFormData] = useState({
    patient: "",
    medecin: "Dr. Coumba Sene — Généraliste",
    consultation: "Consultation générale",
    date: "",
    heure: "09:30",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Rendez-vous enregistré !");
  };

  const handleReset = () => {
    setFormData({
      patient: "",
      medecin: "Dr. Coumba Sene — Généraliste",
      consultation: "Consultation générale",
      date: "",
      heure: "09:30",
      notes: "",
    });
  };

  return (
    <div className="card">
      <h2>Nouveau rendez-vous</h2>

      <form onSubmit={handleSubmit}>
        <label>Patient</label>
        <input
          type="text"
          name="patient"
          placeholder="Nom, prénom ou ID..."
          value={formData.patient}
          onChange={handleChange}
        />

        <label>Médecin & Spécialité</label>
        <select
          name="medecin"
          value={formData.medecin}
          onChange={handleChange}
        >
          <option>Dr. Coumba Sene — Généraliste</option>
          <option>Dr. Mamadou Fall — Pédiatre</option>
          <option>Dr. Fatou Ndiaye — Gynécologue</option>
        </select>

        <label>Type de consultation</label>
        <select
          name="consultation"
          value={formData.consultation}
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
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="datetime-field">
            <label>Heure</label>
            <select
              name="heure"
              value={formData.heure}
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

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <button type="submit" className="btn btn-primary">
            Confirmer
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