//So, this middleware is designed to check if a user is authorized by verifying the JWT token present in the request cookies and fetching the user details from the database. If the user is authorized, it attaches the user information to the request (req.user) and passes control to the next middleware. Otherwise, it forwards an error indicating unauthorized access.
import { errorinauth } from "./errorinauth.js"
import ErrorHandler from './error.js'
import jwt from 'jsonwebtoken'
import { User } from "../models/user.js";
export const authorised=errorinauth(async(req,res,next)=>{
    const {docket}=req.cookies;
    if(!docket)
    {
        return next(new ErrorHandler("User not authorised",400));
    }
    const founduser=jwt.verify(docket,process.env.JWT_SECRET);
    console.log(founduser);
    req.user=await User.findById(founduser.id);

    next();
})