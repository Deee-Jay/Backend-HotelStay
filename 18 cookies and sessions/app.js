//core module
const express = require("express");

//external module
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);  //both adding module and creating a class called MOngoDBstore
const DB_PATH = "fill this";

//local module
const hostRouter = require("./routes/hostRouter");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");

const path = require("path");
const rootDir = require("./utils/pathUtil");
const homeController = require("./controller/error");

const { default: mongoose } = require('mongoose');




const app = express();

app.set("view engine", "ejs"); 
app.set("views", "views"); 

app.use(express.urlencoded());
const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
});
// make a collection called session in our MongoDB


app.use(session({
  secret: "dsadsadsadg", 
  resave: false,
  saveUninitialized: true,
  store: store,
}));

app.use((req,res,next) => {
  // req.isLoggedIn = req.get('Cookie')?.split('=')[1] || false;
  // console.log(req.isLoggedIn);
  // next();
  
  req.isLoggedIn = req.session.isLoggedIn;
  next();

});

app.use(userRouter);
//in our website people can directly go http://localhost:3009/favourites and see the page even after the nav is not showed or not log in used
//we can tackle this problem by doing this
app.use("/host", (req, res , next) => {
  if(req.isLoggedIn) {
    next();
  }
  else {
    res.redirect('/');
  }
})
app.use("/host", hostRouter);
app.use(authRouter);



app.use(express.static(path.join(rootDir, "public")));

app.use(homeController.error);

const PORT = 3009;


//mongoose connection and no need for databaseUTil anymore
mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});