import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import moment from "moment"; // For formatting dates

const userSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    cin: {
      type: String,
      required: true,
      unique: true,
    },
    pseudo: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    tel: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    allpoints: {
      type: Number,
      default: 0,
    },
    pointstosend: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      default: true,
    },
    notifications: [
      {
        message: String,
        date: { type: Date, default: Date.now },
        isRead: { type: Boolean, default: false },
      },
    ],
    role: { type: String, default: "user" },
    lastLogin: {
      type: Date,
      default: null, // Default is null until the user logs in
    },
    createdAt: {
      type: String, // Storing as a string instead of Date
      default: () => moment().format("DD/MM/YYYY"),
    },
    updatedAt: {
      type: String, // Storing as a string instead of Date
      default: () => moment().format("DD/MM/YYYY"),
    },
  },
  {
    timestamps: false, // Disable default timestamps since we are customizing them
  }
);

// Update the `updatedAt` field before each save
userSchema.pre("save", function (next) {
  this.updatedAt = moment().format("DD/MM/YYYY");
  next();
});

// Match user-entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.updateLastLogin = async function () {
  this.lastLogin = new Date();
  await this.save();
};
const User = mongoose.model("User", userSchema);
export default User;
