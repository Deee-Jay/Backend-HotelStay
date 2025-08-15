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

exports.postFavourite =  (req, res, next) => { 
  console.log("here are ur favs" , req.body);
  res.redirect("/favourites");      //redirect twbani
}

exports.getDetails =  (req, res, next) => {
  
  let homeKaId = req.params.homeIDY;
  //find the home obj using id
  Home.findById(homeKaId , (HomeFound) => {
    if(!HomeFound) {
      res.redirect("/homes");
    }
    else {
      res.render("store/home-details", {
        pageTitle:"details of home",
        currentPage: "Home",
        HomeFound: HomeFound,
      })
    }
  })



};


