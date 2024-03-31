import express from "express";
import { subscribeForm } from "../controllers/submission.controller.js";

const router = express.Router();

router.post("/subscribe", subscribeForm);
export default router;
