import bcrypt from 'bcrypt';
import Recruiter from '../models/recruiters.js';
import jwt from 'jsonwebtoken';

const handleRecruiterRegistration = async (req, res) => {
    try {
    const { companyName, companyEmail, password, } = req.body;

    const existing = await Recruiter.findOne({ email: companyEmail });
    if (existing) return res.status(400).json({ message: 'Recruiter already registered', success: false });

    const hashed = await bcrypt.hash(password, 10);

    const rec = new Recruiter({
      name:companyName,
      email: companyEmail,
      password: hashed,
      image: req.file ? req.file.filename : null
    });

    await rec.save();
    res.json({ message: 'Recruiter registered', success:true, recruiter: { id: rec._id, companyImage: rec.image? "yes": "No" } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  } 
};

const handleRecruiterLogin = async (req, res) => {
  try {
    const { companyEmail, password } = req.body;
    const recruiter = await Recruiter.findOne({ email: companyEmail });
    if (!recruiter) {
      return res.status(400).json({ message: 'Invalid email or password', success: false });
    }
    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password', success: false });
    }

     const token = jwt.sign(
      {
        id: recruiter._id,
        name: recruiter.name,
        email: recruiter.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    const options = {
      httpOnly: true,
      /* secure: process.env.NODE_ENV === "production", // only true in production */
      secure: true, // Required for HTTPS (Render)
      sameSite: "none", // Required for cross-site cookies (Vercel -> Render)
    };

    res.status(200)
    .cookie("R_Token", token, options)
    .json({ message: 'Login successful', token, success: true, recruiter: { id: recruiter._id, companyName: recruiter.name, email: recruiter.email, companyImage: recruiter.image} });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const handleRecruiterEdit = async (req, res) => {
  // Implementation for editing recruiter details
   const { name, email } = req.body;

  try {
    const updatedUser = await Recruiter.findByIdAndUpdate(
      req.userId,                  // from JWT
      { $set: { name, email } },    // password update
      { new: true }
    ).select("-password");

    console.log("Updated User:", updatedUser);
    res.status(200).json({ message: "Profile updated", success:true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
}

const handleRecruiterDelete = async (req, res) => {
  // Implementation for deleting recruiter profile
  try { 
    await Recruiter.findByIdAndDelete(req.userId); // 🔐 from JWT
    res.status(200).json({ message: "Profile deleted", success:true });
  } catch (err) {
    res.status(500).json({ message: "Deletion failed" });
  }
};

export { handleRecruiterRegistration, handleRecruiterLogin, handleRecruiterEdit, handleRecruiterDelete }; 