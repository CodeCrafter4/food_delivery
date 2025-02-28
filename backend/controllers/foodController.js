import { error } from "console";
import foodModel from "../models/foodModel.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

// Add food item
const addfood = async (req, res) => {
  try {
    console.log("Uploaded file:", req.file);
    const imageUrl = req.file ? req.file.path : null;
    console.log("Image URL being saved:", imageUrl);

    const newFood = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: imageUrl,
    });

    const savedFood = await newFood.save();
    console.log("Saved food:", savedFood);
    res.json({ success: true, food: savedFood });
  } catch (error) {
    console.error("Error adding food:", error);
    res.json({ success: false, message: "Error adding food" });
  }
};

// Get all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    console.log("Foods from database:", foods);
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    // If there's an image URL, delete it from Cloudinary
    if (food.image) {
      // Extract public_id from the Cloudinary URL
      const publicId = food.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`food-images/${publicId}`);
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error("Error removing food:", error);
    res.json({ success: false, message: "Error removing food" });
  }
};

export { addfood, listFood, removeFood };
