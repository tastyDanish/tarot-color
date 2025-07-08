// pages/ResetPassword.tsx
import { supabase } from "@/db/client";
import { useState } from "react";

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (!error) {
      setSubmitted(true);
    } else {
      alert(error.message);
    }
  };

  return submitted ? (
    <p>Password successfully updated!</p>
  ) : (
    <div className="max-w-sm mx-auto p-4 text-amber-100 mt-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  gap-3">
        <input
          type="password"
          className="border rounded p-2"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          className="bg-amber-950 text-orange-100 font-bold py-2 rounded hover:bg-gray-800 transition"
          type="submit">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
