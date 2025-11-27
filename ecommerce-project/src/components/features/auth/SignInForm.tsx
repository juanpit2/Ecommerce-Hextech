import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabaseClient";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username, 
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      const user = data.user;
      if (!user) {
        setError("Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      alert("Account created! Please check your email to verify your account.");
      navigate("/Login"); 
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-2">HEXTECH</h1>
        <h2 className="text-xl text-center text-gray-600 mb-8">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Username"
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Password"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Confirm Password"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/Login")}
              className="text-blue-500 hover:underline font-medium"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
