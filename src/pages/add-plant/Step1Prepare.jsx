import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddPlant.css';

function Step1Prepare() {
  const navigate = useNavigate();

  const handleNext = () => {
    // Corrección: Navegamos al Paso 2 (Calibración)
    // Nota: La ruta es 'step-3' porque eliminamos el antiguo paso de WiFi, 
    // pero visualmente este será el "Paso 2".
    navigate('/add-plant/step-2');
  };

  return (
    <div className="add-plant-content">
      <h2>Paso 1: Preparar la Maceta</h2>
      <p>Antes de registrar el sensor en el sistema, asegúrate de que el dispositivo esté listo.</p>
      
      <div className="wizard-instructions">
        <ul className="wizard-checklist-detailed">
            <li>
                <div className="checklist-icon"><i className="fa-solid fa-power-off"></i></div>
                <div className="checklist-text">
                    <strong>Encendido</strong>
                    <span>Conecta tu maceta a la corriente. El LED debe estar encendido.</span>
                </div>
            </li>
            <li>
                <div className="checklist-icon"><i className="fa-solid fa-wifi"></i></div>
                <div className="checklist-text">
                    <strong>Conexión</strong>
                    <span>Asegúrate de que la maceta esté cerca de tu router Wi-Fi.</span>
                </div>
            </li>
        </ul>
      </div>

      <button onClick={handleNext} className="add-plant-btn">
        Continuar
      </button>
    </div>
  );
}

export default Step1Prepare;