import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePassword ,signOut} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';

const ChangePassword = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const changePassword = async () => {
    if (
      formData.confirmPassword == null ||
      formData.password == null ||
      formData.newPassword == null
    ) {
      setSuccessMessage({
        message: "Password feilds can not be left Empty! ",
      });
      return;
    }
    if (formData.confirmPassword !== formData.newPassword) {
      setSuccessMessage({
        message: "New Passwords do not match,Confirm your New Password. ",
      });
      return;
    }
    if (
      formData.confirmPassword.length < 8 ||
      formData.newPassword.length < 8
    ) {
      setSuccessMessage({
        message: "New Passwords Length can't be less than 8",
      });
      return;
    }
    setLoading(true);
    const sendObj = {
      password: formData.password,
      newPassword: formData.newPassword,
      email: currentUser.user.email,
    };
    const res = await fetch(process.env.REACT_APP_API_URL+"users/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify(sendObj),
    });
    const data = await res.json();
    if(data.expired===true)
        {toast(data.message)
        dispatch(signOut)
        }
    if (data.success) {
      toast("Password Changed")
      dispatch(updatePassword(sendObj.newPassword));
      setLoading(false);
      setSuccessMessage({ message: data.message, success: true });
      navigate('/profile')
    } else {
      setLoading(false);
      setSuccessMessage({ message: data.message, success: false });
    }
  };
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold my-7 text-center text-3xl">
          Change Password
        </h1>

        <input
          className="p-3 bg-slate-200 rounded-lg "
          onChange={handleChange}
          type="password"
          id="password"
          placeholder="Password"
        />

        <input
          className="p-3 bg-slate-200 rounded-lg "
          onChange={handleChange}
          type="password"
          id="newPassword"
          placeholder="New Password"
        />

        <input
          className="p-3 bg-slate-200 rounded-lg "
          onChange={handleChange}
          type="password"
          id="confirmPassword"
          placeholder="Confirm New Password"
        />
        {successMessage.success ? (
          <p className="text-green-700 ">{successMessage.message}</p>
        ) : (
          <p className="text-red-700 ">{successMessage.message}</p>
        )}

        <button
          className="bg-slate-700 text-white 
        p-3 rounded-lg hover:opacity-80 mt-2 mx-auto w-3/6 "
          disabled={loading}
          onClick={changePassword}
        >
          {loading ? "Loading..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
