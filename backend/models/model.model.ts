import mongoose, { Schema, Document, Model } from "mongoose";

export interface IModel extends Document {
  firstname: string;
  lastname: string;
  picture: string;
  gender: string;
  dob: Date;
  profession: "commedian" | "actor" | "actress" | "model";
  shoesize: number;
  hairColor: number;
  hairLength: number;
  waistSize: number;
  height: number;
  weight: number;
  castings: "movies" | "commercials" | "newspapers" | "magazines";
}

const modelSchema: Schema<IModel> = new Schema({
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

const DataModel: Model<IModel> = mongoose.model<IModel>(
  "DataModel",
  modelSchema
);

export default DataModel;
