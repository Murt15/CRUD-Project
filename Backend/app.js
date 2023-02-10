//Importing the Packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//importing Record routes from routes folder
const recordRoutes = require("./routes/crudroutes");

dotenv.config();
//initializing express
const app = express();
//cors middleware
app.use(cors());
//body parser
app.use(bodyParser.json({ extended: false }));
//using the app routes
app.use(recordRoutes);
//connecting to the mongoose database and then initializing server
mongoose
  .connect(process.env.URL)
  .then(() => {
    app.listen(4000);
  })
  .then(() => console.log("server started"))

  .catch((err) => console.log(err));
// console.log(process.env.URL);
