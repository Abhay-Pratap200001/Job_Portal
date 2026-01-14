// Shared navigation bar component
import Navbar from "../shared/Navbar";

// UI components
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// React Router utilities
import { Link, useNavigate } from "react-router-dom";

// React hooks
import { useState } from "react";

// Axios for API requests
import axios from "axios";

// Toast notification
import { toast } from "sonner";

// API endpoint constant
import { USER_API_END_POINT } from "@/utils/constant";

// Redux hooks
import { useDispatch, useSelector } from "react-redux";

// Redux action
import { setLoading } from "@/redux/authSlice";

// Loader icon
import { Loader2 } from "lucide-react";

const Signup = () => {

  // Local state to manage form inputs
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  // Access loading state from Redux store
  const { loading } = useSelector(store => store.auth);

  // Redux dispatcher
  const dispatch = useDispatch();

  // Navigation handler
  const navigate = useNavigate();

  // Handles text, email, password, radio input changes
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handles file input change
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  // Handles form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Create FormData for multipart/form-data request
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    // Append profile image only if user selected a file
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      // Set loading state true before API call
      dispatch(setLoading(true));

      // Send signup request to backend
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true // allow cookies if backend sets any
        }
      );

      // If signup is successful
      if (res.data.success) {
        navigate("/login");
        toast.success("User sign-up successfully");
      }

    } catch (error) {
      console.log(error);
      // toast.error(error.response?.data?.message)
    } finally {
      // Stop loading after request completes
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      {/* Top navigation bar */}
      <Navbar />

      {/* Signup form container */}
      <div className="flex items-center justify-center max-w-full md:max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 border border-slate-100 rounded-md p-4 my-10 shadow-sm"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          {/* Input fields */}
          <div className="my-2 p-3 flex flex-col gap-y-3">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Full Name"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
            />

            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Your email@"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />

            <Label>Phone Number</Label>
            <Input
              type="tel"
              placeholder="Phone Number"
              value={input.phoneNumber}
              name="phoneNumber"
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

          {/* Role selection and profile upload */}
          <div className="flex pl-3 mt-4 gap-3">

            {/* Job Seeker radio button */}
            <div className="flex items-center gap-1">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label>JobSeeker</Label>
            </div>

            {/* Recruiter radio button */}
            <div className="flex items-center gap-1">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label>Recruiter</Label>
            </div>

            {/* Profile image upload */}
            <div className="flex items-center gap-2 pl-3">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* Submit button with loading state */}
          {
            loading ? (
              <Button className="w-full mt-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <button
                type="submit"
                className="w-full text-white rounded-md mt-4 p-1 bg-slate-600"
              >
                Sign-In
              </button>
            )
          }

          {/* Redirect to login */}
          <span className="text-slate-500 relative top-1">
            Already have an account
            <Link to="/login" className="pl-2 text-purple-700 font-bold">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
