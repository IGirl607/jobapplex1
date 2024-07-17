import { errorinauth } from '../middlewares/errorinauth.js';
import ErrorHandler from '../middlewares/error.js';
import { Apply } from '../models/apply.js';
import cloudinary from 'cloudinary';
import { Job } from '../models/job.js';

export const employergetapplications = errorinauth(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("You are not allowed to view these applications", 400));
  }
  const { _id } = req.user;
  const allapplies = await Apply.find({ "employer_id.user_id": _id });
  res.status(200).json({
    success: true,
    allapplies
  });
});

export const myapplication = errorinauth(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(new ErrorHandler("You are not allowed to view these applications", 400));
  }
  const { _id } = req.user;
  const myapply = await Apply.find({ "apply_id.user_id": _id });
  res.status(200).json({
    success: true,
    myapply
  });
});

export const deleteapplication = errorinauth(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(new ErrorHandler("You are not allowed to delete applications", 400));
  }
  const { id } = req.params;
  const getapply = await Apply.findById(id);
  if (!getapply) {
    return next(new ErrorHandler("Oops!!No application found"), 400);
  }
  await getapply.deleteOne();
  res.status(200).json({
    success: true,
    message: "Application deleted Successfully"
  });
});

export const postapplication = errorinauth(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(new ErrorHandler("You are not allowed to post applications", 400));
  }
  if (!req.files || !Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("No resume file"), 400);
  }
  const { resume } = req.files;
  const allowedformats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedformats.includes(resume.mimetype)) {
    return next(new ErrorHandler("Invalid file format..Pls upload a PNG,JPG or WEBP file", 400));
  }
  const cloudinaryresponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );
  if (!cloudinaryresponse || cloudinaryresponse.error) {
    console.log("Cloudinary error: ", cloudinaryresponse.error || "Unknown Cloudinary error");
    return next(new ErrorHandler("Failed to upload resume", 500));
  }
  const { name, email, cover_letter, phone, address, _id } = req.body;
  if (!_id) {
    return next(new ErrorHandler("No job found", 404));
  }
  const jobdetails = await Job.findById(_id);
  if (!jobdetails) {
    return next(new ErrorHandler("No job found", 404));
  }
  const apply_id = {
    user_id: req.user._id, // Make sure to include the user property
    role: "Job Seeker"
  }
  const employer_id = {
    user_id: jobdetails.job_posted_by, // Make sure to include the user property
    role: "Employer"
  }
  if (!name || !email || !phone || !address || !cover_letter || !resume || !apply_id || !employer_id) {
    return next(new ErrorHandler("Pls fill all the details", 400));
  }
  const apply = await Apply.create({
    name,
    email,
    phone,
    address,
    cover_letter,
    resume: {
      public_id: cloudinaryresponse.public_id,
      url: cloudinaryresponse.secure_url
    },
    apply_id,
    employer_id
  });
  res.status(200).json({
    success: true,
    message: "Application posted Successfully",
    apply
  });
});
