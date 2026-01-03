import { application } from "express";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { ApiError } from "../utils/api.Error.js";
import { asynHandler } from "../utils/asyncHandler.js";

export const applyJob = asynHandler(async(req, res) =>{
    try {
        const userId = req.id
        const jobId = req.params.id
        if (!jobId) {
            return res.status(400).json({
                message: 'Cant find job based on job id',
                success: false
            })
        }

        const existingApplication = await Application.findOne({job:jobId, applicant:userId})

        if (existingApplication) {
             return res.status(400).json({
                message: 'Already applied in this application',
                success: false
            })   
        }

        const job = await Job.findById(jobId)
        if (!job) {
             return res.status(404).json({
                message: 'job not found',
                success: false
            })
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })

        job.applications.push(newApplication._id)
        await job.save()
        res.status(200).json({
            message: "job applied successfully",
            success: true  
        })
    } catch (error) {
        console.log("Error while applying to job in application.controller.js file", error);
        throw new ApiError(500, "Internal server error");   
    }
})



export const getAppliedJobs = asynHandler(async(req, res) => {
    try {        
        const userId = req.id
        const applications = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}}
            }
        })
        
        if (!applications) {
            return res.status(404).json({
                message:'No Applications',
                success: false
            })   
        }

        return res.status(200).json({
            applications,
            success: true
        })


    } catch (error) {
        console.log("Error while getting applied job in application.controller.js file", error);
        throw new ApiError(500, "Internal server error");  
    }
})



export const getApplicants = asynHandler(async(req, res) =>{
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: {sort:{createdAt:-1}},
            populate:{
                path: 'applicant'
            }
        })

        if (!job) {
             return res.status(404).json({
                message:'Job not found',
                success: false
            })    
        }

        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log("Error while getting applicants details in application.controller.js file", error);
        throw new ApiError(500, "Internal server error"); 
    }
})



export const updateStatus = asynHandler(async(req, res) =>{
   try {
    console.log('1');
    
     const {status} = req.body
    console.log('1');

     const applicationId = req.params.id
     if (!status) {
         return res.status(404).json({
             message:'Status required',
             success: false
          }) 
     }
    console.log('1');
 
     const application = await Application.findOne({_id:applicationId})
     if (!application) {
         return res.status(404).json({
             message:'Application not found',
             success: false
         }) 
     }
    console.log('1');
 
     application.status = status.toLowerCase()
     await application.save()
    console.log('1');
 
     return res.status(200).json({
         message:'Status updated successfully'
     })
   } catch (error) {
    console.log("Error while updating status in application.controller.js file", error);
    throw new ApiError(500, "Internal server error");
   }
})


