const express = require("express");
const hostRouter = express.Router();

const homeController = require("../controller/hostControler");

hostRouter.get("/add-home", homeController.getAddHome);
hostRouter.post("/add-home", homeController.postAddHome);
hostRouter.get("/host-homes", homeController.getHostHomes);

hostRouter.get("/edit-home/:homeID", homeController.getEditHome);
// this router is for when we click edit in our Host Home
//  <a  href="/host/edit-home/<%= home.homeID%>/ ?editing=true"
// this is in our hostHome.ejs so ?editing=true is a query we dont need to add query while doing routing

hostRouter.post("/edit-home", homeController.postUpdateHome);
hostRouter.post("/delete-home/:homeID",homeController.postDeleteHome);

module.exports = hostRouter;
