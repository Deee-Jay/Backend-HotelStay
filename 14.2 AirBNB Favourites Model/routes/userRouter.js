const express = require("express");
const userRouter = express.Router();

const homeController = require("../controller/storeController");

userRouter.get("/", homeController.getIndex);
userRouter.get("/home", homeController.getHome);
userRouter.get("/bookings" , homeController.getBookings);
userRouter.get("/favourites",homeController.getFavourite);
userRouter.get("/home/:homeIDY",homeController.getDetails);    // :homeIDY is variable

userRouter.post("/favourites",homeController.postAddToFavourite);


module.exports = userRouter;
