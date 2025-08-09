//core module
const express = require("express");

//local module
const  { hostRouter } = require("./routes/hostRouter");
const userRouter = require("./routes/userRouter");

const path = require("path");     
const rootDir = require("./utils/pathUtil");   



const app = express();

app.set('view engine','ejs');   //to use EJS 
app.set('views','views')    //EJS kaha lagana he

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host",hostRouter);

//for adding css publically
app.use(express.static(path.join(rootDir,'public')));

app.use((req,res,next)=> {
  res.status(404).render('404', {pageTitle: 'Page Not Found'});
})


const PORT = 3004;
app.listen(PORT, () => {
  console.log(`our server is running at http://localhost:${PORT}`);
});
