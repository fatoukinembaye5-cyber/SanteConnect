import React from 'react';

const Notifications = () => {
  const notifications = [
    { id: 1, message: "Nouveau rendez-vous : Dr. Ousmane Mbaye" },
    { id: 2, message: "Alerte : Stock de médicaments faible" }
  ];

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <ul>
        {notifications.map(n => (
          <li key={n.id}>{n.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;