import { Router } from "express";
import multer from "multer";
import { registerEmployer, loginEmployer, logoutEmployer, getEmployer} from "../controllers/employer.controller.js";
import { verifyJWTEmployer } from "../middlewares/auth.middleware.js";


const router = Router()
const upload = multer()

//to register an employer using form data 
router.route("/register").post(upload.none(),registerEmployer)

router.route("/login").post(upload.none(),loginEmployer)

router.route("/logout").post(verifyJWTEmployer,logoutEmployer)

router.route("/getEmployer").get(verifyJWTEmployer, getEmployer)

export default router