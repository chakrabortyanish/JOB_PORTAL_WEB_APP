import jwt from "jsonwebtoken";
import Recruiter from "../models/recruiters.js";

const verifyToken = (req, res, next) => {
  console.log("req.cookies:", req.cookies.R_Token);
  // console.log("req.headers['authorization']:", req.headers["authorization"]);

  let R_Token;

  if (req.cookies.R_Token) {
    R_Token = req.cookies.R_Token;
  } else if (req.headers["authorization"]) {
    R_Token = req.headers["authorization"].replace("Bearer ", "");
  } else {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(R_Token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(403).json({ message: "Invalid token" });
    }

    const recruiterId = decoded.id;
    req.userId = recruiterId; // attach payload to request
    next();
  });
};

export { verifyToken };