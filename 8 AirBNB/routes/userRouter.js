const express = require("express");
const userRouter = express.Router();

const path = require("path");     //to yse path
const rootDir = require("../utils/pathUtil");   //to get the home path


userRouter.get("/", (req, res, next) => {
  // res.send(`
  //   <h1>Welcome to airBNB </h1>
  //   <a href="/host/add-home"> go and list ur home </a>
  //   `)
  res.sendFile(path.join(rootDir , 'views' , 'home.html'))
});

module.exports = userRouter;



//here rootDir used
//another one no rootDir used