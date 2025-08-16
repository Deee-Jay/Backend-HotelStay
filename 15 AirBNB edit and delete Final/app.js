//core module
const express = require("express");

//local module
const hostRouter = require("./routes/hostRouter");
const userRouter = require("./routes/userRouter");

const path = require("path");     
const rootDir = require("./utils/pathUtil");   
const homeController = require("./controller/error");  //


const app = express();

app.set('view engine','ejs');   //to use EJS 
app.set('views','views')    //EJS kaha lagana he

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

//for adding css publically
app.use(express.static(path.join(rootDir,'public')));

app.use(homeController.error);


const PORT = 3007;
app.listen(PORT, () => {
  console.log(`our server is running at http://localhost:${PORT}`);
});
