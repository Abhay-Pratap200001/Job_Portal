import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-full md:max-w-7xl mx-auto ">
        <form
          action=""
          className="w-full md:w-1/2 border border-slate-100 rounded-md p-4 my-10 shadow-sm"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2 p-3 flex flex-col gap-y-3">
            <Label>Full Name</Label>
            <Input type="text" placeholder="Full Name" />

            <Label>Email</Label>
            <Input type="email" placeholder="Your email@" />

            <Label>Phone Number</Label>
            <Input type="tel" placeholder="Phone Number" />

            <Label>Password</Label>
            <Input type="password" placeholder="Password" />
          </div>

          <div className="flex pl-3 mt-4">
            <RadioGroup defaultValue="comfortable" className='flex gap-5'>
              <div className="flex items-center gap-3">
                <Input 
                type="radio"
                name="role"
                value="student"
                className="cursor-pointer"/>
                <Label htmlFor="r1">JobSeeker</Label>
              </div>

              <div className="flex items-center gap-3">
                 <Input 
                type="radio"
                name="role"
                value="recruiter"
                className="cursor-pointer"/>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-6">
                <Label>Profile</Label>
                <Input 
                accept="image/*"
                type="file"
                className="cursor-pointer"/>
            </div>
          </div>
          <button type="submit" className="w-full text-white rounded-md mt-2 p-1 bg-slate-600 ">Sign Up</button>
          <span className="text-slate-500">Already have an account<Link to='login' className="pl-2 text-purple-700 font-bold">Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
