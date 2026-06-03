//! create an express server and check if it's working
import mongoose from "mongoose"; 
// ES Modules
import dotenv from "dotenv";

// or
//const mongoose = require("mongoose"); // CommonJS


import express from "express";
import cors from "cors"; // cross origin resource sharing (browser blocks the request which comes from anywhere but localhost:8000)
// 1) we are importing express module which we installed using npm i

import userRoutes from "./routes/auth-route.js";
import sessionRoutes from "./routes/session-route.js";
import aiRoutes from "./routes/ai-route.js";
// import experienceRoutes from "./routes/experienceRoutes.js";

dotenv.config();

// 2) call/invoke the function
let app = express(); // object = {listen}

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

app.use(
  cors({
    origin: "https://mockmateai-iota.vercel.app",
  }),
);

app.use("/api/auth", userRoutes); // http://localhost:9001/api/auth/signup
app.use("/api/sessions", sessionRoutes);
app.use("/api/ai", aiRoutes);
// app.use("/api/experiences", experienceRoutes);

// 3) assign a port number to our server
app.listen(9001, () => {
  console.log("Server Started.....");
});
// app.listen(PORT_NUMBER, callback)

//! to check if the server is running, in cmd(git bash), goto backend folder and type "npx nodemon index.js"
// open browser -> localhost:PORT_NUMBER and press enter

// https://nodejs.org/en/ (/) =>  this is base url
// https://nodejs.org/en/blog => /blog is one endpoint
// https://nodejs.org/en/download
