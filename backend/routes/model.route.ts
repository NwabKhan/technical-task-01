import express from "express";
import {
  subscribeForm,
  getModels,
  getFilteredModels,
} from "../controllers/model.controller.ts";

const router = express.Router();

router.post("/subscribe", subscribeForm);
router.get("/all", getModels);
router.get("/search", getFilteredModels);

export default router;
