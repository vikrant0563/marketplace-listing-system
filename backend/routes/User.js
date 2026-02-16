import express from "express";
import { registerUser,loginUser,getCurrentUser, logoutUser } from "../controllers/User.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/register-user",registerUser);
router.post("/login",loginUser);
router.post("/logout",verifyUser,logoutUser);
router.get("/me", verifyUser, getCurrentUser);
export default router;