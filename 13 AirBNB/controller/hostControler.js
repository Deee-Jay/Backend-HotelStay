const Home = require("../model/home");

exports.getHome = (req, res, next) => {
  Home.fetchAll((homes) => {  //callback twre
    res.render("store/homeList", {
      registeredHomes: homes,
      pageTitle: "airbnb Home",
      currentPage: "Home",
    });
  });
};

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add home to airBNB",
    currentPage: "addHome",
  });
};

exports.getHostHomes = (req, res, next) => {
  console.log("dsadsadsad");
  Home.fetchAll((homes) =>
    res.render("host/hostHome", {
      registeredHomes: homes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  );
};


exports.postAddHome = (req, res, next) => {
  const home = new Home(
    req.body.houseName,
    req.body.houseLocation,
    req.body.housePrice,
    req.body.houseRating,
    req.body.housePhotos
  );
  home.save(); //saving in our database

  res.render("host/homeAdded", {
    pageTitle: "Home Added Successfully",
    currentPage: "addHome",
  });
};




