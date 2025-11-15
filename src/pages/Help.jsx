import React from 'react';
import './Page.css'; // Reutilizamos estilos

function Help() {
  return (
    <div className="page-content">
      <h1>Centro de Ayuda</h1>
      <p>¿Tienes preguntas? Estamos aquí para ayudarte.</p>

      <div className="faq-list">
        <div className="faq-item">
          <h3>¿Cómo conecto mi maceta MaceTy al Wi-Fi?</h3>
          <p>
            Sigue los pasos en la sección "Añadir maceta MaceTy". Asegúrate de que tu Wi-Fi sea de 2.4GHz,
            ya que la mayoría de los dispositivos IoT no son compatibles con redes de 5GHz.
          </p>
        </div>
        <div className="faq-item">
          <h3>¿Qué significan los datos de "Humedad del suelo"?</h3>
          <p>
            Es el porcentaje de humedad volumétrica del sustrato. 0% está completamente seco y 100%
            está saturado. Cada planta tiene un rango óptimo que puedes configurar.
          </p>
        </div>
        <div className="faq-item">
          <h3>Mi planta dice "Necesita Riego" pero la tierra se siente húmeda.</h3>
          <p>
            ¡Es hora de calibrar tus sensores! Ve al asistente de "Añadir maceta" y sigue
            los pasos de calibración para reajustar los sensores a tu tipo de tierra específico.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Help;