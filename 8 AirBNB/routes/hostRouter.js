const path  = require("path");              // to use and find path we use this
const express = require("express");
const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next) => {
  // res.send(`
  //   <h1>Enter the Address of ur location</h1>
  //   <form action="/host/add-home" method = "POST">
  //   <input type="text" name="address">
  //   <input type="submit">
  //   </form>
  //   `)
  // direct html import twba yai like :
  res.sendFile(path.join(__dirname , '../' , 'views' , 'addHome.html'));
});

hostRouter.post("/add-home", (req, res, next) => {
  res.send(`
    <h1>Successfully added home</h1>
    `)
});

module.exports = hostRouter;

//we didnt use rootDir method
