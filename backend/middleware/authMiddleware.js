import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the token exists in the authorization header or cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by decoded token ID
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("المستخدم غير موجود");
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error("غير مصرح به، خطأ في المصادقة");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("غير مصرح به، لا يوجد رمز مميز");
  }
});

export { protect };
