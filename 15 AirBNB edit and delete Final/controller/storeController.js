const Favourite = require("../model/favourite");
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
  Favourite.getFavouriteHomes((favHomeList) => {
    Home.fetchAll((allHomes) => {
      const favouriteHomes = allHomes.filter(home => favHomeList.includes(home.homeID));
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "FAV",
        currentPage: "favourite",
      });
    })  
  })
};

exports.postAddToFavourite =  (req, res, next) => {
  Favourite.addToFavourite(req.body.id , (err) => {
    if(err) {
      console.log("LEIREMEE",err);
    }
    res.redirect("/favourites"); 
  })
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

exports.postDeleteFavourite = (req ,res ,next) => {
  Favourite.deleteFavouriteHome(req.body.id , err => {
    if(err) console.log('could not delete id');
    
    res.redirect("/favourites");
  })
}




