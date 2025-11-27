import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabaseClient";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      navigate("/login", { replace: true }); 
    };

    logout();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1226] text-white">
      <p>Signing out...</p>
    </div>
  );
};

export default Logout;