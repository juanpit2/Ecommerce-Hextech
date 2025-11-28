// Componente de Inicio de Sesion
// Formulario para autenticar usuarios con Supabase Auth
// Incluye opcion de recordar sesion

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabaseClient";

const Login = () => {
  // Estado del formulario
  const [email, setEmail] = useState("");                    // Email del usuario
  const [password, setPassword] = useState("");              // Contrasena
  const [staySignedIn, setStaySignedIn] = useState(false);   // Recordar sesion
  const [error, setError] = useState("");                    // Mensaje de error
  const [loading, setLoading] = useState(false);             // Estado de carga

  const navigate = useNavigate();

  // Manejar envio del formulario de login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // Prevenir recarga de pagina
    setError("");       // Limpiar errores previos
    setLoading(true);   // Activar estado de carga

    try {
      // Intentar autenticar con Supabase Auth
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      // Si hay error de autenticacion, mostrar mensaje
      if (signInError) {
        setError(signInError.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      // Verificar que se obtuvo el usuario
      const user = data.user;
      if (!user) {
        setError("Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // Si el usuario quiere mantener sesion, actualizar preferencia en BD
      if (staySignedIn) {
        await supabase
          .from("profiles")
          .update({ stay_signed_in: true })
          .eq("id", user.id);
      }

      // Login exitoso: redirigir a home
      navigate("/home");
    } catch (err) {
      // Manejo de excepciones generales
      setError("Login failed. Please try again.");
    } finally {
      // Siempre desactivar loading al terminar
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        {/* Titulo de la aplicacion */}
        <h1 className="text-4xl font-bold text-center mb-2">HEXTECH</h1>
        <h2 className="text-xl text-center text-gray-600 mb-8">Sign in</h2>

        {/* Formulario de login */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de email */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");  // Limpiar error al escribir
              }}
              className="w-full bg-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Email"
              required
            />
          </div>

          {/* Campo de contrasena */}
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");  // Limpiar error al escribir
              }}
              className="w-full bg-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Password"
              required
            />
          </div>

          {/* Checkbox para recordar sesion */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="staySignedIn"
              checked={staySignedIn}
              onChange={(e) => setStaySignedIn(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="staySignedIn"
              className="ml-2 text-sm text-gray-600"
            >
              Stay signed in
            </label>
          </div>

          {/* Mensaje de error si existe */}
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          {/* Boton de submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Next"}
          </button>

          {/* Link para crear cuenta */}
          <div className="flex items-center justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate("/SignIn")}
              className="text-sm text-gray-600 hover:underline"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;