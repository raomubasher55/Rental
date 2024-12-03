const express = require("express");
const router = express();
const path = require("path");
const multer = require("multer");
const userController = require("../controllers/authController");
const { signupValidator, loginValidator } = require("../helper/authValidator");
const { isLogined, isAdmin } = require("../middlewares/auth");
router.use(express.json());

router.post("/register", signupValidator, userController.signupUser);
router.post("/login", loginValidator, userController.loginUser);

//authenticatied routes
router.get("/profile", isLogined, userController.userProfile);
router.get("/all-users", isLogined, isAdmin, userController.getAllUser);
router.get(
  "/all-companies",
  isLogined,
  isAdmin,
  userController.getAllCompanies
);
router.post("/refreshToken", isLogined, userController.refreshToken);
router.get("/logout", isLogined, userController.logout);
module.exports = router;
