const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { application } = require("express");

const companyRegistrationSchema = new mongoose.Schema({
  referenceName: {
    type: String,
    required: true,
    trim: true,
  },
  cranes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Crane", // Reference the Crane model
    },
  ],
//   rentals: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "userRental",
//     },
//   ],
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10,}$/, "Please enter a valid phone number"],
  },
  whatsappNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10,}$/, "Please enter a valid WhatsApp number"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

companyRegistrationSchema.index({ location: "2dsphere" }); // Geospatial index for geospatial queries

// Pre-save hook to hash password and check if passwords match
companyRegistrationSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = undefined; // No need to store confirmPassword in the DB

  next();
});

const Company = mongoose.model("Company", companyRegistrationSchema);

module.exports = Company;
