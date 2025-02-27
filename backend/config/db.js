import mongoose from 'mongoose';

export const connectDB = async () =>{
    await mongoose
      .connect(
        "mongodb+srv://ssswar367:u1vv4dasn3tJhP5n@cluster0.zmiew.mongodb.net/food-delivery"
      )
      .then(() => {
        console.log("DB Connected");
      });
}