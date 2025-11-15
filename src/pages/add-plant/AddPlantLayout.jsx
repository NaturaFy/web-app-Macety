import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './AddPlant.css'; // Importamos los estilos del asistente

function AddPlantLayout() {
  return (
    <div className="add-plant-layout">
      {/* Header del Asistente (Oscuro) */}
      <header className="add-plant-header">
        <Link to="/" className="add-plant-logo">
          <i className="fa-solid fa-leaf"></i>
          NaturaFy
        </Link>
        {/* Botón de ayuda (?) */}
        <Link to="/help" className="add-plant-help" aria-label="Ayuda">
          ?
        </Link>
      </header>

      {/* Contenido principal (aquí se renderizarán los pasos) */}
      <main className="add-plant-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AddPlantLayout;