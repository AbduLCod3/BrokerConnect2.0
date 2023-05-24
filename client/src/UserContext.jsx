import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [sendRequest, setSendRequest] = useState()
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        setSendRequest(true)
      });
    }
  }, []);
  return (
    <div>
      <UserContext.Provider value={{ user, setUser, sendRequest }}>
        {children};
      </UserContext.Provider>
      ;
    </div>
  );
}
