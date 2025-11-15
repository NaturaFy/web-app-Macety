import React from 'react';
// Asegúrate de tener Font Awesome en tu index.html

function RecentActivity({ activities }) {
  return (
    <div className="activity-card">
      {/* Mapeamos cada actividad a un item de la lista */}
      {activities.map((activity) => (
        <div className="activity-item" key={activity.id}>
          {/* Icono */}
          <div className="activity-icon">
            <i className="fa-solid fa-droplet"></i>
          </div>
          {/* Detalles (texto y fecha) */}
          <div className="activity-details">
            <p className="activity-text">{activity.text}</p>
            <p className="activity-timestamp">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentActivity;