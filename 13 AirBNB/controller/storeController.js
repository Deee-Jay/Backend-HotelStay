const Home = require("../model/home");


exports.getIndex =  (req, res, next) => {
  Home.fetchAll((homes) => {  //callback twre
    res.render("store/index", {
      registeredHomes: homes,
      pageTitle: "idx",
      currentPage: "index",
    });
  });
};

exports.getHome = (req, res, next) => {
  Home.fetchAll((homes) => { 
    res.render("store/homeList", {
      registeredHomes: homes,
      pageTitle: "airbnb Home",
      currentPage: "Home",
    });
  });
};

exports.getBookings = (req, res, next) => {
  Home.fetchAll((homes) => { 
    res.render("store/bookings", {
      registeredHomes: homes,
      pageTitle: "Booking page",
      currentPage: "Bookings",
    });
  });
};




exports.getFavourite =  (req, res, next) => {
  Home.fetchAll((homes) => {  //callback twre
    res.render("store/favourite-list", {
      registeredHomes: homes,
      pageTitle: "FAV",
      currentPage: "favourite",
    });
  });
};

