import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateTotalIncome,
  transferPoints,
  getNotifications, // Import the new controller function
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.put("/transfer-points", transferPoints);
router.put("/total", protect, updateTotalIncome);

// New route for fetching notifications
router.get("/notifications", protect, getNotifications);

export default router;
