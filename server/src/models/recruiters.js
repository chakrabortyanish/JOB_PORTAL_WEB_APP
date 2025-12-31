import mongoose from "mongoose";
const { Schema, model } = mongoose;

const recruiterSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String},
}, { timestamps: true });

const Recruter = model("Recruter", recruiterSchema);

export default Recruter; 