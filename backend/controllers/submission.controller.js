import Form from "../models/form.model.js";

export const subscribeForm = async (req, res, next) => {
  try {
    const data = new Form(req.body);
    await data.save();
    res.status(201).json({
      message: "Data saved succesfully!",
    });
  } catch (error) {
    next(error);
  }
};
