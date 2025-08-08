const path  = require("path");              // to use and find path we use this
const express = require("express");
const hostRouter = express.Router();

const rootDir = require("../utils/pathUtil"); 

hostRouter.get("/add-home", (req, res, next) => {
  //res.sendFile(path.join(__dirname , '../' , 'views' , 'addHome.html'));
  res.sendFile(path.join(rootDir , 'views' , 'addHome.html'));
});

hostRouter.post("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir , 'views' , 'homeAdded.html'))
});

module.exports = hostRouter;


