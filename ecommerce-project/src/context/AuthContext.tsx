// Contexto de Autenticacion - Patron Context API de React
// Provee informacion del usuario autenticado a toda la aplicacion
// Integrado con Supabase Auth para manejar sesiones

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";
import { supabase } from "../utils/supabaseClient";
import type { User } from "@supabase/supabase-js";

// Tipo del contexto: que informacion se comparte
type AuthContextType = {
  user: User | null;  // Usuario autenticado (null si no hay sesion)
  loading: boolean;   // true mientras se verifica la autenticacion
};

// Crear contexto con valores por defecto
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// Provider: componente que envuelve la app y provee el contexto
// Maneja el estado de autenticacion y lo comparte con children
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);  // Estado del usuario
  const [loading, setLoading] = useState(true);         // Estado de carga

  // Effect que se ejecuta al montar el componente
  // 1. Obtiene usuario actual de Supabase
  // 2. Escucha cambios de autenticacion (login/logout)
  useEffect(() => {
    // Funcion para obtener usuario actual
    const getCurrentUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) {
        setUser(data.user ?? null);  // Actualizar estado con usuario
      }
      setLoading(false);  // Terminar carga inicial
    };

    getCurrentUser();  // Ejecutar al montar

    // Suscribirse a cambios de autenticacion
    // Se ejecuta cuando el usuario hace login/logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);  // Actualizar usuario segun sesion
      setLoading(false);
    });

    // Cleanup: cancelar suscripcion al desmontar
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Proveer el contexto a todos los children
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
// Uso en componentes: const { user, loading } = useAuth()
export const useAuth = () => useContext(AuthContext);