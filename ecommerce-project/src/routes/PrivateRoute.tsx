// Componente de Ruta Protegida
// Verifica que el usuario este autenticado antes de mostrar contenido
// Si no hay sesion, redirige a login
// Patron comun para proteger rutas en React Router

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  // Obtener usuario y estado de carga del contexto
  const { user, loading } = useAuth();

  // Mientras se verifica autenticacion, mostrar loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  // Si no hay usuario autenticado, redirigir a login
  // replace: no agregar a historial (evita volver atras)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Usuario autenticado: renderizar rutas hijas
  // Outlet es el placeholder para las rutas children
  return <Outlet />;
};

export default PrivateRoute;