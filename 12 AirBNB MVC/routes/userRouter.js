const express = require("express");
const userRouter = express.Router();


const homeController = require("../controller/home");

userRouter.get("/",homeController.getHome);

module.exports = userRouter;
