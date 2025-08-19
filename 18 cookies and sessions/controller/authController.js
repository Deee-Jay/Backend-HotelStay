exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res, next) => {
  //req.cookie("isLoggedIn",true);
  req.session.isLoggedIn = true;
  res.redirect("/");
}

//using req and session together even tho req. is used to give us client info
// Reality => req gives client info + server side tool like session
//hence req.session creates a session in our server side 


exports.postLogout = (req, res, next) => {
  //req.cookie("isLoggedIn",false);
  req.session.destroy(() => {
    res.redirect("/login");
  })
}
