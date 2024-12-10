import { Router } from "express";
import { postJobs, getAllJobs, searchJobs} from "../controllers/job.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/postJobs").post(upload.none(),postJobs)
router.route("/").get(getAllJobs)
router.route("/search").post(upload.none(),searchJobs)

export default router