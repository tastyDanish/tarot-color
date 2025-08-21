import { supabase } from "@/db/client";
import { useReadingStore } from "@/stores/use-reading-store";
import { useUserStore } from "@/stores/user-user-store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Mode = "login" | "signup";

const AuthForm = () => {
  const { loadReading } = useReadingStore();
  const { loadUser } = useUserStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error } =
        mode === "login"
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({ email, password });

      if (error) throw error;

      const userId = await loadUser();
      if (userId) {
        await loadReading(userId);
      }

      setMessage(
        mode === "login"
          ? "Logged in successfully!"
          : "Check your email to confirm your sign-up."
      );
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setError(null);
    setMessage(null);

    if (!email) {
      setError("Please enter your email first.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://fortunespalette.com/forgot-password",
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset link sent! Check your email.");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 text-amber-100 mt-4  z-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-amber-950 text-orange-100 font-bold py-2 rounded hover:bg-gray-800 transition">
          {loading
            ? mode === "login"
              ? "Signing in..."
              : "Signing up..."
            : mode === "login"
            ? "SIGN IN"
            : "SIGN UP"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
      {message && <p className="text-green-600 mt-2 text-sm">{message}</p>}

      <div className="text-sm text-center mt-4">
        Forgot your password?{" "}
        <button
          type="button"
          className="underline"
          onClick={handlePasswordReset}>
          Reset it here
        </button>
      </div>

      <div className="text-sm text-center mt-4">
        {mode === "login" ? (
          <>
            Don't have an account?{" "}
            <button
              type="button"
              className="underline"
              onClick={() => setMode("signup")}>
              Sign up
            </button>
            <p className="text-xs text-amber-100/80 mt-1">
              Save your divination history and track your tarot journey.
            </p>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              className="underline"
              onClick={() => setMode("login")}>
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
