import React from 'react';
import StatsPage from './StatsPage';
import Notifications from './Notifications';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Tableau de bord SantéConnect</h1>
      <div style={{ display: 'flex', gap: '50px' }}>
        <StatsPage />
        <Notifications />
      </div>
    </div>
  );
};

export default Dashboard;