import React from 'react';
import './ProductCard.css';
import { useCart } from '../context/CartContext'; // <-- ¡ESTA ES LA LÍNEA QUE FALTABA!

// --- ¡TODAS LAS IMÁGENES DE TUS PRODUCTOS! ---
// (Asegúrate de haber guardado todas estas en src/assets/)
import macetyPro from '../assets/macety_pro.jfif';
import macetyMini from '../assets/macety_mini.jpg';
import macetyAir from '../assets/macety_air.jpg';
import sensorHumedad from '../assets/sensor_humedad.jpg';
import luzCrecimiento from '../assets/luz_crecimiento.jfif';
import soporteAjustable from '../assets/soporte_ajustable.jfif';
import sustratoUniversal from '../assets/sustrato_universal.jfif';
import sustratoSuculentas from '../assets/sustrato_suculentas.jpg';
import sustratoOrquideas from '../assets/sustrato_orquideas.jfif';
import asesoria from '../assets/asesoria.jfif';
import planesCuidado from '../assets/planes_cuidado.png';
import talleresJardineria from '../assets/talleres_jardineria.jfif';

// Mapeo completo de imágenes
const productImages = {
  'MaceTy Pro': macetyPro,
  'MaceTy Mini': macetyMini,
  'MaceTy Air': macetyAir,
  'Sensor de Humedad': sensorHumedad,
  'Luz de Crecimiento LED': luzCrecimiento,
  'Soporte Ajustable': soporteAjustable,
  'Sustrato Universal': sustratoUniversal,
  'Sustrato para Suculentas': sustratoSuculentas,
  'Sustrato para Orquídeas': sustratoOrquideas,
  'Asesoría Personalizada': asesoria,
  'Planes de Cuidado Mensual': planesCuidado,
  'Talleres de Jardinería': talleresJardineria,
};

function ProductCard({ product }) {
  const { addToCart } = useCart(); // <-- Trae la función 'addToCart'

  const imageSrc = productImages[product.title] || 'https://via.placeholder.com/300';

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={imageSrc} alt={product.title} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        
        {/* --- ¡AQUÍ ESTÁ EL BOTÓN QUE FALTABA! --- */}
        <button 
          className="add-to-cart-btn" 
          onClick={() => addToCart(product)} 
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;