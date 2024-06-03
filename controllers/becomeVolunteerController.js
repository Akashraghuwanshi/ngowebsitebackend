
import BecomeVolunteer from "../models/becomeVolunteerModel.js";
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

/* Cloudinary configuration */
cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Api_key,
    api_secret: process.env.Api_secret,
  });

// VolunteerController function component
const becomeVolunteerController= async (req, res) => {
    console.log(req.body);
    const { name, age, areaOfInterest, contactNumber, district, gender, state } = req.body;
    console.log(req.files);

    // Basic validation
    if (!name || !age || !areaOfInterest || !contactNumber || !district || !gender || !state || !req.files) {
        return res.status(400).send({ error: 'All fields are required' });
    }
    const file = req.files.image;
    // console.log(file)

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "NGO Volunteers", // Optional: organize your uploads
        use_filename: true, // Optional: keep original file name
      });
    // console.log(result);

     // Delete the temporary file to free up space
     fs.unlinkSync(file.tempFilePath);

    try {
        // Create a new volunteer
        const newVolunteer = new BecomeVolunteer({
            name,
            age,
            areaOfInterest,
            contactNumber,
            district,
            gender,
            state,
            image: result.secure_url,
        });

        // Save to database
        await newVolunteer.save();

        res.status(201).json(newVolunteer);
    } catch (error) {
      console.error(error); // Log error for debugging
        res.status(500).json({ error: error.message });
    }
};

// New GET request handler
const getNewVolunteers = async (req, res) => {
    try {
      const newvolunteers = await BecomeVolunteer.find(); // Fetch all volunteers
      // console.log(newvolunteers)
      res.status(200).json(newvolunteers);
    } catch (error) {
      errorHandler(error);
      res.status(500).json({ error: error.message });
    }
  };

export  {becomeVolunteerController,getNewVolunteers}