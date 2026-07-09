 
import MaquetteLayout from '../../components/MaquetteLayout';

const AdminDashboard = () => {
  return (
    <MaquetteLayout num="AD" title="Admin Dashboard" desc="Espace administrateur" url="santeconnect.sn/admin">
      <div className="p-8">
        <h3 className="text-xl font-bold">Tableau de bord Administrateur</h3>
        <p className="text-sm text-gray-600 mt-2">Contenu temporaire du tableau de bord admin.</p>
      </div>
    </MaquetteLayout>
  );
};

export default AdminDashboard;
