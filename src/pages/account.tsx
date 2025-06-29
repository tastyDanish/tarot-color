import { useUserStore } from "@/stores/user-user-store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const { email, username, loading, loadUser, updateUsername, signOut } =
    useUserStore();

  const [draftUsername, setDraftUsername] = useState(username);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    setDraftUsername(username);
  }, [username]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await updateUsername(draftUsername);
    setMessage(success ? "Saved!" : "Failed to update.");
    setSaving(false);
  };

  if (loading) return <p>Loading account...</p>;

  return (
    <div className="max-w-md mx-auto p-4 flex items-start flex-col">
      <h2 className="text-xl font-bold mb-4 self-center">Account</h2>

      <div className="mb-4 w-[300px] flex flex-col items-start">
        <label className="block text-sm text-gray-100 mb-1">Email</label>
        <div className="p-2 border rounded bg-gray-900 w-[300px]">{email}</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-[300px] flex flex-col items-start">
          <label className="block text-sm text-gray-100 mb-1">Username</label>
          <input
            className="w-full border p-2 rounded"
            value={draftUsername}
            onChange={(e) => setDraftUsername(e.target.value)}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving || draftUsername === username}
          className="bg-black text-white py-2 px-4 h-fit rounded disabled:opacity-50 self-end">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
      {message && <p className="mt-2 text-green-600 text-sm">{message}</p>}

      <button
        onClick={handleSignOut}
        className="mt-4 block text-red-600 border-red-600 border-2 px-4 py-1 rounded-md hover:underline text-sm self-center">
        Sign Out
      </button>
    </div>
  );
};

export default Account;
