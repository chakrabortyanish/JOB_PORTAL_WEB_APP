import mongoose from "mongoose";
const { model } = mongoose;

const userSchema = new mongoose.Schema({
  clerkId: String,
  cvUrl: String, // ✅ store Cloudinary URL
});

const UserCV = model("UserCV", userSchema);

export default UserCV; 