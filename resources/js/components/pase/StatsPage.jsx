
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatsPage = () => {
  const data = {
    labels: ['Adultes', 'Femmes enceintes', 'Enfants'],
    datasets: [{
      data: [794, 310, 136],
      backgroundColor: ['#004d40', '#1e88e5', '#8d6e63'],
    }]
  };

  return (
    <div className="stats-container">
      <h2>Statistiques du centre</h2>
      <div style={{ width: '300px' }}>
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default StatsPage;