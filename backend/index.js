import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/config.js";
import submissionRoutes from "./routes/submission.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/models", submissionRoutes);

//Start the server when we have valid connection
connectDB()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`App is Running on Port http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot Connect to Server");
    }
  })
  .catch((err) => console.log("Invalid DB Connection", err));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
