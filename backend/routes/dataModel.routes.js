import express from "express";
import {
  subscribeForm,
  getModels,
  getFilteredModels,
} from "../controllers/dataModel.controller.js";

const router = express.Router();

router.post("/subscribe", subscribeForm);
router.get("/all", getModels);
router.get("/search", getFilteredModels);
export default router;
