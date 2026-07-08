import './rendezvous.css';
import AjouterRendezVous from './AjouterRendezVous';
import Calendrier from './Calendrier';

function ListeRendezVous() {
  return (
    <div>
      <div className="header">
        <div>
          <h1>Rendez-vous</h1>
          <p>2 juin 2026</p>
        </div>

        <div className="actions">
          <select>
            <option>Tous les médecins</option>
            <option>Dr Coumba Sene</option>
            <option>Dr Fall</option>
          </select>
          <button>Nouveau RDV</button>
        </div>
      </div>

      <div className="contenu-rdv">
        <div className="gauche">
          <AjouterRendezVous />
        </div>
        <div className="droite">
          <Calendrier />
        </div>
      </div>
    </div>
  );
}

export default ListeRendezVous;