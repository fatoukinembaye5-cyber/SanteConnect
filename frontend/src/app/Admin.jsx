import React from 'react';
import MaquetteLayout from '../components/MaquetteLayout';

const Admin = () => {
  return (
    <MaquetteLayout num="A" title="Espace Administrateur" desc="Tableau de bord administrateur" url="santeconnect.sn/admin">
      <div className="p-8">
        <h3 className="text-xl font-bold">Bienvenue, Administrateur</h3>
        <p className="text-sm text-gray-600 mt-2">Cette page sert de placeholder pour vérifier la navigation après connexion.</p>
      </div>
    </MaquetteLayout>
  );
};

export default Admin;
