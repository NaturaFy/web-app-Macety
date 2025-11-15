import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Importaciones de Páginas
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile'; 
import EditProfile from './pages/EditProfile'; // <-- 1. Importa la nueva página
import Notifications from './pages/Notifications';
import Community from './pages/Community';
import Help from './pages/Help';
import Store from './pages/Store';

// Importaciones del Asistente (Add Plant)
import AddPlantLayout from './pages/add-plant/AddPlantLayout';
import Step1Prepare from './pages/add-plant/Step1Prepare';
import Step2Wifi from './pages/add-plant/Step2Wifi';
import Step3Calibrate from './pages/add-plant/Step3Calibrate';
import Step4Name from './pages/add-plant/Step4Name';

import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        {/* --- Rutas Públicas --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* --- Rutas Protegidas --- */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/editar-perfil" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} /> {/* <-- Y esta otra */}
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/comunidad" element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
        <Route path="/store" element={<ProtectedRoute><Store /></ProtectedRoute>} />
        
        <Route path="add-plant" element={<ProtectedRoute><AddPlantLayout /></ProtectedRoute>}>
          <Route index element={<Step1Prepare />} />
          <Route path="step-2" element={<Step2Wifi />} />
          <Route path="step-3" element={<Step3Calibrate />} />
          <Route path="step-4" element={<Step4Name />} />
        </Route>
        
      </Routes>
    </Layout>
  );
}

export default App;