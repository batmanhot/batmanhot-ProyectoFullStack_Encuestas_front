// src/layout/DashboardLayout.jsx
import { Link, Outlet, useLocation } from "react-router-dom";
import DarkModeToggle from "../components/ui/DarkModeToggle";

export default function DashboardLayout() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5', transition: 'background-color 0.2s' }} className="dark:bg-darkBg">
      {/* Sidebar */}
      <aside style={{
        width: '16rem',
        backgroundColor: '#D32F2F',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        transition: 'background-color 0.2s'
      }} className="dark:bg-darkCard">
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            fontFamily: 'Montserrat',
            marginBottom: '0.5rem'
          }}>
            Encuestas 2026
          </h2>
          <p style={{
            fontSize: '0.875rem',
            opacity: 0.9,
            marginTop: '0.25rem'
          }}>
            Plataforma de Análisis
          </p>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {[
            { to: "/encuestador", label: "👤 Encuestador" },
            { to: "/analista", label: "📊 Analista" },
            { to: "/administrador", label: "⚙️ Administrador" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                transition: 'all 0.2s',
                fontWeight: 500,
                backgroundColor: isActive(item.to) ? '#1565C0' : 'rgba(21, 101, 192, 0.1)',
                color: '#FFFFFF',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => !isActive(item.to) && (e.target.style.backgroundColor = 'rgba(21, 101, 192, 0.2)')}
              onMouseOut={(e) => !isActive(item.to) && (e.target.style.backgroundColor = 'rgba(21, 101, 192, 0.1)')}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div style={{
          borderTop: '1px solid rgba(21, 101, 192, 0.3)',
          paddingTop: '1rem',
          marginTop: '1rem'
        }}>
          <DarkModeToggle />
        </div>
      </aside>

      {/* Contenido principal */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        <div style={{
          padding: '2rem',
          backgroundColor: '#FFFFFF',
          color: '#111827',
          minHeight: '100vh',
          transition: 'background-color 0.2s'
        }} className="dark:bg-darkBg dark:text-darkText">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
