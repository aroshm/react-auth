import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  console.log(session);

  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };
  if (session === undefined) {
    return (
      <p>
        Go to <Link to="/signin">Sign in</Link> or{" "}
        <Link to="/signup">Sign up</Link>
      </p>
    );
  }

  if (session === undefined) {
    return (
      <p>
        Go to <Link to="/signin">Sign in</Link> or{" "}
        <Link to="/signup">Sign up</Link>
      </p>
    );
  } else {
    return (
      <div>
        <h1>Dashboard</h1>
        <h2>Welcome {session?.user?.email}</h2>
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
  }
};

export default Dashboard;

// // Dashboard.tsx
// const Dashboard = ({ userIsLoggedIn, data }) => {
//   // ✅ FIX: Move hooks to the top level, outside of any logic
//   const navigate = useNavigate();
//   const someContext = useContext(MyContext);
//   const myRef = useRef(null);

//   // Logical checks and early returns come AFTER hooks
//   if (!userIsLoggedIn) {
//     return <Login />;
//   }

//   if (!data) {
//     return <Loading />;
//   }

//   return <div>{/* ... */}</div>;
// };
