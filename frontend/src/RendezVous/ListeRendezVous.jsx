import "./rendezvous.css";
import AjouterRendezVous from "./AjouterRendezVous";
import Calendrier from "./Calendrier";

function ListeRendezVous() {
  return (
    <div className="page-rdv">

      {/* Barre latérale */}
      <aside className="sidebar">
        <div>
          <div className="logo">
            <h2>SantéConnect</h2>
          </div>
          <h4>Navigation</h4>
          <ul>
            <li>Tableau de bord</li>
            <li className="active">
              Rendez-vous <span className="badge-menu">12</span>
            </li>
            <li>Patients</li>
            <li>Médecins</li>
            <li>Dossiers</li>
          </ul>
        </div>

        <div className="bottom-menu">
          <ul>
            <li>Statistiques</li>
            <li>Pharmacie</li>
            <li>Paramètres</li>
          </ul>
        </div>
      </aside>

      {/* Contenu Principal */}
      <main className="contenu">
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
      </main>

    </div>
  );
}

export default ListeRendezVous;