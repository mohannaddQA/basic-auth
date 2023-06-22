"use strict";
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
//-----------------------------------requirements------------------------------------
// const clothesRouter = require("./routes/clothes");
const registerRouter = require("./auth/routes/register.route");
const singInRouter = require("./auth/routes/sign-in.route");
const internalError = require("./error-handlers/500");
const pageNotFound = require("./error-handlers/404");

//---------------------------------******************----------------------------------
//---------------------------------global middlewares----------------------------------
// Allows us to 'talk' to other websites
app.use(cors());
// Process JSON input and put the data on req.body
app.use(express.json());
// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));
//---
app.use(registerRouter);
app.use(singInRouter);

//---------------------------------******************----------------------------------
//----------------------------------------routes---------------------------------------
app.get("/", (req, res) => {
  res.status(200).send("welcome to the server, please sign in to continue");
});

//---------------------------------******************----------------------------------

//---------------------------------error middlewares---------------------------------- must be after the routes
app.use(internalError);
app.use("*", pageNotFound);
//--------------------------------******************----------------------------------

function start(port) {
  app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
}

// when the index requires this file it will only see these
module.exports = {
  port: port, //i'm sending the port as an export to the index
  app: app,
  start: start, // i'm sending the start function to the index
};
