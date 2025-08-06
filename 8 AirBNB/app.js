//core module
const express = require("express");

//local module
const hostRouter = require("./routes/hostRouter");
const userRouter = require("./routes/userRouter");



const app = express();

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host",hostRouter);

app.use((req,res,next)=> {
  res.status(404).send("<h1> ERROR 404 </h1>")
})


const PORT = 3004;
app.listen(PORT, () => {
  console.log(`our server is running at http://localhost:${PORT}`);
});
