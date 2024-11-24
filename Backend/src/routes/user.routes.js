import { Router } from "express";
import { loginUser, registerUser , logoutUser} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

//Redo the code below
router.route("/register").post(
    upload.fields([
        {
            name: 'profileImage', maxCount: 1
        },
        {
            name: 'resume', maxCount: 1
        }
    ]), registerUser
)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT,logoutUser)



export default router