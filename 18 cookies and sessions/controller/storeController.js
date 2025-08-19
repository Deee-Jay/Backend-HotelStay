const { default: mongoose } = require("mongoose");
const Favourite = require("../model/favourite");
const Home = require("../model/home");

exports.getIndex = (req, res, next) => {
  Home.find().then((homes) => {
    //.then for after recieving the promise (we get our homes array)
    res.render("store/index", {
      registeredHomes: homes,
      pageTitle: "idx",
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getHome = (req, res, next) => {
  Home.find().then((homes) => {
    res.render("store/homeList", {
      registeredHomes: homes,
      pageTitle: "airbnb Home",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getBookings = (req, res, next) => {
  Home.find().then((homes) => {
    res.render("store/bookings", {
      registeredHomes: homes,
      pageTitle: "Booking page",
      currentPage: "Bookings",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getDetails = (req, res, next) => {
  const homeKaId = req.params.homeIDY;
  
  // Validate if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(homeKaId)) {
    return res.redirect('/homes');
  }

  Home.findById(homeKaId)
    .then((HomeFound) => {
      if (!HomeFound) {
        res.redirect("/homes");
      } else {
        res.render("store/home-details", {
          pageTitle: "details of home",
          currentPage: "Home",
          HomeFound: HomeFound,
          isLoggedIn: req.isLoggedIn,
        });
      }
    })
    .catch(err => {
      console.log('Error fetching home details:', err);
      res.redirect("/homes");
    });
};

exports.getFavourite = (req, res, next) => {
  Favourite.find()
    .populate("houseId")
    .then((favourites) => {
      const favouriteHomes = favourites.map((fav) => fav.houseId);
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
        isLoggedIn: req.isLoggedIn,
      });
    });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.findOne({ houseId: homeId })   //finding by a different parameter like houseName etc
    .then((fav) => {
      if (fav) {
        console.log("Already marked as favourite");
      } else {
        fav = new Favourite({ houseId: homeId });
        fav.save().then((result) => {
          console.log("Fav added: ");
        });
      }
      res.redirect("/favourites");
    })
    .catch((err) => {
      console.log("Error while marking favourite: ", err);
    });
};

exports.postDeleteFavourite = (req, res, next) => {
  const homeID = req.body.id;
  Favourite.findOneAndDelete({ houseId: homeID })
    .then((result) => {
      console.log("Fav Removed: ");
    })
    .catch((err) => {
      console.log("Error while removing favourite: ", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};
