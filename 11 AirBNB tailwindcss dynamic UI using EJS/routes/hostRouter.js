const path  = require("path");              // to use and find path we use this
const express = require("express");
const hostRouter = express.Router();

const rootDir = require("../utils/pathUtil"); 

hostRouter.get("/add-home", (req, res, next) => {
  //res.sendFile(path.join(rootDir , 'views' , 'addHome.html'));
  res.render("addHome",{pageTitle :"Add home to airBNB"})
});

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  registeredHomes.push(req.body);
  //res.sendFile(path.join(rootDir , 'views' , 'homeAdded.html'));
  res.render("homeAdded",{pageTitle: 'Home Added Successfully'})
  
});

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;   //to be used by ejs


