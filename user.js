import mongoose from 'mongoose';
import validator from 'validator';
import token from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3,"Name should atleast contain 3 letters"],
        maxLength:[30,"Name should not exceed 30 letters"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Pls provide valid email"]
    },
    telephone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Password should be atleast of 8 characters"]
    },
    role:{
        type:String,
        required:true,
        enum:["Job Seeker","Employer"]//enum is used to refer to case where no other values can be entered except the provided ones
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

//Hashing the password

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})

//Comparing the passwords

userSchema.methods.compare=async function(password){
    return await bcrypt.compare(password,this.password);
}

//Generating a JWT token 
userSchema.methods.getJWT=function(){
    return token.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.Jwt_expire,
    })
}

export const User=mongoose.model("User",userSchema);