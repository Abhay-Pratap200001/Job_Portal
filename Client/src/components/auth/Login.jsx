// Importing Navbar component
import Navbar from "../shared/Navbar";

// UI components
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// React router utilities
import { Link, useNavigate } from "react-router-dom";

// Toast notification
import { toast } from "sonner";

// React hooks
import { useState } from "react";

// Axios for API requests
import axios from "axios";

// API constant
import { USER_API_END_POINT } from "@/utils/constant";

// Redux hooks and actions
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

// Loader icon
import { Loader2 } from "lucide-react";

const Login = () => {

  // State to store form input values
  const [input, setInput] = useState({   
    email: "",
    password: "",
    role: "",
  });

  // Getting loading state from redux store
  const { loading } = useSelector(store => store.auth);

  // Navigation hook
  const navigate = useNavigate();

  // Dispatch hook for redux actions
  const dispatch = useDispatch();

  // Handles input change for all fields
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Start loading
      dispatch(setLoading(true));

      // API call for login
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      // If login successful
      if (res.data.success) {
        dispatch(setUser(res.data.user)); // store user in redux
        navigate("/"); // redirect to home
        toast.success('User login successfully'); // success toast
      }

    } catch (error) {
      // Log error if login fails
      console.log(error);
    } finally {
      // Stop loading
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className="flex items-center justify-center max-w-full md:max-w-7xl mx-auto ">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 border border-slate-100 rounded-md p-4 my-10 shadow-sm"
        >
          {/* Form Heading */}
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          {/* Email & Password */}
          <div className="my-2 p-3 flex flex-col gap-y-3">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Your email@"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />

            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>

          {/* Role selection */}
          <div className="flex pl-3 mt-4">
            <div className="flex items-center gap-3">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r1">JobSeeker</Label>
            </div>

            <div className="flex items-center gap-3">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </div>

          {/* Login button / Loader */}
          {
            loading
              ? (
                <Button>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </Button>
              )
              : (
                <button
                  type="submit"
                  className="w-full text-white rounded-md mt-4 p-1 bg-slate-600"
                >
                  Log-In
                </button>
              )
          }

          {/* Signup link */}
          <span className="text-slate-500 relative top-1">
            Don't have an account
            <Link to='/signup' className="pl-2 text-purple-700 font-bold">
              SignUp
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
