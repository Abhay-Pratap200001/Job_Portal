import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Button } from "../button";
import { Avatar, AvatarImage } from "../avatar";
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
            <li>Home</li>
            <li>Jobs</li>
            <li>Brows</li>
          </ul>
          {!user ? (
            <div className="flex gap-3">
              <Button className="bg-slate-700 hover:bg-slate-600">Login</Button>
              <Button className="bg-slate-700 hover:bg-slate-600">SignUp</Button>
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
