import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./Pages/Chat";
import AddFreind from "./Pages/AddFreind";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import ChangePassword from "./Pages/ChangePassword";
import ChangeUsername from "./Pages/ChangeUsername";
import Header from "./Components/Header";
import RequestPage from "./Pages/RequestPage";
import PrivateRoute from "./Components/PrivateRoute";
import { useSelector } from "react-redux";

export default function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <div className="flex flex-col sm:flex-row">
        {currentUser && <Header />}
        <div className="w-full">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Chat />} />
              <Route path="/requests" element={<RequestPage />} />
              <Route path="/add-friend" element={<AddFreind />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/profile/change-username"
                element={<ChangeUsername />}
              />
              <Route
                path="/profile/change-password"
                element={<ChangePassword />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
