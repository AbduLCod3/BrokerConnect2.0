import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
// pages import
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";
import ListingPage from "./pages/ListingPage";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/listings" element={<ListingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
