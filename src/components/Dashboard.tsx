import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { session, signOut } = UserAuth();

  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {session?.user?.user_metadata.full_name}</h2>
      <div>
        <button
          className="border px-2 py-1.5 rounded hover:bg-slate-800 cursor-pointer"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
