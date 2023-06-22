"use strict";

const express = require("express");
const bcrypt = require("bcryptjs");

const { UsersTable } = require("../models/index");

const router = express.Router();
// router.get("/register", (req, res) => {
//   res.send(UsersTable.findAll());
// });
router.post("/register", registerUser);

async function registerUser(req, res) {
  try {
    const record = await UsersTable.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(403).send("Error Creating User");
  }
}
router.get("/register", (req, res) => {
  res.send(UsersTable);
});
module.exports = router;
