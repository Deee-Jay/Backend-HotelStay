const express = require("express");
const userRouter = express.Router();

   
const { registeredHomes } = require("./hostRouter");




userRouter.get("/", (req, res, next) => {
  res.render('home',{registeredHomes: registeredHomes ,
   pageTitle: 'airbnb Home',
  });           // home.ejs , variable
});

module.exports = userRouter;
