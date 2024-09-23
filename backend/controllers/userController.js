import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../Models/userModel.js";
const authUser = asyncHandler(async (req, res) => {
  const { pseudo, password } = req.body;

  const user = await User.findOne({ pseudo });

  if (user && (await user.matchPassword(password))) {
    const previousLastLogin = user.lastLogin;
    user.lastLogin = Date.now();
    await user.save();

    const createdByUserCount = await User.countDocuments({
      createdBy: user.pseudo,
    });

    const firstGenUsers = await User.find({ createdBy: user.pseudo });
    const firstGenUserPseudos = firstGenUsers.map((user) => user.pseudo);

    const secondGenUsers = await User.find({
      createdBy: { $in: firstGenUserPseudos },
    });
    const secondGenUserPseudos = secondGenUsers.map((user) => user.pseudo);
    const secondGenUserCount = secondGenUsers.length;

    const thirdGenUsers = await User.find({
      createdBy: { $in: secondGenUserPseudos },
    });
    const thirdGenUserPseudos = thirdGenUsers.map((user) => user.pseudo);
    const thirdGenUserCount = thirdGenUsers.length;

    const fourthGenUsers = await User.find({
      createdBy: { $in: thirdGenUserPseudos },
    });
    const fourthGenUserPseudos = fourthGenUsers.map((user) => user.pseudo);
    const fourthGenUserCount = fourthGenUsers.length;

    const fifthGenUsers = await User.find({
      createdBy: { $in: fourthGenUserPseudos },
    });
    const fifthGenUserPseudos = fifthGenUsers.map((user) => user.pseudo);
    const fifthGenUserCount = fifthGenUsers.length;

    const sixthGenUserCount = await User.countDocuments({
      createdBy: { $in: fifthGenUserPseudos },
    });

    const formattedLastLogin = user.lastLogin.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const formattedPreviousLastLogin = previousLastLogin
      ? previousLastLogin.toLocaleString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : null;

    generateToken(res, user._id);

    res.json({
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      pseudo: user.pseudo,
      email: user.email,
      tel: user.tel,
      points: user.points,
      createdBy: user.createdBy,
      createdAt: user.createdAt,
      allpoints: user.allpoints,
      pointstosend: user.pointstosend,
      lastLogin: formattedLastLogin,
      previousLastLogin: formattedPreviousLastLogin,
      createdByUserCount,
      secondGenUserCount,
      thirdGenUserCount,
      fourthGenUserCount,
      fifthGenUserCount, // Fifth-generation count
      sixthGenUserCount, // Sixth-generation count
    });
  } else {
    res.status(401);
    throw new Error("خطأ في إسم الحساب أو كلمة السر");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const {
    nom,
    prenom,
    cin,
    email,
    password,
    pseudo,
    tel,
    role,
    points,
    createdBy,
  } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("المستخدم موجود ");
  }

  // Check if it's the first user and assign 'admin' role
  const isFirstUser = (await User.countDocuments({})) === 0;
  const userRole = isFirstUser ? "admin" : role || "user"; // default role for others is "user"

  // Create the new user
  const user = await User.create({
    nom,
    prenom,
    cin,
    email,
    password,
    pseudo,
    createdBy,
    tel,
    points,
    role: userRole,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      cin: user.cin,
      email: user.email,
      pseudo: user.pseudo,
      createdBy: user.createdBy,
      tel: user.tel,
      points: user.points,
      allpoints: user.allpoints,

      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("بيانات المستخدم غير صالحة");
  }
});
const updateTotalIncome = asyncHandler(async (req, res) => {
  const { totalIncome } = req.body; // Get the total income from the request body
  const user = await User.findById(req.user._id); // Find the user based on the logged-in user's ID

  if (user) {
    user.points = totalIncome;
    await user.save(); // Save the updated user document

    res.json({
      message: "Total income updated successfully",
      points: user.points,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const transferPoints = async (req, res) => {
  try {
    const {
      senderPseudo,
      recipientId,
      pointsToTransfer,
      pointsToSending,
      password,
    } = req.body;

    // Find the sender by pseudo and the recipient by ID
    const sender = await User.findOne({ pseudo: senderPseudo });
    const recipient = await User.findById(recipientId);

    if (!sender || !recipient) {
      return res.status(404).json({ message: "Sender or recipient not found" });
    }

    // Confirm the sender's password before proceeding
    const isPasswordMatch = await sender.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Check if the sender has enough points to transfer
    if (sender.points < pointsToSending) {
      return res
        .status(400)
        .json({ message: "Insufficient points to transfer" });
    }

    // Update points for sender and recipient
    sender.points -= pointsToTransfer;
    recipient.points += pointsToTransfer;
    sender.pointstosend -= pointsToSending;
    recipient.pointstosend += pointsToSending;
    // Save both users
    await sender.save();
    await recipient.save();

    res.status(200).json({ message: "Points transferred successfully" });
  } catch (error) {
    console.error("Error transferring points:", error);
    res.status(500).json({ message: "Error transferring points" });
  }
};
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "تم تسجيل الخروج بنجاح" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      nom: user.nom,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("لم يتم العثور على المستخدم");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.nom = req.body.nom || user.nom;
    user.prenom = req.body.prenom || user.prenom;
    user.email = req.body.email || user.email;
    user.pseudo = req.body.pseudo || user.pseudo;
    user.tel = req.body.tel || user.tel;
    user.password = req.body.password || user.password;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      nom: updatedUser.nom,
      prenom: updatedUser.prenom,
      email: updatedUser.email,
      tel: updatedUser.tel,
      password: updatedUser.password,
    });
  } else {
    res.status(404);
    throw new Error("لم يتم العثور على المستخدم");
  }
});
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateTotalIncome,
  transferPoints,
};
