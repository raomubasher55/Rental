const { validationResult } = require("express-validator");
const Company = require("../models/Company");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Create a new company registration
exports.registerCompany = async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(200).json({
          success: false,
          msg: "Errors",
          errors: errors.array(),
        });
      }
  
      // Extract fields from request body
      const {
        referenceName,
        companyName,
        email,
        phoneNumber,
        whatsappNumber,
        password,
        city,
        address,
        latitude,
        longitude,
      } = req.body;
  
      // Check if company already exists
      const isExist = await Company.findOne({ email });
      if (isExist) {
        return res.status(400).json({
          success: false,
          message: "Company already registered",
        });
      }
  
      // Create a new company with location
      const newCompany = new Company({
        referenceName,
        companyName,
        email,
        phoneNumber,
        whatsappNumber,
        password,
        city,
        address,
        location: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)], // Ensure correct format [longitude, latitude]
        },
      });
  
      // Save the company to the database
      await newCompany.save();
      res.status(201).json({
        success: true,
        message: "Company registered successfully",
        data: newCompany,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error registering company",
        error: error.message,
      });
    }
  };
  
  // Company login controller
  exports.loginCompany = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the company exists
      const company = await Company.findOne({ email });
      if (!company) {
        return res
          .status(404)
          .json({ success: false, message: "Company not found" });
      }
  
      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, company.password);
      // if (!isMatch) {
      //   return res
      //     .status(400)
      //     .json({ success: false, message: "Invalid credentials" });
      // }
  
      // Create a JWT token
      const token = jwt.sign(
        { companyId: company._id, companyName: company.companyName },
        process.env.COMPANY_ACCESS_SECRET_TOKEN,
        { expiresIn: "30d" }
      );
  
      // Send response with token
      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        company: {
          id: company._id,
          companyName: company.companyName,
          email: company.email,
          phoneNumber: company.phoneNumber,
          whatsappNumber: company.whatsappNumber,
          city: company.city,
          address: company.address,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error logging in",
        error: error.message,
      });
    }
  };
  
  // Get all registered companies
  exports.getAllCompanies = async (req, res) => {
    try {
      const companies = await Company.find({});
      res
        .status(200)
        .json({ message: "Companies retrieved successfully", data: companies });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving companies", error });
    }
  };

  exports.getProfile = async (req, res) => {
    try {
      const companyId = req.company.companyId;
  
      // Find company and populate the rentals field
      const company = await CompanyRegistration.findById(companyId).populate(
        "rentals"
      );
  
      if (!company) {
        return res.status(404).json({
          success: false,
          message: "Company not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Company profile",
        company,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };