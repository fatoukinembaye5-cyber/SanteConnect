import React from 'react';
import { Outlet } from 'react-router-dom';
import MaquetteLayout from '../components/MaquetteLayout';

const PatientLayout = () => {
  return (
    <MaquetteLayout num="P" title="Espace Patient" desc="Espace patient" url="santeconnect.sn/patient">
      <div className="p-6">
        <Outlet />
      </div>
    </MaquetteLayout>
  );
};

export default PatientLayout;
