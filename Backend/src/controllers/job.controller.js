import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Job } from "../models/job.model.js";
import { Employer } from "../models/employer.model.js";

const postJobs = asyncHandler(async (req,res,next) => {

    const {title,description,location,company,salary} = req.body
    const employerID = req.body.employerID

    console.log(req.body);    
    // const employerID = req.user._id

    if(!title || !description || !location || !company || !salary){
        return next(new ApiError(400,"Please provide all the required fields"))
    }
    
    const job = await Job.create({
        title,
        description,
        location,
        company,
        salary,
        postedBy: employerID
    })

    const postedJob = await Job.findById(job._id)
    if(!postedJob){
        return next(new ApiError(500,"Job posting failed"))
    }
    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            postedJob,
            "Job posted successfully"
        )
    )
})

const getAllJobs = asyncHandler(async (req,res,next) => {

    // const jobs = await Job.find({}).populate("postedBy")
    const jobs = await Job.find({})
    // const employers = await getEmployers(jobs)
    // console.log("Employers:",employers);
    
    if(!jobs){
        return next(new ApiError(404,"No jobs found"))
    }

    // jobs.forEach((job,index) => {
    //     job.postedBy = employers[index]
    // })



    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            jobs,
            "Jobs found"
        )
    )
})

// const getEmployers = async (jobs) => {
//     const employers = await Promise.all(
//         jobs.map(async (job) => {
//             return await Employer.findById(job.postedBy);
//         })
//     );
//     return employers;
// }

export {postJobs, getAllJobs}