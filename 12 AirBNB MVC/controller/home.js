//Controller is used to seperate the logic between views(html) code and data stored 
//controller na data geido html da kamaina pini twni takke
//
const registeredHomes = [];


exports.getHome = (req, res, next) => {
  res.render("home", {
    registeredHomes: registeredHomes,
    pageTitle: "airbnb Home",
    currentPage: "Home",
  }); 
}

exports.getAddHome = (req, res, next) => {
  res.render("addHome", {
    pageTitle: "Add home to airBNB",
    currentPage: 'addHome',
  });
}

exports.postAddHome =  (req, res, next) => {
  registeredHomes.push(req.body);
  res.render("homeAdded", {
    pageTitle: "Home Added Successfully",
    currentPage: 'addHome',
  });
};



