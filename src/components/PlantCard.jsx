import React from 'react';
// Asegúrate de que Font Awesome esté cargado en tu index.html

function PlantCard({ plant }) {
  // 1. Extraemos los datos del sensor que inyectamos en Home.js
  // Si no existen datos, usamos un objeto vacío {} para evitar errores
  const { temp, hum, light } = plant.sensorData || {};

  // 2. Gestión de la imagen: Usamos la URL de la planta o una por defecto
  const imageUrl = plant.imageUrl || 'https://i.imgur.com/gqA90sL.png';

  return (
    <div className="plant-card">
      {/* --- Encabezado de la Tarjeta --- */}
      <div className="card-header">
        <img 
            src={imageUrl} 
            alt={plant.name} 
            className="plant-image" 
            // Si la imagen falla al cargar, ponemos la de respaldo automáticamente
            onError={(e) => {e.target.onerror = null; e.target.src='https://i.imgur.com/gqA90sL.png'}}
        />
        <div className="plant-info">
          <h3 className="plant-name">{plant.name}</h3>
          <p className="plant-sci-name">{plant.species}</p>
          <p className="plant-location">
            <i className="fa-solid fa-location-dot"></i> {plant.description}
          </p>
        </div>
      </div>
      
      {/* --- SECCIÓN DE SENSORES (Datos Reales) --- */}
      <div className="data-grid">
        
        {/* 1. Temperatura */}
        <div className="data-item">
          <i className="fa-solid fa-temperature-half icon-temp"></i>
          <div>
            <span className="data-value">
              {/* Si hay dato lo mostramos, si no (null/undefined) mostramos '--' */}
              {temp !== null && temp !== undefined ? `${temp}°C` : '--'}
            </span>
            <span className="data-label">Temperatura</span>
          </div>
        </div>

        {/* 2. Media (Mapeado al valor de Luz 'light') */}
        <div className="data-item">
          <i className="fa-solid fa-sun icon-lux"></i>
          <div>
            <span className="data-value">
              {light !== null && light !== undefined ? `${light} lx` : '--'}
            </span>
            <span className="data-label">Media</span>
          </div>
        </div>

        {/* 3. Humedad del suelo (Mapeado al valor 'hum') */}
        <div className="data-item">
          <i className="fa-solid fa-leaf icon-humidity"></i>
          <div>
            <span className="data-value">
              {hum !== null && hum !== undefined ? `${hum}%` : '--'}
            </span>
            <span className="data-label">Humedad del suelo</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PlantCard;