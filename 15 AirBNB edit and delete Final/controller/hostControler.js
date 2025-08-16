const Home = require("../model/home");
const { error } = require("./error");

exports.getHome = (req, res, next) => {
  Home.fetchAll((homes) => {
    //callback twre
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
    toEdit : false,
  });
};

// Edit home but the same UI as Add home
exports.getEditHome = (req, res, next) => {
  const homeToEditID = req.params.homeID;
  const toEdit = req.query.editing === "true"; //req.query.editing gives a string 'true' hence we change it into bool true
  // but why do we use toEdit --> so that since we use the same UI 2times one for add-home and one for edit-home hence we use toEdit to differentiate them

  Home.findById(homeToEditID, (home) => {
    if (!home) {
      res.redirect("/host/host-homes");
      console.log("not found");
    } else {
      res.render("host/edit-home", {
        home: home,
        pageTitle: "Edit Home",
        currentPage: "host-homes",
        toEdit: toEdit,
      });
    }
  });
};

exports.getHostHomes = (req, res, next) => {
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

  res.redirect("/host/host-homes");
};

exports.postUpdateHome =  (req, res, next) => {
  // const home = new Home(
  //   req.body.houseName,
  //   req.body.houseLocation,
  //   req.body.housePrice,
  //   req.body.houseRating,
  //   req.body.housePhotos
  // );
  const { id ,houseName , houseLocation , housePrice , houseRating , housePhotos} = req.body;
  const home = new Home( houseName , houseLocation , housePrice , houseRating , housePhotos );
  home.homeID = id;
  console.log(home);
  home.save(); 

  res.redirect("/host/host-homes");
};

exports.postDeleteHome = (req, res, next) => { 
  const deleteID = req.params.homeID;
  Home.deleteById(deleteID , error => {
    if(error) console.log("error while deleting");

    res.redirect("/host/host-homes");
  })
}

