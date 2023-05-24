import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AccountPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (!ready) {
    return "Processing Login ...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  console.log(subpage);

  function linkClassess(type = null) {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded";
    }
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-4 mb-8">
        {/* // favorites ==== bookings // accomodations === listings */}
        <Link className={linkClassess("profile")} to={"/account"}>
          My Profile
        </Link>

        <Link className={linkClassess("listings")} to={"/account/listings"}>
          My Listings
        </Link>
      </nav>

      {subpage === "profile" && (
        <div className=" text-center max-w-sm mx-auto">
          <div className="border rounded border-gray-300 flex py-1 justify-around ">
            {user.firstName} | {user.middleName} | {user.lastName}
          </div>
          <div className="border rounded border-gray-300 flex py-1 justify-around mt-2">
            {user.email} | {user.phoneNumber}
          </div>
          <button
            onClick={logout}
            className="bg-primary text-white font-bold py-2 px-6 rounded mt-2"
          >
            Signout
          </button>
        </div>
      )}
      {subpage === "listings"}
    </div>
  );
}
