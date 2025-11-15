import React, { useState, useEffect } from 'react';
import PlantCard from '../components/PlantCard';
import RecentActivity from '../components/RecentActivity';
import './Home.css'; 

// --- ¡URLs ACTUALIZADAS A TU BACKEND REAL! ---
const PLANTS_API_URL = 'http://localhost:8081/api/v1/plants'; 
// const ACTIVITIES_API_URL = 'http://localhost:8081/api/v1/plant_care_activities'; // (Comentado por ahora)

// --- Ya no usamos datos mock para las plantas ---
// const mockPlants = [ ... ];
const mockActivities = [
  { id: 1, text: 'Ficus fue regada con 77ml', timestamp: '3/10/2025 10:21 p.m.' },
  { id: 2, text: 'Ficus fue regada con 137ml', timestamp: '21/10/2025 08:31 a.m.' },
];
// --- FIN DE DATOS DE EJEMPLO ---


function Home() {
  // --- El estado ahora empieza VACÍO ---
  const [plants, setPlants] = useState([]); 
  const [activities, setActivities] = useState(mockActivities); // (Seguimos usando mock para actividades)
  
  const [loading, setLoading] = useState(true); // ¡Empezamos cargando!
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState(null); 

  
  useEffect(() => {
    
    // Carga el nombre del usuario
    try {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString); 
        setUserName(user.name);
      }
    } catch (e) {
      console.error("Error al leer el usuario del localStorage", e);
    }

    
    // Esta función se conectará a tu backend
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No estás autenticado. Por favor, inicia sesión.');
        }
        
        // Pedimos las plantas al "link"
        const plantsResponse = await fetch(PLANTS_API_URL, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (plantsResponse.status === 403) {
          throw new Error('Token inválido o expirado. Por favor, inicia sesión de nuevo.');
        }
        if (!plantsResponse.ok) {
           throw new Error('Error al cargar las plantas');
        }
        
        const plantsData = await plantsResponse.json();
        setPlants(plantsData); // ¡Actualizamos el estado con los datos REALES!

        // (Aquí iría la llamada a 'activities' cuando la tengas)

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // --- ¡LLAMADA A LA API ACTIVADA! ---
    fetchDashboardData(); 

  }, []); // El array vacío [] significa "ejecutar solo una vez al cargar"


  // --- Renderizado con estados de carga y error ---
  if (loading) {
    return <div className="dashboard-message">Cargando tu jardín...</div>;
  }
  if (error) {
    return <div className="dashboard-message error">{error}</div>;
  }

  // Si todo está bien, muestra tu dashboard
  return (
    <div className="home-dashboard">
      <div className="dashboard-header">
        <h1>{userName ? `El Jardín de ${userName}` : 'Tu Jardín Inteligente'}</h1>
        <p>{plants.length} plantas monitoreadas</p>
      </div>
      
      {/* --- NUEVA LÓGICA ---
      Si no hay plantas, muestra un mensaje amigable */}
      {plants.length === 0 ? (
        <div className="dashboard-message">
          <p>¡Bienvenido! Aún no has añadido ninguna planta. 🌿</p>
          <p>Ve a "Añadir planta" para comenzar.</p>
        </div>
      ) : (
        <div className="plant-grid">
          {plants.map(plant => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      )}

      {/* La actividad reciente sigue usando datos mock por ahora */}
      <div className="recent-activity-section">
        <h2 className="activity-header">Actividad Reciente</h2>
        <RecentActivity activities={activities} />
      </div>

    </div>
  );
}

export default Home;