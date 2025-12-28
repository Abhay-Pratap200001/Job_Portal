import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";
import { ApiError } from "../utils/api.Error.js";
import { asynHandler } from "../utils/asyncHandler.js";

export const register = asynHandler(async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist try to register with other email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    res.status(200).jsonn({
      newUser,
      message: "user created successfully",
      success: true,
    });

  } catch (error) {
    console.log("Error while registering user in user.controller.js file", error);
    throw new ApiError(500, "Internal server error");
  }
});




// ******************************************************************************************************
export const login = asynHandler(async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "email not found",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Inavlid credantials",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "role dosen't match",
        success: false,
      });
    }

    const tokenData = {userId: user._id};

    const token = await jwt.sign(tokenData, process.env.JWT_TOKEN, {expiresIn: "7d"});

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).cookie("token", token, { httpsOnly: true, sameSite: "strict" }).json({
        message: "Login successfully",
        success: true,
        user,
      });
  } catch (error) {
    console.log("Error while login user in user.controller.js file", error);
    throw new ApiError(500, "Internal server error");
  }
});




// ******************************************************************************************************
export const logout = asynHandler(async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "user logout successfully",
      success: true,
    });
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
});




// ******************************************************************************************************
export const updateProfile = asynHandler(async (req, res) => {
  try {
    const file = req.file;
    const { fullname, email, phoneNumber, bio, skills } = req.body;

  if (!fullname && !email && !phoneNumber && !bio && !skills) {
    return res.status(400).json({
      message: "At least one field is required to update",
      success: false,
    });
  }

    const userId = req.id;
    const user = await User.findById(userId)
    if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  }
    
  if (fullname) user.fullname = fullname;
  if (email) user.email = email;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (bio) user.profile.bio = bio;
  if (skills) {
    user.profile.skills = skills.split(",").map(skill => skill.trim())}

  await user.save();

  const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    }
    return res.status(200).json({
      user: updatedUser,
      message:'Profile updated successfully',
      success:true
    })
  } catch (error) {
    console.log("Error while updating user profile in user.controller.js file", error);
    throw new ApiError(500, "Internal server error");
  }
});
