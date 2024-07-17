import ErrorHandler from "../middlewares/error.js";
import { errorinauth } from "../middlewares/errorinauth.js";
import { User } from "../models/user.js";
import { getoken } from "../utils/jwttoken.js";

export const register=errorinauth(async(req,res,next)=>{
    const {name,email,telephone,password,role}=req.body;

    if(!name||!email||!telephone||!password||!role)
    {
        return next(new ErrorHandler("Fill all the details"));
    }
    const oldemail= await User.findOne({email});
    if(oldemail)
    {
        return next(new ErrorHandler("Email already exists!!"));
    }

    const newuser=await User.create({
        name,
        email,
        telephone,
        password,
        role
    });
    getoken(newuser,res,200,"User registered Successfully");
})

export const login=errorinauth(async(req,res,next)=>{
    const {email,password,role}=req.body;
    if(!email||!password||!role)
    {
        return next(new ErrorHandler("Pls fill email,password and role",400));
    }
    const olduser= await User.findOne({email});
    if(!olduser)
    {
        return next(new ErrorHandler("No user found",400));
    }
    const matchpassword=olduser.compare(password);
    if(!matchpassword)
    {
        return next(new ErrorHandler("Invalid email or password",400));
    }
    if(olduser.role!=role)
    {
        return next(new ErrorHandler("No user with the given role exists",400));
    }
    getoken(olduser,res,200,"User logged in Successfully");
});

export const logout=errorinauth(async(req,res,next)=>{
    res.status(201).cookie("docket","",{
        httponly:true,
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"User logged out Successfully"
    });
});

export const getuser=errorinauth(async(req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user
    });
});
