import jwt from "jsonwebtoken"
import { User } from "../models/User.js"

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};              


export const registerUser = async (req,res) =>{
    const {fullname,email,password,phone} = req.body;

    if(!fullname?.trim() || !email?.trim() || !password?.trim() || !phone?.trim()) {
       return res.status(400).json({ message: "All fields are required" })
    }

    const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({message: "Email is already registered"});
  }

  const user = await User.create({
    fullname,
    email,
    password,
    phone
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  res.status(201).json({createdUser,message:"User registered successfully"})
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({message:"Email and password are required"});
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({message:"Invalid email or user not found"}) ;
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    return res.status(401).json({message:"Invalid password"});
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  const loggedUser = await User.findById(user._id).select("-password -refreshToken");

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json({
      success: true,
      message: "User logged in successfully",
      user: loggedUser
    });
};



export const logoutUser = async (req, res) => {

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,  
      },
    }
  );

  const options = {
    httpOnly: true,
    secure: false,     
    sameSite: "Lax",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      success: true,
      message: "User logged out successfully",
    });
};


export const getCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};