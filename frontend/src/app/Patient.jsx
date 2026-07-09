import MaquetteLayout from '../components/MaquetteLayout';

const Patient = () => {
  return (
    <MaquetteLayout num="P" title="Espace Patient" desc="Espace patient" url="santeconnect.sn/patient">
      <div className="p-8">
        <h3 className="text-xl font-bold">Bienvenue, Patient</h3>
        <p className="text-sm text-gray-600 mt-2">Placeholder pour l'espace patient.</p>
      </div>
    </MaquetteLayout>
  );
};

export default Patient;
