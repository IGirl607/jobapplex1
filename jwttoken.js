export const getoken=(user,res,statusCode,message)=>{
    const docket=user.getJWT();
    const options={
        expires:new Date(
            Date.now()+process.env.Cookie_expire*24*60*60*1000
        ),
        httponly:true
    }
    res.status(statusCode).cookie("docket",docket,options).json({
        success:true,
        message,
        user,
        docket
    });
}