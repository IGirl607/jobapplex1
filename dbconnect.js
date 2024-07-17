import mongoose from "mongoose";

const dbconnect=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"Job_Khojo"
    }).then(()=>{
        console.log("Database connected Successfully");
    }).catch((err)=>{
        console.log(`Error occured while connecting database:${err}`);
    })
}

export default dbconnect;