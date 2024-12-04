import {asyncHandler} from '../utils/AsyncHandler.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';
import {JobSeeker} from '../models/JobSeeker.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import jwt from 'jsonwebtoken';

const generateAccessandRefreshToken = async(userId)=> {
    try {
        const user = await JobSeeker.findById(userId)
    
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
    
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
    
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Token generation failed")
    }
}


const registerUser = asyncHandler(async (req,res,next)=>{
    const {name,email,password} = req.body

    if(!name || !email || !password){
        return next(new ApiError(400,"Please provide all the required fields"))
    }

    const existedUser = await JobSeeker.findOne({email})
    if(existedUser){
        throw new ApiError(400,"User already existed")
    }

    const profileImgLocalPath = req?.files?.profileImage?.[0].path
    const resumeLocalPath = req?.files?.resume?.[0].path

    if(!resumeLocalPath){
        return next(new ApiError(400,"Please provide a resume"))
    }

    if(!profileImgLocalPath){
        return next(new ApiError(400,"Please provide a profile image"))
    }
    const profileImgUrl = await uploadOnCloudinary(profileImgLocalPath)
    const resumeUrl = await uploadOnCloudinary(resumeLocalPath)


    if (!profileImgUrl || !profileImgUrl.url) {
        throw new ApiError(400, "Profile image URL is missing");
    }
    
    if (!resumeUrl || !resumeUrl.url) {
        throw new ApiError(400, "Resume URL is missing");
    }

    const user = await JobSeeker.create({
        name,
        email,
        password,
        profileImage: profileImgUrl.url,
        resume: resumeUrl.url
    })

    const createdUser = await JobSeeker.findById(user._id).select("-password")
    if(!createdUser){
        throw new ApiError(500,"User not created")
    }
    return res.status(201).json(new ApiResponse(201,createdUser,"User created successfully"))
})

const loginUser = asyncHandler(async (req,res,next)=> {
    const {email,password} = req.body

    if(!email || !password){
        return next(new ApiError(400,"Please provide all the required fields"))
    }

    const user = await JobSeeker.findOne({email})
    if(!user){
        throw new ApiError(404,"User not found")
    }

    const isPasswordValid = await user.isPasswordMatch(password)
    if(!isPasswordValid){
        throw new ApiError(401,"Invalid credentials")
    }
    
    const {accessToken,refreshToken} = await generateAccessandRefreshToken(user._id)

    const loggedInUser = await JobSeeker.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        // secure: true,
        sameSite: "lax",
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, 
                refreshToken
            },
            "User logged in successfully"
        )
    )
})

const logoutUser = asyncHandler(async (req,res,next) => {

    await JobSeeker.findByIdAndUpdate(
        req._id,
        {
            $set: {refreshToken: undefined}
        },
        {new: true}
    )

    const options = {
        httpOnly: true,
        // secure: true,
        sameSite: "lax",
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged out successfully"
        )
    )
})



export {registerUser, loginUser, logoutUser }