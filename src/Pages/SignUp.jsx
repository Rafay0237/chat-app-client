import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import { Start, Failure, signUpSuccess } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import { submitData } from "../APICALLS";

const SignUp = () => {
  const { error, loading } = useSelector((state) => state.user);
  const [formData, setformData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const SubmitData = async (e) => {
    e.preventDefault();
    dispatch(Start());
    try {
      const data = await submitData("users/sign-up", "POST", formData);
  
      if (data.success === true) {
        toast("Account Created!");
        dispatch(signUpSuccess());
        navigate("/login");
      } else {
        dispatch(Failure(data));
      }
    } catch (err) {
      dispatch(Failure(err));
    }
  };
  
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 mt-40 sm:mt-20">
        Sign Up</h1>
      <form onSubmit={SubmitData} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="User name"
          onChange={handleChange}
          id="userName"
          className="p-3 bg-slate-200 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          onChange={handleChange}
          id="email"
          className="p-3 bg-slate-200 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          id="password"
          className="p-3 bg-slate-200 rounded-lg"
        />
        <button
          className="bg-slate-700 text-white 
        p-3 rounded-lg hover:opacity-80 mt-2 mx-auto w-3/6
        "
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-4 mt-5">
        <p>Already have an account?</p>
        <Link to="/login">
          <span className="text-blue-500 font-semibold">Login</span>
        </Link>
      </div>
      <p className="text-red-700 mt-2">
        {error? error.message ||  "Something went wrong!":''}
      </p>
    </div>
  );
};

export default SignUp;
