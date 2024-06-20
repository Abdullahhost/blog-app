import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      minLength: [4, "Name should be at least 4 charecters"],
      maxLenght: [30, "Name should be less then 30 charecters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid Email Address",
      ],
    },
    password: {
      type: String,
      default: "123456"
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
