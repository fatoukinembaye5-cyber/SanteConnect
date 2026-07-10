import { useEffect, useState } from 'react';
import './rendezvous.css';
import AjouterRendezVous from './AjouterRendezVous';
import Calendrier from './Calendrier';
import { fetchMedecins } from '../services/rendezvousService';

function ListeRendezVous() {
  const [medecins, setMedecins] = useState([]);
  const [selectedMedecin, setSelectedMedecin] = useState('');

  useEffect(() => {
    let mounted = true;
    const loadMedecins = async () => {
      try {
        const data = await fetchMedecins();
        if (!mounted) return;
        setMedecins(data);
      } catch {
        if (!mounted) return;
        setMedecins([]);
      }
    };
    loadMedecins();
    return () => { mounted = false; };
  }, []);

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div>
      <div className="header">
        <div>
          <h1>Rendez-vous</h1>
          <p>{today.charAt(0).toUpperCase() + today.slice(1)}</p>
        </div>

        <div className="actions">
          <select value={selectedMedecin} onChange={(e) => setSelectedMedecin(e.target.value)}>
            <option value="">Tous les médecins</option>
            {medecins.map((medecin) => (
              <option key={medecin.id} value={medecin.id}>
                {medecin.prenom} {medecin.nom}
              </option>
            ))}
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