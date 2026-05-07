import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

type AuthMode = "signin" | "signup";

type AuthFormProps = {
  mode: AuthMode;
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUpNewUser, signInUser } = UserAuth();
  const navigate = useNavigate();
  const isSignIn = mode === "signin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = isSignIn
        ? await signInUser(email, password)
        : await signUpNewUser(name, email, password);

      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(String(result.error));
      }
    } catch {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-10">
      <form className="w-md" onSubmit={handleSubmit}>
        <h2>{isSignIn ? "Sign In" : "Sign Up Today!"}</h2>
        <p>
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <Link to={isSignIn ? "/signup" : "/signin"}>
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
        <div className="flex flex-col gap-5 pt-7">
          {!isSignIn && (
            <input
              type="text"
              name="name"
              id="name"
              className="border rounded p-2"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            name="email"
            id="email"
            className="border rounded p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            className="border rounded p-2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="border border-slate-600 rounded p-2 bg-slate-950 hover:bg-slate-900 transition cursor-pointer font-semibold"
            type="submit"
            disabled={loading}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          {error && <p className="text-red-600 pt-4">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
