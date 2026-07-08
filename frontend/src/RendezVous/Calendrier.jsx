import "./rendezvous.css";

function Calendrier() {
  const rendezVous = [
    {
      heure: "08:30",
      patient: "Serigne Samb",
      consultation: "Consultation générale - 30 min",
      statut: "Terminé",
      classe: "termine",
    },
    {
      heure: "09:30",
      patient: "Mamadou Tall",
      consultation: "Consultation générale - 30 min",
      statut: "En cours",
      classe: "encours",
    },
    {
      heure: "10:00",
      patient: "Sira Diaw",
      consultation: "Suivi grossesse - 45 min",
      statut: "⏳ En attente",
      classe: "attente",
    },
    {
      heure: "11:00",
      patient: "Khady Diene",
      consultation: "Pédiatrie - 30 min",
      statut: "✦ Nouveau",
      classe: "nouveau",
    },
    {
      heure: "12:00",
      patient: "Pause déjeuner",
      consultation: "",
      statut: "",
      classe: "indisponible",
    },
    {
      heure: "14:00",
      patient: "Créneau disponible",
      consultation: "",
      statut: "",
      classe: "indisponible",
    },
    {
      heure: "15:30",
      patient: "Abdou Razakh",
      consultation: "Bilan de santé - 60 min",
      statut: "✕ Annulé",
      classe: "annule",
    },
  ];

  return (
    <div className="agenda">
      <h2>Agenda du 2 juin 2026</h2>

      {rendezVous.map((rdv, index) => (
        <div className="rdv" key={index}>
          <div className="heure">{rdv.heure}</div>

          <div className={`event ${rdv.classe}`}>
            <h4>{rdv.patient}</h4>
            {rdv.consultation && <p>{rdv.consultation}</p>}
            {rdv.statut && <small>{rdv.statut}</small>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Calendrier;