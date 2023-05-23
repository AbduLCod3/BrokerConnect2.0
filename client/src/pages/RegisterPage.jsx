import { Link } from "react-router-dom";
export default function RegisterPage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        {" "}
        <h1 className=" font-bold text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Middle Name" />{" "}
          <input type="text" placeholder="Last Name" />{" "}
          <input type="phonenumber" placeholder="Phone No" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="primary font-bold">Register</button>
          <div className="text-center py-2 gap-2 flex flex-col ">
            {" "}
            OR
            <Link
              className="border rounded py-1 mx-1 bg-primary text-white font-bold "
              to={"/Login"}
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
