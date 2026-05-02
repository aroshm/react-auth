import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { session, signInUser } = UserAuth();
  const navigate = useNavigate();
  console.log(session);
  console.log(email, password);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInUser(email, password);
      if (result.success) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-10">
      <form className="w-md" onSubmit={handleSignIn}>
        <h2>Sign In</h2>
        <p>
          Don't have account? <Link to="/signup">Sign Up</Link>
        </p>
        <div className="flex flex-col gap-5 pt-7">
          <input
            type="email"
            name=""
            id=""
            className="border rounded p-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name=""
            id=""
            className="border rounded p-2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="border border-slate-600 rounded p-2 bg-slate-950 hover:bg-slate-900 transition cursor-pointer font-semibold"
            type="submit"
            disabled={loading}
          >
            Sign In
          </button>
          {error && <p className="text-red-600 pt-4">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
