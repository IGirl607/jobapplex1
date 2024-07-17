//In summary, this code is designed to wrap another middleware function (fxn) with error handling. If any errors occur during the execution of fxn, they will be caught and forwarded to the Express error handling middleware.
export const errorinauth=(fxn)=>{
    return (req,res,next)=>{
        Promise.resolve(fxn(req,res,next)).catch(next);
    }
}