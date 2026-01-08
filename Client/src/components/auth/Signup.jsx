import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
// import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner"
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const Signup = () => {
  
  const [input, setInput] = useState({
    fullname:"",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
  })

  const { loading } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const changeFileHandler = (e) =>{
    setInput({...input, file:e.target.files?.[0]})
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("password", input.password)
    formData.append("role", input.role)
    if (input.file) {
      formData.append("file", input.file)
    }
      try {
        dispatch(setLoading(true))
        const res = await axios.post(`${USER_API_END_POINT}/register`,formData, {
          headers:{
            'Content-Type':'multipart/form-data'
          },
          withCredentials:true
        })
        if (res.data.success) {
          navigate("/login")
           toast.success("User sign-up successfully")
         }
      } catch (error) {
        console.log(error)
        // toast.error(error.respons)
      }finally{
        dispatch(setLoading(false))
      }
  }


  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-full md:max-w-7xl mx-auto ">
        <form onSubmit={submitHandler}
          className="w-full md:w-1/2 border border-slate-100 rounded-md p-4 my-10 shadow-sm"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2 p-3 flex flex-col gap-y-3">
            <Label>Full Name</Label>
            <Input type="text" placeholder="Full Name" value={input.fullname} name="fullname" onChange={changeEventHandler}/>

            <Label>Email</Label>
            <Input type="email" placeholder="Your email@"  value={input.email} name="email" onChange={changeEventHandler}/>

            <Label>Phone Number</Label>
            <Input type="tel" placeholder="Phone Number"  value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler}/>

            <Label>Password</Label>
            <Input type="password" placeholder="Password"  value={input.password} name="password" onChange={changeEventHandler}/>
          </div>

          <div className="flex pl-3 mt-4 gap-3">
              <div className="flex items-center gap-1">
                <Input 
                type="radio"
                name="role"
                value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler}
                className="cursor-pointer"/>
                <Label htmlFor="r1">JobSeeker</Label>
              </div>

              <div className="flex items-center gap-1">
                <Input 
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                className="cursor-pointer"/>
                <Label htmlFor="r2">Recruiter</Label>
              </div>

            <div className="flex items-center gap-2 pl-3">
                <Label>Profile</Label>
                <Input 
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"/>
            </div>
          </div>
          {
            loading ? <Button><Loader2 className="mr-2 h-4 w-4 animate-spin"/></Button>:<button type="submit" className="w-full text-white rounded-md mt-4 p-1 bg-slate-600 ">Sign-In</button>
          }  
          <span className="text-slate-500 relative top-1">Already have an account<Link to='/login' className="pl-2 text-purple-700 font-bold">Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
