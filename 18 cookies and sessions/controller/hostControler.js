const Home = require("../model/home");
const { error } = require("./error");

exports.getHome = (req, res, next) => {
  Home.find().then((homes) => {
    res.render("store/homeList", {
      registeredHomes: homes,
      pageTitle: "airbnb Home",
      currentPage: "Home",
    });
  });
};

//normal Add home
exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add home to airBNB",
    currentPage: "addHome",
    toEdit: false,
    isLoggedIn: req.isLoggedIn,
  });
};

// Edit home but the same UI as Add home
exports.getEditHome = (req, res, next) => {
  const homeToEditID = req.params.homeID;
  const toEdit = req.query.editing === "true"; //req.query.editing gives a string 'true' hence we change it into bool true
  // but why do we use toEdit --> so that since we use the same UI 2times one for add-home and one for edit-home hence we use toEdit to differentiate them

  Home.findById(homeToEditID).then((home) => {
    if (!home) {
      res.redirect("/host/host-homes");
      console.log("not found");
    } else {
      res.render("host/edit-home", {
        home: home,
        pageTitle: "Edit Home",
        currentPage: "host-homes",
        toEdit: toEdit,
        isLoggedIn: req.isLoggedIn,
      });
    }
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((homes) =>
    res.render("host/hostHome", {
      registeredHomes: homes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
    })
  );
};

exports.postAddHome = (req, res, next) => {
  const { houseName, houseLocation, housePrice, houseRating, housePhotos } =
    req.body;

  const home = new Home({
    // we add one extra  { } since for mongoose we need to pass an object unlike mongoDB
    houseName,
    houseLocation,
    housePrice,
    houseRating,
    housePhotos,
  });
  home.save().then(() => {
    console.log("saved in our database");
  });
  //save() fxn already a predefined function that comes in every model , we dont need to define it by ourseleves

  res.redirect("/host/host-homes");
};

exports.postUpdateHome = (req, res, next) => {
  const { id, houseName, houseLocation, housePrice, houseRating, housePhotos } = req.body;
  
  Home.findById(id).then((home) => {
    home.houseName = houseName;
    home.housePrice =housePrice;
    home.houseLocation =houseLocation;
    home.houseRating=houseRating;
    home.housePhotos = housePhotos;
  
    home.save().then((result) => {
      console.log("Home updated ");
    }).catch(err => {
      console.log("Error while updating ", err);
    })
    res.redirect("/host/host-homes");
  }).catch(err => {
    console.log("Error while finding home ", err);
  });
};

exports.postDeleteHome = (req, res, next) => {
  // const deleteID = req.params.homeID;
  // Home.deleteById(deleteID).then(() => {
  //   res.redirect("/host/host-homes");
  // });
  const deleteID = req.params.homeID;
  console.log("Came to delete ", deleteID);
  Home.findByIdAndDelete(deleteID)
    .then(() => {
      res.redirect("/host/host-homes");
    })
    .catch((error) => {
      console.log("Error while deleting ", error);
    });
};
