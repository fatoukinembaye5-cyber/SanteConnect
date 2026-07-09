 
import MaquetteLayout from '../../components/MaquetteLayout';

const PatientDashboard = () => {
  return (
    <MaquetteLayout num="PD" title="Patient Dashboard" desc="Espace patient" url="santeconnect.sn/patient">
      <div className="p-8">
        <h3 className="text-xl font-bold">Tableau de bord Patient</h3>
        <p className="text-sm text-gray-600 mt-2">Contenu temporaire du tableau de bord patient.</p>
      </div>
    </MaquetteLayout>
  );
};

export default PatientDashboard;
