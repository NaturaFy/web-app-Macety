// Step3Calibrate.js - MODIFICADO
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AddPlant.css';

function Step3Calibrate() {
  const location = useLocation();
  const navigate = useNavigate();
  const deviceId = location.state?.deviceId || '';

  const handleNext = () => {
    // Pasar el deviceId al siguiente paso
    navigate('/add-plant/step-4', { 
      state: { 
        deviceId: deviceId 
      } 
    });
  };

  const handleBack = () => {
    navigate('/add-plant/step-2');
  };

  return (
    <div className="add-plant-content">
      <h2>Paso 3: Verificar Configuración</h2>
      
      {deviceId && (
        <div className="current-device-id">
          <p><strong>Device ID configurado:</strong> <code>{deviceId}</code></p>
        </div>
      )}
      
      <p>Antes de finalizar, revisa que todo esté correcto:</p>
      
      <ul className="wizard-checklist-detailed">
        <li>
          <div className="checklist-icon">
            {deviceId ? (
              <i className="fa-solid fa-circle-check"></i>
            ) : (
              <i className="fa-solid fa-circle-xmark"></i>
            )}
          </div>
          <div className="checklist-text">
            <strong>Sensor Configurado</strong>
            <span>
              {deviceId 
                ? `Device ID: ${deviceId} - Listo para enviar datos` 
                : 'No se configuró Device ID - La planta no tendrá datos del sensor'}
            </span>
          </div>
        </li>
        <li>
          <div className="checklist-icon"><i className="fa-solid fa-table-cells"></i></div>
          <div className="checklist-text">
            <strong>Maceta en Posición</strong>
            <span>Colocada sobre superficie plana y estable</span>
          </div>
        </li>
        <li>
          <div className="checklist-icon"><i className="fa-solid fa-plug"></i></div>
          <div className="checklist-text">
            <strong>Conectada a Corriente</strong>
            <span>LED de alimentación encendido</span>
          </div>
        </li>
      </ul>
      
      {!deviceId && (
        <div className="warning-box">
          <i className="fa-solid fa-triangle-exclamation"></i>
          <p>
            <strong>Advertencia:</strong> No configuraste un Device ID. 
            Tu planta se creará pero NO mostrará datos del sensor (temperatura, humedad, luz).
          </p>
          <button 
            className="warning-btn"
            onClick={() => navigate('/add-plant/step-2')}
          >
            <i className="fa-solid fa-arrow-left"></i> Volver a configurar sensor
          </button>
        </div>
      )}
      
      <div className="button-container">
        <button 
          onClick={handleBack} 
          className="add-plant-btn add-plant-btn-secondary"
        >
          <i className="fa-solid fa-arrow-left"></i> Anterior
        </button>
        
        <button 
          onClick={handleNext} 
          className="add-plant-btn"
        >
          {deviceId ? (
            <>
              <i className="fa-solid fa-check"></i> Continuar
            </>
          ) : (
            'Continuar sin Sensor'
          )}
        </button>
      </div>
    </div>
  );
}

export default Step3Calibrate;