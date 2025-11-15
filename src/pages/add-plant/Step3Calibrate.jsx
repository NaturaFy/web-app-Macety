import React from 'react';
import { Link } from 'react-router-dom';
import './AddPlant.css'; // Reutilizamos los mismos estilos

function Step3Calibrate() {
  return (
    <div className="add-plant-content">
      <h2>Paso 3: Calibrar los sensores</h2>
      <p>Para garantizar lecturas precisas, siga estos pasos para calibrar los sensores de su maceta inteligente MaceTy:</p>
      
      {/* --- Nueva checklist detallada --- */}
      <ul className="wizard-checklist-detailed">
        <li>
          <div className="checklist-icon">
            {/* Puedes cambiar este icono por uno de maceta si lo tienes */}
            <i className="fa-solid fa-seedling"></i>
          </div>
          <div className="checklist-text">
            <strong>1. Prepara la maceta</strong>
            <span>Coloque la maceta sobre una superficie plana y estable, alejada de la luz solar directa o de fuentes de calor.</span>
          </div>
        </li>
        <li>
          <div className="checklist-icon">
            <i className="fa-solid fa-seedling"></i>
          </div>
          <div className="checklist-text">
            <strong>2. Vacío y seco</strong>
            <span>Asegúrese de que el recipiente esté vacío y seco antes de comenzar el proceso de calibración.</span>
          </div>
        </li>
        <li>
          <div className="checklist-icon">
            <i className="fa-solid fa-seedling"></i>
          </div>
          <div className="checklist-text">
            <strong>3. Iniciar calibración</strong>
            <span>Mantenga presionado el botón de calibración en el potenciómetro hasta que el indicador LED comience a parpadear.</span>
          </div>
        </li>
        <li>
          <div className="checklist-icon">
            <i className="fa-solid fa-seedling"></i>
          </div>
          <div className="checklist-text">
            <strong>4. Espere a que finalice</strong>
            <span>El potenciómetro calibrará automáticamente los sensores. El indicador LED dejará de parpadear una vez finalizada la calibración.</span>
          </div>
        </li>
      </ul>
      
      {/* --- Contenedor de botones --- */}
      <div className="button-container">
        <Link to="/add-plant/step-2" className="add-plant-btn add-plant-btn-secondary">
          Anterior
        </Link>
        <Link to="/add-plant/step-4" className="add-plant-btn">
          Siguiente
        </Link>
      </div>
    </div>
  );
}

export default Step3Calibrate;