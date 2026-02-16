import express from "express";
import { verifyUser } from "../middleware/verifyUser.js";
import { upload } from "../middleware/uploadMiddleware.js";
import {
  createListing,
  updateListing,
  deleteListing,
  getMyListings,
  getAllListings,
  getSingleListing
} from "../controllers/Listing.js";
const router = express.Router();

router.post("/upload", verifyUser, upload.single("images"), createListing);
router.put("/update/:id", verifyUser, upload.single("images"), updateListing);
router.delete("/delete/:id", verifyUser, deleteListing);
router.get("/get-single/:id", getSingleListing);
router.get("/get-my-listings", verifyUser, getMyListings);
router.get("/get-all-listings", getAllListings);

export default router;
