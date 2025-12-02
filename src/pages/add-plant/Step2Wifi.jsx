// Step2Wifi.js - ASÍ DEBE QUEDAR
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddPlant.css';

function Step2Wifi() {
  const navigate = useNavigate();
  const [deviceId, setDeviceId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!deviceId.trim()) {
      alert('⚠️ Por favor ingresa un Device ID para el sensor');
      return;
    }
    
    console.log('📝 Device ID capturado:', deviceId);
    
    // Pasar el deviceId al siguiente paso
    navigate('/add-plant/step-3', { 
      state: { 
        deviceId: deviceId.trim() 
      } 
    });
  };

  return (
    <div className="add-plant-content">
      <h2>Paso 2: Configurar Sensor</h2>
      
      <div className="info-box">
        <i className="fa-solid fa-circle-info"></i>
        <p>
          <strong>IMPORTANTE:</strong> El Device ID es CRÍTICO para que tu planta muestre datos.
          Sin este ID, no verás temperatura, humedad ni luz.
        </p>
      </div>
      
      <p>Ingresa el ID del dispositivo sensor:</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group-wizard">
          <label htmlFor="device-id" className="required-label">
            <i className="fa-solid fa-microchip"></i> Device ID del Sensor *
          </label>
          <input 
            type="text" 
            id="device-id" 
            className="form-input-wizard" 
            placeholder="Ej: 1, 2, 3, SENSOR_001" 
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            required 
            autoFocus
          />
          <div className="form-help">
            <p><strong>¿Dónde encuentro esto?</strong></p>
            <ul>
              <li>Está impreso en la etiqueta de tu maceta MaceTy</li>
              <li>Generalmente es un número como: 1, 2, 3, etc.</li>
              <li>Si es tu primera planta, usa: <strong>1</strong></li>
            </ul>
          </div>
        </div>

        <div className="form-divider"></div>

        

        <button type="submit" className="add-plant-btn">
          <i className="fa-solid fa-arrow-right"></i> Continuar al Paso 3
        </button>
      </form>
      
      {/* Ejemplo visual */}
      <div className="example-box">
        <h4><i className="fa-solid fa-lightbulb"></i> Ejemplo de cómo quedarán los datos:</h4>
        <div className="sensor-example">
          <div className="sensor-value-example">
            <span className="value">22.5°C</span>
            <span className="label">Temperatura</span>
          </div>
          <div className="sensor-value-example">
            <span className="value">55.8%</span>
            <span className="label">Humedad</span>
          </div>
          <div className="sensor-value-example">
            <span className="value">350 lux</span>
            <span className="label">Intensidad Lumínica</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step2Wifi;