import express from "express"
import dotenv from "dotenv";
import {config} from "dotenv"
import cors from 'cors';//cors is used to connect multiple frontend and backend
import fileUpload from 'express-fileupload'
import userrouter from './routes/userrouter.js'//we are using js here as we took type=module in package-lock.json
import applicationRouter from "./routes/applicationrouter.js";
import jobRouter from './routes/jobrouter.js';
import dbconnect from "./database/dbconnect.js";
import { errorjudging } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
const app=express();
config({ path: "./config/config.env" });

const corsOptions = {
   origin:[process.env.Frontend_URL], // Replace with your frontend URL
   methods: ["GET", "POST", "DELETE", "PUT"],
   credentials: true // Allow credentials (cookies, authorization headers)
 };
 
 app.use(cors(corsOptions));
 
 
 app.use(express.json());//to take input in json format
 app.use(express.urlencoded({extended:true}))//converts url string in json format
 app.use(cookieParser());

 app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
 }));

app.use('/api/user',userrouter);
app.use('/api/application',applicationRouter);
app.use('/api/job',jobRouter);

dbconnect();

app.use(errorjudging);

export default app;