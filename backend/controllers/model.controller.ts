import { Request, Response, NextFunction } from "express";
import DataModel, { IModel } from "../models/model.model.ts";

export const subscribeForm = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const modelData: IModel = req.body;
    const model = new DataModel(modelData);
    await model.save();
    res.status(201).json({
      message: "Data saved successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const getModels = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const models = await DataModel.find({});
    if (!models) {
      res.status(404);
      throw new Error("Model not found!");
    }
    res.status(200).json(models);
  } catch (error) {
    next(error);
  }
};

export const getFilteredModels = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const limit: number = parseInt(req.query.limit as string) || 9;
    const startIndex: number = parseInt(req.query.startIndex as string) || 0;
    const query: any = {};

    // Handling each search parameters
    if (req.query.firstname) {
      query.firstname = { $regex: new RegExp(req.query.firstname, "i") };
    }
    if (req.query.lastname) {
      query.lastname = { $regex: new RegExp(req.query.lastname, "i") };
    }
    if (req.query.gender) {
      query.gender = req.query.gender;
    }
    if (req.query.dob) {
      const dob = new Date(req.query.dob);
      if (isNaN(dob.getTime())) {
        return res.status(400).json({ message: "Invalid date of birth" });
      }
      // query.dob = dob;
      // Set the start & end date to the beginning of the provided dob
      const startDate = new Date(dob);
      startDate.setUTCHours(0, 0, 0, 0);
      const endDate = new Date(dob);
      endDate.setUTCHours(23, 59, 59, 999);

      // Construct the query to match the range of dates
      query.dob = {
        $gte: startDate,
        $lte: endDate,
      };
    }
    if (req.query.profession) {
      query.profession = req.query.profession;
    }
    if (req.query.shoesize) {
      query.shoesize = parseInt(req.query.shoesize); //string to int
    }
    if (req.query.hairColor) {
      query.hairColor = parseInt(req.query.hairColor);
    }
    if (req.query.hairLength) {
      query.hairLength = parseInt(req.query.hairLength);
    }
    if (req.query.waistSize) {
      query.waistSize = parseInt(req.query.waistSize);
    }
    if (req.query.height) {
      query.height = parseInt(req.query.height);
    }
    if (req.query.weight) {
      query.weight = parseInt(req.query.weight);
    }
    if (req.query.castings) {
      query.castings = { $regex: new RegExp(req.query.castings, "i") };
    }

    const models = await DataModel.find(query).limit(limit).skip(startIndex);
    res.status(200).json(models);
  } catch (error) {
    next(error);
  }
};
