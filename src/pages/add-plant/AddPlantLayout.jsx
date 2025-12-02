import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './AddPlant.css';

function AddPlantLayout() {
  // 1. ESTADO COMPARTIDO (Memoria del Asistente)
  // Aquí guardaremos el ID del sensor capturado en el Paso 1
  const [wizardData, setWizardData] = useState({
    deviceId: '', 
  });

  // 2. FUNCIÓN PARA ACTUALIZAR DATOS
  const updateWizardData = (newData) => {
    setWizardData(prev => ({ ...prev, ...newData }));
  };

  return (
    <div className="add-plant-layout">
      <header className="add-plant-header">
        <Link to="/" className="add-plant-logo">
          <i className="fa-solid fa-leaf"></i>
          NaturaFy
        </Link>
        <Link to="/help" className="add-plant-help" aria-label="Ayuda">?</Link>
      </header>

      <main className="add-plant-main">
        {/* 3. ¡IMPORTANTE! Pasamos el contexto aquí para que Step1 no falle */}
        <Outlet context={{ wizardData, updateWizardData }} />
      </main>
    </div>
  );
}

export default AddPlantLayout;