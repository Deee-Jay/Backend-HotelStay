const express = require("express");
const userRouter = express.Router();

const { registeredHomes } = require("./hostRouter");

userRouter.get("/", (req, res, next) => {
  res.render("home", {
    registeredHomes: registeredHomes,
    pageTitle: "airbnb Home",
    currentPage: "Home",
  }); // home.ejs , variables
});

module.exports = userRouter;
