import { useState } from "react";
import "./rendezvous.css";

function MesRendezVous() {
  const [mesRendezVous] = useState([
    {
      id: 1,
      date: "02/06/2026",
      heure: "08:30",
      medecin: "Dr. Coumba Sene",
      consultation: "Consultation générale",
      statut: "Terminé",
    },
    {
      id: 2,
      date: "02/06/2026",
      heure: "09:30",
      medecin: "Dr. Mamadou Fall",
      consultation: "Consultation générale",
      statut: "En cours",
    },
    {
      id: 3,
      date: "02/06/2026",
      heure: "10:00",
      medecin: "Dr. Fatou Ndiaye",
      consultation: "Suivi grossesse",
      statut: "En attente",
    },
    {
      id: 4,
      date: "03/06/2026",
      heure: "11:00",
      medecin: "Dr. Coumba Sene",
      consultation: "Pédiatrie",
      statut: "Nouveau",
    },
    {
      id: 5,
      date: "04/06/2026",
      heure: "15:30",
      medecin: "Dr. Coumba Sene",
      consultation: "Bilan de santé",
      statut: "Annulé",
    },
  ]);

  const getClass = (statut) => {
    switch (statut) {
      case "Terminé":
        return "termine";
      case "En cours":
        return "encours";
      case "En attente":
        return "attente";
      case "Nouveau":
        return "nouveau";
      case "Annulé":
        return "annule";
      default:
        return "";
    }
  };

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
          {mesRendezVous.map((rdv) => (
            <tr key={rdv.id}>
              <td>{rdv.date}</td>
              <td>{rdv.heure}</td>
              <td>{rdv.medecin}</td>
              <td>{rdv.consultation}</td>
              <td>
                <span className={`badge ${getClass(rdv.statut)}`}>
                  {rdv.statut}
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