import mongoose from "mongoose";
const { model } = mongoose;

const userSchema = new mongoose.Schema(
   {
    clerkId: {
      type: String,
      required: true,
    },

    cvUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserCV = model("UserCV", userSchema);

export default UserCV; 