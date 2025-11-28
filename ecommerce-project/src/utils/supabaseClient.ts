// Cliente de Supabase - Configuracion centralizada
// Este archivo crea y exporta una instancia unica del cliente de Supabase
// que se usa en toda la aplicacion para acceder a la base de datos

import { createClient } from "@supabase/supabase-js";

// Leer variables de entorno configuradas en archivo .env
// VITE_ es el prefijo requerido para exponer variables al frontend
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Validacion: verificar que las variables de entorno esten configuradas
if (!supabaseUrl) {
  throw new Error("VITE_SUPABASE_URL is not set");
}

if (!supabaseAnonKey) {
  throw new Error("VITE_SUPABASE_ANON_KEY is not set");
}

// Crear y exportar instancia del cliente de Supabase
// Esta instancia se reutiliza en todos los servicios
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
