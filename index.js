"use strict";
require("dotenv").config();
const server = require("./src/server");

const { db } = require("./src/auth/models/index");

db.sync().then(() => {
  server.start(server.port);
});
