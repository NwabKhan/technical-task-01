import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/config";
import modelRoutes from "./routes/model.route";

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT || "3000");

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// import populateDB from "./populateDB.js"; // Used to populate DB

app.use("/api/models", modelRoutes);

// Start the server when we have a valid connection
connectDB()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`App is Running on Port http://localhost:${port}`);
      });
      // populateDB()
    } catch (error) {
      console.log("Cannot Connect to Server");
    }
  })
  .catch((err: Error) => console.log("Invalid DB Connection", err));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const message: string = err.message || "Internal Server Error";
  return res.json({
    success: false,
    message,
  });
});
