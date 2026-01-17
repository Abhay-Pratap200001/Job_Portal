import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

// Job card component – displays a single job listing
const job = () => {
  return (
    // Main card container
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      
      {/* Top section: posted time + bookmark button */}
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-500 font-medium">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      {/* Company info section */}
      <div className="flex items-center gap-2 my-3">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://static.vecteezy.com/system/resources/thumbnails/008/214/517/small_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-bold text-slate-600">Company Name</h1>
          <p className="font-medium text-slate-500">India</p>
        </div>
      </div>

      {/* Job title and description */}
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
          rerum? Dolores id animi quas aspernatur! Magnam.
        </p>
      </div>

      {/* Job meta information */}
      <div className="space-x-2 pt-2">
        <Badge variant="secondary" className="text-blue-700 font-bold">
          12 Positions
        </Badge>
        <Badge variant="secondary" className="text-blue-700 font-bold">
          Part Time
        </Badge>
        <Badge variant="secondary" className="text-blue-700 font-bold">
          11Lpa
        </Badge>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-4 mt-3">
        <Button variant="outline" className="bg-slate-100">
          Details
        </Button>
        <Button variant="outline" className="bg-slate-100">
          Save for later
        </Button>
      </div>
    </div>
  );
};

export default job;
