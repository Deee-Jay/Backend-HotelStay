//core module
const path = require("path");

//external module
const express = require("express");

const DB_PATH = "mongodb+srv://sana:sana@deecluster.rps2fdq.mongodb.net/?retryWrites=true&w=majority&appName=DeeCluster";
const multer = require('multer');
const { default: mongoose } = require('mongoose');

//local module

const rootDir = require("./utils/pathUtil");
const homeController = require("./controller/error");


const app = express();


app.use(express.urlencoded());  //use for handling url encoded or text da lkpa


app.use(homeController.error);

const PORT = 3009;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});