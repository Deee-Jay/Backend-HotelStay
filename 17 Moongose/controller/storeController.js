const Favourite = require("../model/favourite");
const Home = require("../model/home");

exports.getIndex = (req, res, next) => {
  Home.find().then((homes) => {
    //.then for after recieving the promise (we get our homes array)
    res.render("store/index", {
      registeredHomes: homes,
      pageTitle: "idx",
      currentPage: "index",
    });
  });
};

exports.getHome = (req, res, next) => {
  Home.find().then((homes) => {
    res.render("store/homeList", {
      registeredHomes: homes,
      pageTitle: "airbnb Home",
      currentPage: "Home",
    });
  });
};

exports.getBookings = (req, res, next) => {
  Home.find().then((homes) => {
    res.render("store/bookings", {
      registeredHomes: homes,
      pageTitle: "Booking page",
      currentPage: "Bookings",
    });
  });
};

exports.getDetails = (req, res, next) => {
  let homeKaId = req.params.homeIDY;
  console.log(req.params);
  
  Home.findById(homeKaId).then((HomeFound) => { //find by using the system generated _id
    if (!HomeFound) {
      res.redirect("/homes");
    } else {
      res.render("store/home-details", {
        pageTitle: "details of home",
        currentPage: "Home",
        HomeFound: HomeFound,
      });
    }
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
          console.log("Fav added: ", result);
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
      console.log("Fav Removed: ", result);
    })
    .catch((err) => {
      console.log("Error while removing favourite: ", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};
