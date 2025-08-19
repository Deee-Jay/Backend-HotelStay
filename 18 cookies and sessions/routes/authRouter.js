// External Module
const express = require("express");
const authRouter = express.Router();

// Local Module
const authController = require("../controller/authController");

authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);
authRouter.post("/logout", authController.postLogout);
module.exports = authRouter;



//seperate Router js for handling login since login is neither specific to host nor user it is for all
