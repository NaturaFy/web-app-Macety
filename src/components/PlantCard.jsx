import React from 'react';
// (Asegúrate de tener Font Awesome en tu index.html)

function PlantCard({ plant }) {
  // El backend nos da la URL de la imagen directamente
  const imageUrl = plant.imageUrl || 'https://i.imgur.com/gqA90sL.png'; // Una imagen por defecto

  return (
    <div className="plant-card">
      {/* --- Encabezado de la Tarjeta (Datos Reales) --- */}
      <div className="card-header">
        <img src={imageUrl} alt={plant.name} className="plant-image" />
        <div className="plant-info">
          <h3 className="plant-name">{plant.name}</h3>
          <p className="plant-sci-name">{plant.species}</p>
          <p className="plant-location">
            <i className="fa-solid fa-location-dot"></i> {plant.description}
          </p>
        </div>
      </div>
      
      {/* --- ¡SECCIÓN DE SENSORES CON DATOS VACÍOS (--)! --- */}
      {/* (Estos se conectarán en el futuro) */}
      
      <div className="data-grid">
        <div className="data-item">
          <i className="fa-solid fa-temperature-half icon-temp"></i>
          <div>
            <span className="data-value">--</span>
            <span className="data-label">Temperatura</span>
          </div>
        </div>
        <div className="data-item">
          <i className="fa-solid fa-droplet icon-water"></i>
          <div>
            <span className="data-value">--</span>
            <span className="data-label">Nivel de agua</span>
          </div>
        </div>
        <div className="data-item">
          <i className="fa-solid fa-sun icon-lux"></i>
          <div>
            <span className="data-value">--</span>
            <span className="data-label">Media</span>
          </div>
        </div>
        <div className="data-item">
          <i className="fa-solid fa-leaf icon-humidity"></i>
          <div>
            <span className="data-value">--</span>
            <span className="data-label">Humedad del suelo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantCard;