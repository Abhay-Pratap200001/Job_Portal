import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";

const randomJobs = [1, 2, 3, 4, 5, 6, 7];

const Browse = () => {
  return (
    <div>
      <Navbar />
      <div>
        <h1>Search Result{randomJobs.length}</h1>
        <div className="grid grid-cols-3 gap-4 p-5">
          {randomJobs.map((item, idx) => {
            return <Job />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
