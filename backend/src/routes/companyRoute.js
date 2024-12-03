const express = require("express");
const {
  registerCompany,
  loginCompany,
  getProfile,
  getAllCompanies,
} = require("../controllers/companyController");
const {
  companyRegistrationValidator,
  loginValidator,
} = require("../helper/authValidator");
const { isLoggedCompany } = require("../middlewares/company");
const { isLogined, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.use(express.json());

// Route to register a new company
router.post("/register-company", companyRegistrationValidator, registerCompany);

router.post("/login-company", loginCompany);

router.get("/profile", isLoggedCompany, getProfile);

router.get("/companies", isLogined, isAdmin, getAllCompanies);


module.exports = router;
