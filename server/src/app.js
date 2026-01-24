import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { clerkMiddleware } from "@clerk/express";

import recruiterRouter from "./routes/recruiters.js";
import jobRouter from "./routes/job.routes.js";
import applicationRouter from "./routes/application.routes.js";
import path from "path";

export const app = express();
//Allow client requests
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5174",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "src", "uploads")));
app.use(cookieParser());
app.use(clerkMiddleware());

//routes
app.use("/api/recruiter", recruiterRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/applications", applicationRouter);
