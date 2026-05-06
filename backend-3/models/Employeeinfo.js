import { Schema, model } from "mongoose";

const empSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of employee is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email of employee is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    mobile: {
      type: String,
      trim: true,
    },

    designation: {
      type: String,
      required: [true, "Designation of employee is required"],
      trim: true,
    },

    companyName: {
      type: String,
      required: [true, "Name of company is required"],
      trim: true,
    },
  },
  {
    strict: "throw",
    versionKey: false,
    timestamps: true,
  }
);

// export model
export const EmpModel = model("emp", empSchema);