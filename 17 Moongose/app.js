//core module
const express = require("express");

//local module
const hostRouter = require("./routes/hostRouter");
const userRouter = require("./routes/userRouter");

const path = require("path");
const rootDir = require("./utils/pathUtil");
const homeController = require("./controller/error");

const { default: mongoose } = require('mongoose');


const app = express();

app.set("view engine", "ejs"); //to use EJS
app.set("views", "views"); //EJS kaha lagana he

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

//for adding css publically
app.use(express.static(path.join(rootDir, "public")));

app.use(homeController.error);

const PORT = 3009;
const DB_PATH = "fillon";

//mongoose connection and no need for databaseUTil anymore
mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});