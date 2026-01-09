import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 p-16">
        <div>
          <h1 className="text-2xl font-bold">
            Work<span className="text-[#f83002]">Vant</span>
          </h1>
        </div>

        <div className="flex items-center gap-7">
          <ul className="flex font-medium items-center gap-5">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/jobs'>Jobs</Link></li>
            <li><Link to='/browse'>Browse</Link></li>
          </ul>
          {!user ? (
            <div className="flex gap-3">
              <Link to='/login'><Button className="bg-slate-400 hover:bg-slate-600">Login</Button></Link>
              <Link to='/signup'><Button className="bg-slate-400 hover:bg-slate-600">SignUp</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadc.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80">
                <div className="flex gap-7 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadc.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Abhay Pratap</h4>
                    <p className="text-sm text-slate-500 font-medium">
                      Lorem ipsum dolor sit amet...
                    </p>
                  </div>
                </div>

                <div className="my-4">
                  <Button variant="link">
                    <span>
                      <User2 />
                    </span>
                    View Profile
                  </Button>
                  <br />
                  <Button variant="link">
                    {" "}
                    <span>
                      <LogOut />
                    </span>{" "}
                    LogOut
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
