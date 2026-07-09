import MaquetteLayout from '../components/MaquetteLayout';

const Medecin = () => {
  return (
    <MaquetteLayout num="M" title="Espace Médecin" desc="Tableau de bord médecin" url="santeconnect.sn/medecin">
      <div className="p-8">
        <h3 className="text-xl font-bold">Bienvenue, Médecin</h3>
        <p className="text-sm text-gray-600 mt-2">Placeholder pour l'espace médecin.</p>
      </div>
    </MaquetteLayout>
  );
};

export default Medecin;
