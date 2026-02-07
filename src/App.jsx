// import { ToastContainer } from 'react-toastify';
// import { EncuestasProvider } from './context/EncuestasContext';
// import PanelEncuestador from './pages/PanelEncuestador';
// import PanelAnalista from './pages/PanelAnalista';
// import PanelAdministrador from './pages/PanelAdministrador';
// import AppRoutes from './routes/AppRoutes';

// function App() {
//   return (
//     <EncuestasProvider>
//       <AppRoutes />
//       <PanelEncuestador />
//       <PanelAnalista />
//       <PanelAdministrador />
//       <ToastContainer />
//     </EncuestasProvider>
//   );
// }

// export default App;

// src/App.jsx
import { ToastContainer } from 'react-toastify';
import { EncuestasProvider } from './context/EncuestasContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <EncuestasProvider>
      <AppRoutes />
      <ToastContainer />
    </EncuestasProvider>
  );
}

export default App;
