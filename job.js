import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    job_title:{
        type:String,
        required:true,
        minLength:[3,"Job Title should atleast contain 3 letters"],
        maxLength:[50,"Job title must not exceed 50 characters"]
    },
    job_description:{
        type:String,
        required:true,
        minLength:[3,"Job description should atleast contain 3 letters"],
        maxLength:[50,"Job description must not exceed 50 characters"]
    },
    category:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
        minLength:[10,"location should atleast contain 10 letters"],
        maxLength:[50,"location must not exceed 50 characters"]
    },
    fixed_salary:{
        type:Number,
        minLength:[4,"fixed_salary should atleast contain 4 digits"],
        maxLength:[9,"fixed_salary must not exceed 9 digits"],
    },
    salary_from:{
        type:Number,
        minLength:[4,"fixed_salary should atleast contain 4 digits"],
        maxLength:[9,"fixed_salary must not exceed 9 digits"],
    },
    salary_to:{
        type:Number,
        minLength:[4,"fixed_salary should atleast contain 4 digits"],
        maxLength:[9,"fixed_salary must not exceed 9 digits"],
    },
    expired:{
        type:Boolean,
        default:false
    },
    job_posted_on:{
        type:Date,
        default:Date.now()
    },
    job_posted_by:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
});

export const Job=mongoose.model("Job",jobSchema);