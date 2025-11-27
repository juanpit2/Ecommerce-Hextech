import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { useAuth } from "../../../context/AuthContext";

type Profile = {
  email: string;
  username: string;
};

const ProfileScreen = () => {
  const { user, loading: authLoading } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      setProfileLoading(true);
      setProfileError("");
      setProfileSuccess("");

      const { data, error } = await supabase
        .from("profiles")
        .select("email, username")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error(error);
        setProfileError("Failed to load profile.");
      } else {
        setProfile({
          email: data.email,
          username: data.username,
        });
      }

      setProfileLoading(false);
    };

    if (!authLoading && user) {
      fetchProfile();
    }
  }, [authLoading, user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;
    const { name, value } = e.target;
    setProfile(prev => (prev ? { ...prev, [name]: value } : prev));
    setProfileError("");
    setProfileSuccess("");
  };

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !profile) return;

    setProfileError("");
    setProfileSuccess("");
    setProfileLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        username: profile.username,
      })
      .eq("id", user.id);

    if (error) {
      console.error(error);
      setProfileError("Failed to update profile.");
    } else {
      setProfileSuccess("Profile updated successfully.");
    }

    setProfileLoading(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error(error);
      setPasswordError(error.message || "Failed to update password.");
    } else {
      setPasswordSuccess("Password updated successfully.");
      setNewPassword("");
      setConfirmNewPassword("");
    }

    setPasswordLoading(false);
  };

  if (authLoading || profileLoading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-xl space-y-10">
        <h1 className="text-3xl font-bold text-center mb-2">Profile</h1>
        <p className="text-center text-gray-600 mb-4">
          View and edit your profile information.
        </p>

        {/* Perfil */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Account info</h2>

          {profileError && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
              {profileError}
            </p>
          )}

          {profileSuccess && (
            <p className="text-green-600 text-sm bg-green-50 p-2 rounded">
              {profileSuccess}
            </p>
          )}

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email (read-only)
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                readOnly
                className="w-full bg-gray-100 cursor-not-allowed rounded-xl p-3 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleProfileChange}
                className="w-full bg-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Username"
                required
              />
            </div>

            <button
              type="submit"
              disabled={profileLoading}
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors disabled:opacity-60"
            >
              {profileLoading ? "Saving..." : "Save changes"}
            </button>
          </form>
        </section>

        <hr className="border-gray-200" />

        {/* Cambiar contraseÃ±a */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Change password
          </h2>

          {passwordError && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
              {passwordError}
            </p>
          )}

          {passwordSuccess && (
            <p className="text-green-600 text-sm bg-green-50 p-2 rounded">
              {passwordSuccess}
            </p>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                New password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordError("");
                  setPasswordSuccess("");
                }}
                className="w-full bg-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="New password"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Confirm new password
              </label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                  setPasswordError("");
                  setPasswordSuccess("");
                }}
                className="w-full bg-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Confirm new password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 transition-colors disabled:opacity-60"
            >
              {passwordLoading ? "Updating password..." : "Update password"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ProfileScreen;
