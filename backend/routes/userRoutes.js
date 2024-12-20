import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateTotalIncome,
  transferPoints,
  getNotifications,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.put("/transfer-points", protect, transferPoints);
router.get("/notifications", protect, getNotifications);
router.put("/total", protect, updateTotalIncome);
export default router;
