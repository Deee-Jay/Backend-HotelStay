const express = require("express");
const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next) => {
  res.render("addHome", {
    pageTitle: "Add home to airBNB",
    currentPage: 'addHome',
  });
});

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  registeredHomes.push(req.body);
  res.render("homeAdded", {
    pageTitle: "Home Added Successfully",
    currentPage: 'addHome',
  });
});

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes; //to be used by ejs
