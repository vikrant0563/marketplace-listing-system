import express from "express";

import { createCatagory,getAllCategories } from "../controllers/Catagory.js";

const router = express.Router();

router.post("/create-catagory",createCatagory);
router.get("/get-all-category",getAllCategories);

export default router;