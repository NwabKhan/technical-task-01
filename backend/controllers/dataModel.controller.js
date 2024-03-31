import Model from "../models/dataModel.model.js";

export const subscribeForm = async (req, res, next) => {
  try {
    const model = new Model(req.body);
    await model.save();
    res.status(201).json({
      message: "Data saved succesfully!",
    });
  } catch (error) {
    next(error);
  }
};

//Get all models on Route /api/models/all
export const getModels = async (req, res, next) => {
  try {
    const models = await Model.find({});
    if (!models) {
      return next(404, "Model not found!");
    }
    res.status(200).json(models);
  } catch (error) {
    next(error);
  }
};

//get filtered Models on route /api/models/search
export const getFilteredModels = async (req, res, next) => {
  try {
    // For sending the limited(9) models to frontend
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const query = {};

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

    const models = await Model.find(query).limit(limit).skip(startIndex);

    return res.status(200).json(models);
  } catch (error) {
    next(error);
  }
};
