import { Search } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5">
        <span className="p-2 rounded-full bg-gray-100 text-[#F83002] font-medium mx-auto">
          No. 1 Job Hunt Platform
        </span>
        <h1 className="font-bold text-5xl">
          Search Apply <br />
          Get Your<span className="text-[#6A38C2]">Dream Job</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          distinctio fuga delectus quibusdam fugiat.
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full"/>
          <button className="rounded-r-full bg-slate-300"><Search className=' w-5'/></button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
