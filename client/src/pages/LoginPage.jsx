import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../components/UserContext";

//
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("/login", { email, password });
      alert("Success, Now You're Logged In");
      setUser(response.data);
      setRedirect(true);
    } catch (err) {
      alert("Login Failed! Try Again");
    }
  }

  if (redirect) return <Navigate to={"/"} />;

  //onSumbit //onSubmit

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        {" "}
        <h1 className=" font-bold text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="abdul@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary font-bold">Login</button>

          <div className="text-center py-2 gap-2 flex flex-col ">
            {" "}
            OR
            <Link
              to={"/register"}
              className="border rounded py-1 mx-1 bg-primary text-white font-bold "
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
