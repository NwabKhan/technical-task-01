import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  picture: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  profession: {
    type: String,
    enum: ["commedian", "actor", "actress", "model"],
    required: true,
  },
  shoesize: { type: Number, required: true },
  hairColor: { type: Number, required: true },
  hairLength: { type: Number, required: true },
  waistSize: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  castings: {
    type: String,
    enum: ["movies", "commercials", "newspapers", "magazines"],
    required: true,
  },
});

const Form = mongoose.model("Form", formSchema);

export default Form
