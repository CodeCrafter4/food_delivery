import express from "express";
import {
  addfood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const foodRouter = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer to use memory storage instead
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to upload to cloudinary
const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) return next();

  try {
    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "food-images",
    });

    // Add the url to the request
    req.file.path = result.secure_url;
    next();
  } catch (error) {
    next(error);
  }
};

foodRouter.post("/add", upload.single("image"), uploadToCloudinary, addfood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
