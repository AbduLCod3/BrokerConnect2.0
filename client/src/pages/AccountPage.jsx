import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

export default function AccountPage() {
  const { sendRequest, user } = useContext(UserContext);

  if (!sendRequest) {
    return "Processing Login ...";
  }

  if (sendRequest && !user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="mt-20">
      <div>
        Logged in as {user.firstName} {user.lastName}
      </div>
    </div>
  );
}
