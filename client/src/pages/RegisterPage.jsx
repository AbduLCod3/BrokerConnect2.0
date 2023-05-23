import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function registerUser(e) {
    e.preventDefault();
    // send request to API
    axios.get("/test");
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        {" "}
        <h1 className=" font-bold text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Middle Name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />{" "}
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />{" "}
          <input
            type="phonenumber"
            placeholder="Phone No"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
