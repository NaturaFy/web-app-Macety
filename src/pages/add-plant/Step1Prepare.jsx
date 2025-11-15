import React from 'react';
import { Link } from 'react-router-dom';
import './AddPlant.css'; // Reutilizamos los mismos estilos

function Step1Prepare() {
  return (
    <div className="add-plant-content">
      <h2>Paso 1: Preparar la Maceta</h2>
      {/* Texto actualizado para coincidir con la nueva imagen */}
      <p>Asegúrate de que tu maceta esté encendida y completamente cargada antes de continuar.</p>
      
      {/* El Link nos lleva a la siguiente ruta anidada */}
      <Link to="/add-plant/step-2" className="add-plant-btn">
        Siguiente
      </Link>
    </div>
  );
}

export default Step1Prepare;