import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../radio-group";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";

const Login = () => {

  const [input, setInput] = useState({   
    email:"",
    password:"",
    role:"",
  })

  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const submitHandler = async (e) => {
    e.preventDefault()
      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`,input, {
          headers:{
            'Content-Type':'application/json'
          },
          withCredentials:true
        })
        if (res.data.success) {
          navigate("/")
          toast.success('User login successfully')
        }
      } catch (error) {
        console.log(error)
      }

  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-full md:max-w-7xl mx-auto ">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 border border-slate-100 rounded-md p-4 my-10 shadow-sm"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2 p-3 flex flex-col gap-y-3">
            
            <Label>Email</Label>
            <Input type="email" placeholder="Your email@"  value={input.email} name="email" onChange={changeEventHandler}/>

            <Label>Password</Label>
            <Input type="password" placeholder="Password" value={input.password} name="password" onChange={changeEventHandler} />
          </div>

          <div className="flex pl-3 mt-4">
            <RadioGroup defaultValue="comfortable" className='flex gap-5'>

              <div className="flex items-center gap-3">
                <Input 
                type="radio"
                name="role"
                value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler}
                className="cursor-pointer"/>
                <Label htmlFor="r1">JobSeeker</Label>
              </div>

              <div className="flex items-center gap-3">
                <Input 
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                className="cursor-pointer"/>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <button type="submit" className="w-full text-white rounded-md mt-4 p-1 bg-slate-600 ">Sign Up</button>
          <span className="text-slate-500 relative top-1">Don't have an account<Link to='/signup' className="pl-2 text-purple-700 font-bold">SignUp</Link></span>
        </form>
      </div>
    </div>
  );
}

export default Login