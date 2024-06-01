
import express from "express";
import {becomeVolunteerController,getNewVolunteers} from "../controllers/becomeVolunteerController.js";
const router = express.Router();
router.post("/info",becomeVolunteerController);
router.get("/info",getNewVolunteers);
export default router;