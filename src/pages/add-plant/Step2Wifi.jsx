import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddPlant.css';

function Step2Wifi() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para conectar a Wi-Fi...
    // Al terminar, navegamos al siguiente paso:
    navigate('/add-plant/step-3');
  };

  return (
    <div className="add-plant-content">
      <h2>Paso 2: Conéctese a Wi-Fi</h2>
      <p>Selecciona una red Wi-Fi y escribe la contraseña para tu maceta.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group-wizard">
          <label htmlFor="wifi-select">Seleccionar red Wi-Fi</label>
          <select id="wifi-select" className="form-input-wizard" required>
            <option value="">Buscando redes...</option>
            <option value="red-1">MiCasa_WiFi</option>
            <option value="red-2">Vecino_WiFi</option>
          </select>
        </div>
        
        <div className="form-group-wizard">
          <label htmlFor="wifi-pass">Contraseña</label>
          <input type="password" id="wifi-pass" className="form-input-wizard" required />
        </div>

        <button type="submit" className="add-plant-btn">
          Conectar
        </button>
      </form>
    </div>
  );
}

export default Step2Wifi;