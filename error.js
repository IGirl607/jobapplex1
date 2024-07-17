class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}
export const errorjudging=(err,req,res,next)=>{
     err.message=err.message||"Internal server Error";
     err.statusCode=err.statusCode||500;

     if(err.name==="CastError")
     {
        const message=`Resource not found.Invalid ${err.path}`;
        err=new ErrorHandler(message,400);
     }
     if(err.code===11000)
     {
         const message=`Duplicate ${Object.keys(err.keyvalue)} Entered`;
         err=new ErrorHandler(message,400);
     }
     if(err.name==="JsonWebTokenError")
     {
          const message="JsonWebToken is Invalid.Try again";
          err=new ErrorHandler(message,400);
     }
     if(err.name==="TokenExpiredError")
     {
          const message="JsonWebToken Expired.Try Again";
          err=new ErrorHandler(message,400);
     }
     return res.status(err.statusCode).json({
         success:false,
         error:err.message
     });
}

export default ErrorHandler;