import { error } from "console";
import foodModel from "../models/foodModel.js";
import fs from 'fs'

// Add food item
const addfood = async (req, res) => {
  try {
    // The image URL is now available in req.file.path thanks to our uploadToCloudinary middleware
    const imageUrl = req.file ? req.file.path : null;
    
    const newFood = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: imageUrl, // Make sure we're saving the Cloudinary URL
    });

    const savedFood = await newFood.save();
    res.json({ success: true, food: savedFood });
  } catch (error) {
    console.error('Error adding food:', error);
    res.json({ success: false, message: "Error adding food" });
  }
};

// Get all food list
const listFood = async (req, res) => {
    try {
      const foods = await foodModel.find({});
      res.json({ success: true, data:foods });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };

const removeFood = async (req,res)=>{
     try{

         const food = await foodModel.findById(req.body.id);
         fs .unlink(`uploads/${food.image}`,()=>{})
       
         await foodModel.findByIdAndDelete(req.body.id)
         res.json({success:true,message:"Food Removed"})

     }catch{
         console.log(error);
         res.json({success: false, message: "Error"});
     }
}



export { addfood, listFood, removeFood };
