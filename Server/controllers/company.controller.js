import { Company } from "../models/company.model.js";
import { ApiError } from "../utils/api.Error.js";
import { asynHandler } from "../utils/asyncHandler.js";

export const registerCompany = asynHandler(async(req, res) => {
    try {
        const {companyName} = req.body;
        if (!companyName) {
            return res.status(400).json({
                message:"Company name is required",
                success:false
            })
        }

        let company = await Company.findOne({name:companyName})
        if (company) {
            return res.status(400).json({
                message:"Buy this name of company is already register please use unique name",
                success:false
            })
        }

        company = await Company.create({
            name:companyName,
            userId:req.id
        })

        return res.status(201).json({
            message:"Company register successfully",
            success:true,
            company
        })
    } catch (error) {
        console.log("Error while registering comapany in company.controller.js file", error);
        throw new ApiError(500, "Internal server error");
    }
})



export const getCompanies = asynHandler(async(req, res) =>{
    try {
        const userId = req.id
        const companies = await Company.find({userId})
        if (!companies) {
            return res.status(404).json({
                message:"Comapanies not found..",
                success:false
            })
        }

        return res.status(404).json({
            companies,
            success:true
        })
    } catch (error) {
       console.log("Error while getCompany comapany in company.controller.js file", error);
       throw new ApiError(500, "Internal server error");
    }
})



export const getCompanyById = asynHandler(async(req, res) =>{
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId)
          if (!company) {
            return res.status(404).json({
                message:"Comapany not found..",
                success:false
            })
        }
        return res.status(201).json({
            success:true,
            company
         })
    } catch (error) {
       console.log("Error while getCompanyById  in company.controller.js file", error);
       throw new ApiError(500, "Internal server error");
    }
})



export const updateCompany = asynHandler(async(req, res) =>{
    try {
        const {name, description, website, location} = req.body
        // const file = req.file
        const updateData = {name, description, website, location}
        const comapany = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true})
        if (!comapany) {
            return res.status(404).json({
                message:"Comapany not found for updation..",
                success:false
            })
        }

         return res.status(201).json({
            message:"Company info updated successfuly",
            success:true,
         })
    } catch (error) {
       console.log("Error while updating comapany in company.controller.js file", error);
       throw new ApiError(500, "Internal server error");
    }
})