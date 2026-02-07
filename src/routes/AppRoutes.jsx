// // src/routes/AppRoutes.jsx
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import PanelEncuestador from '../pages/PanelEncuestador';
// import PanelAnalista from '../pages/PanelAnalista';
// import PanelAdministrador from '../pages/PanelAdministrador';

// export default function AppRoutes() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100">
//         {/* Barra de navegación */}
//         <nav className="bg-blue-600 text-white p-4 flex gap-4">
//           <Link to="/encuestador" className="hover:underline">Encuestador</Link>
//           <Link to="/analista" className="hover:underline">Analista</Link>
//           <Link to="/administrador" className="hover:underline">Administrador</Link>
//         </nav>

//         {/* Definición de rutas */}
//         <Routes>
//           <Route path="/encuestador" element={<PanelEncuestador />} />
//           <Route path="/analista" element={<PanelAnalista />} />
//           <Route path="/administrador" element={<PanelAdministrador />} />
//           <Route path="*" element={<PanelEncuestador />} /> {/* Ruta por defecto */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }


// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import PanelEncuestador from '../pages/PanelEncuestador';
import PanelAnalista from '../pages/PanelAnalista';
import PanelAdministrador from '../pages/PanelAdministrador';
import PublicEncuestaPage from '../pages/PublicEncuestaPage';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<PanelEncuestador />} />
          <Route path="encuestador" element={<PanelEncuestador />} />
          <Route path="analista" element={<PanelAnalista />} />
          <Route path="administrador" element={<PanelAdministrador />} />
        </Route>
        {/* Ruta pública fuera del layout del dashboard */}
        <Route path="/ver/:id" element={<PublicEncuestaPage />} />
      </Routes>
    </Router>
  );
}
