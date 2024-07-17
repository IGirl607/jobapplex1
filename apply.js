import mongoose from "mongoose";
import validator from "validator";

const applyschema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[4,"name should be atleast of 4 letters"],
        maxLength:[30,"name should not be more than 30 letters"],
    },
    email:{
        type:String,
        required:true,
        validator:[validator.isEmail,"pls give valid email"],
    },
    cover_letter:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    apply_id:{
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Job Seeker"],
            required:true
        }
    },
    employer_id:{
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Employer"],
            required:true
        }
    }
});

export const Apply=mongoose.model("Apply",applyschema);