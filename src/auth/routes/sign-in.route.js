"use strict";

const express = require("express");
const basicAuth = require("../middleware/basic");

const { UsersTable } = require("../models/index");

const router = express.Router();

router.post("/sign-in", basicAuth, async (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
