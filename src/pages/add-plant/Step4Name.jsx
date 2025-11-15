import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddPlant.css';

// 1. Definimos la URL de tu API
const ADD_PLANT_URL = 'http://localhost:8081/api/v1/plants';

function Step4Name() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Convertimos la función a 'async'
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 3. Obtenemos TODOS los datos del formulario
    const name = e.target.name.value;
    const species = e.target.species.value;
    const description = e.target.description.value;
    const imageUrl = e.target.imageUrl.value;

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No estás autenticado. Por favor, inicia sesión.');
      }

      // 4. Preparamos el cuerpo (body) completo
      const plantData = {
        name: name,
        species: species,
        description: description,
        imageUrl: imageUrl
      };

      // 5. Hacemos la llamada 'fetch' (POST)
      const response = await fetch(ADD_PLANT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // ¡Autenticación!
        },
        body: JSON.stringify(plantData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar la planta');
      }

      // 6. Si todo sale bien, navegamos al Home
      navigate('/');

    } catch (err) {
      setError(err.message);
      console.error('Error al añadir planta:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-plant-content">
      <h2>Paso 4: Detalles de la Maceta</h2>
      <p>Completa los detalles de tu nueva maceta inteligente.</p>
      
      <form onSubmit={handleSubmit}>
        
        {/* Campo 1: Nombre */}
        <div className="form-group-wizard">
          <label htmlFor="plant-name">Nombre de la planta</label>
          <input 
            type="text" id="plant-name" name="name" 
            className="form-input-wizard" required disabled={loading} 
            placeholder="Ej: Mi Ficus" 
          />
        </div>

        {/* Campo 2: Especie (NUEVO) */}
        <div className="form-group-wizard">
          <label htmlFor="plant-species">Especie</label>
          <input 
            type="text" id="plant-species" name="species" 
            className="form-input-wizard" required disabled={loading} 
            placeholder="Ej: Ficus benjamina"
          />
        </div>
        
        {/* Campo 3: Descripción (Antes 'location') */}
        <div className="form-group-wizard">
          <label htmlFor="plant-description">Descripción (Ubicación)</label>
          <input 
            type="text" id="plant-description" name="description" 
            className="form-input-wizard" required disabled={loading}
            placeholder="Ej: Sala principal, al lado de la ventana"
          />
        </div>

        {/* Campo 4: URL de Imagen (NUEVO) */}
        <div className="form-group-wizard">
          <label htmlFor="plant-imageUrl">URL de la Imagen</label>
          <input 
            type="text" id="plant-imageUrl" name="imageUrl" 
            className="form-input-wizard" required disabled={loading}
            placeholder="https://ejemplo.com/mi-planta.jpg"
          />
        </div>

        {error && (
          <p className="auth-error-message">{error}</p>
        )}

        <button type="submit" className="add-plant-btn" disabled={loading}>
          {loading ? 'Guardando...' : 'Finalizar'}
        </button>
      </form>
    </div>
  );
}

export default Step4Name;