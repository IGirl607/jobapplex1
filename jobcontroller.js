import moment from 'moment';
import ErrorHandler from '../middlewares/error.js';
import { errorinauth } from '../middlewares/errorinauth.js';
import { Job } from '../models/job.js';
import mongoose from 'mongoose';


export const fetchjobs = errorinauth(async (req, res, next) => {
   const jobs=await Job.find({expired:false});

  res.status(200).json({
     jobs
  });
});

export const searchjobs=errorinauth(async(req,res,next)=>{
  const {job_title,search,sort}=req.query;

  const queryobj={
     job_posted_by: req.user._id
  }
  if(job_title && job_title!=='all')
  {
      queryobj.job_title=job_title;
  }
  if(search)
  {
      queryobj.city={$regex: search,$options: 'i'};
  }
  let result = await Job.find(queryobj);

  const page=(req.query.page)||1;
  const limit=(req.query.limit)||10;

  const skip=(page-1)*limit;
 
  const total_jobs=await Job.countDocuments(result);
  const numofpg=Math.ceil(page/limit);
  //sorting
  /*if(sort==='latest')
  {
      jobs=jobs.sort({job_posted_on: -1});
  }
  else if(sort==="oldest")
  {
     jobs= jobs.sort({job_posted_on: -1});
  }
  else if(sort==="a-z")
  {
      jobs= jobs.sort({job_title: 1});
  }
  else if(sort==="Z-A")
  {
      jobs= jobs.sort(()=>{job_title:1});
  }*/
  res.status(200).json({
      success: true,
      total_jobs,
      result,
      numofpg
  });
})

export const postjob = errorinauth(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to post Job", 400)
      );
    }
    const {
      job_title,
      job_description,
      category,
      country,
      city,
      location,
      fixed_salary,
      salary_from,
      salary_to,
    } = req.body;
  
    if (!job_title || !job_description || !category || !country || !city || !location) {
      return next(new ErrorHandler("Please provide full job details.", 400));
    }
  
    if ((!salary_from || !salary_to) && !fixed_salary) {
      return next(
        new ErrorHandler(
          "Please either provide fixed salary or ranged salary.",
          400
        )
      );
    }
  
    if (salary_from && salary_to && fixed_salary) {
      return next(
        new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
      );
    }
    const job_posted_by = req.user._id;
    const new_job = await Job.create({
      job_title,
      job_description,
      category,
      country,
      city,
      location,
      fixed_salary,
      salary_from,
      salary_to,
      job_posted_by
    });
    res.status(200).json({
      success: true,
      message: "Job Posted Successfully!",
      new_job,
    });
});


export const showmyjobs = errorinauth(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("You are not allowed to post a job", 400));
    }
    const myjob = await Job.find({ job_posted_by: req.user._id });
    res.status(200).json({
        success: true,
        myjob
    });
});

export const update_job = errorinauth(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("You are not allowed to post a job", 400));
    }
    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("Oops!No job found", 400));
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindandModify: false
    });
    res.status(200).json({
        success: true,
        message: "Job updated Successfully",
        job
    });
});

export const delete_job = errorinauth(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("You are not allowed to post a job", 400));
    }
    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("Oops!No job found", 400));
    }
    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Job deleted Successfully"
    });
});

export const getSingleJob = errorinauth(async (req, res, next) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return next(new ErrorHandler("Job not found!", 404));
        }
        res.status(200).json({
            success: true,
            job,
        });
    } catch (error) {
        return next(new ErrorHandler(`Invalid ID / CastError`, 404));
    }
});

