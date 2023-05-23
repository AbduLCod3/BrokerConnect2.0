import { Link } from "react-router-dom";
export default function LoginPage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        {" "}
        <h1 className=" font-bold text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="abdul@email.com" />
          <input type="password" placeholder="password" />
          <button className="primary font-bold">Login</button>

          <div className="text-center py-2 gap-2 flex flex-col "> OR
            <Link className="border rounded py-1 mx-1 bg-primary text-white font-bold " to={"/register"}>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
