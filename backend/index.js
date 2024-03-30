import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const corsOptions ={
  origin:'*', 
  credentials:true,          
  optionSuccessStatus:200,
}


app.use(cors(corsOptions)) 
app.use(express.json());


app.listen(port, () => {
  console.log(`Lisint on Port on port${port}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});