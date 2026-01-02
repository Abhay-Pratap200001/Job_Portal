import { Job } from "../models/job.model.js";
import { ApiError } from "../utils/api.Error.js";
import { asynHandler } from "../utils/asyncHandler.js";

export const postJob = asynHandler(async (req, res) => {
  try {
    const { title, description, requirements, salary, experience, location, jobType, position, companyId} = req.body;
    const userId = req.id;
    if ( !title || !description || !requirements || !salary || !experience || !location || !jobType || !position || !companyId) {
      res.status(400).json({
        message: "Some thing is missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(" "),
      salary: Number(salary),
      experienceLevel: experience,
      location,
      jobType,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created successfully",
      success: true,
      job,
    });

  } catch (error) {
    console.log("Error while creating job in job.controller.js file", error);
    throw new ApiError(500, "Internal server error");
  }
});


// *******************************************************************************************************************//


export const getAllJobs = asynHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword || ""; //for accessing keyword to filter the job
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query).populate({
        path:"company"
    }).sort({createdAt:-1})
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      jobs,
    });

  } catch (error) {
    console.log("Error while getting jobs in job.controller.js");
    throw new ApiError(500, "Internal server error");
  }
});


// *******************************************************************************************************************//



export const getJobById = asynHandler(async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({ job, success: true });

  } catch (error) {
    console.log("Error while getting jobs byId in job.controller.js", error);
    throw new ApiError(500, "Internal server error");
  }
});



// *******************************************************************************************************************//



export const getAdminJobs = asynHandler(async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log("Error while getting job by admin in job.controller.js", error);
    throw new ApiError(500, "Internal server error");
  }
});
