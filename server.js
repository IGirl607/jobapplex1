import app from "./app.js";
import cloudinary from "cloudinary";


cloudinary.v2.config({
    cloud_name:process.env.CloudName,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});
app.listen(process.env.PORT,()=>{
   console.log(`Server running on PORT ${process.env.PORT}`);
});


