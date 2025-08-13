const express = require("express");
const hostRouter = express.Router();

const homeController = require("../controller/hostControler");

hostRouter.get("/add-home", homeController.getAddHome);
hostRouter.post("/add-home", homeController.postAddHome);
hostRouter.get("/host-homes", homeController.getHostHomes);


module.exports = hostRouter;
