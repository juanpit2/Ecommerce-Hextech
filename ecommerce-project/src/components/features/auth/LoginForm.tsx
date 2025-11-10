import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: { email: string; password: string }) => 
      u.email === email && u.password === password
    );

    if (user) {
      if (staySignedIn) {
        localStorage.setItem("currentUser", JSON.stringify({ 
          email: user.email,
          username: user.username 
        }));
      } else {
        sessionStorage.setItem("currentUser", JSON.stringify({ 
          email: user.email,
          username: user.username 
        }));
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-2">HEXTECH</h1>
        <h2 className="text-xl text-center text-gray-600 mb-8">Sign in</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="w-full bg-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full bg-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Password"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="staySignedIn"
              checked={staySignedIn}
              onChange={(e) => setStaySignedIn(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="staySignedIn" className="ml-2 text-sm text-gray-600">
              Stay signed in
            </label>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </p>
          )}
          
          <NavLink to="/home">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
          </NavLink>

          <div className="flex items-center justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate("/register")}
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