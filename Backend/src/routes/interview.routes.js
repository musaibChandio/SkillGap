import { Router } from "express";
import authUser from "../middleware/auth.middleware.js";
import { generateInteViewReportController } from "../controllers/interview.controller.js";
import upload from "../middleware/file.middleware.js";
const interviewRouter = Router();

interviewRouter.post("/generate-report",authUser, upload.single('resume'), generateInteViewReportController);

export default interviewRouter;