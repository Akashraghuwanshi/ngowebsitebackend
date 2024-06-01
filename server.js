import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {connectDB} from "./config/dbConnection.js"
import becomevolunteerRoutes from "./routes/becomeVolunteerRoute.js"
import fileUpload from "express-fileupload";

//connect to MongoDB
connectDB();
const app = express();
const Port = process.env.PORT||8080;

// CORS configuration
const allowedOrigins = ['https://ngowebsitebackend.onrender.com','http://localhost:5173','http://127.0.0.1:5173/'];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));


//middleware 
app.use(express.json())
// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({useTempFiles:true}))

app.get("/",(req,res)=>{
    res.json({message:"Server is running"})

})


/*  Become-Volunteer-routes*/
app.use("/becomevolunteer",becomevolunteerRoutes);

// Error Handling Middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      success:false,
      statusCode,
      message
    })
  })
// Start Server
  mongoose.connection.once('open',()=>{
    console.log("Connected to MongoDB");
    app.listen(Port,()=>{
        console.log(`Server is running on Port ${Port}`)
    });
})



