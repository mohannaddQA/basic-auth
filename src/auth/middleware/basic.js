"use strict";

const base64 = require("base-64");
const bcrypt = require("bcrypt");
const { UsersTable } = require("../models/index");

const basicAuth = async (request, response, next) => {
  // check to see if headers has authorization
  if (!request.headers.authorization) {
    // if no headers.authorization, send 401 error
    response.send(401).send("MISSING AUTHORIZATION CREDENTIALS");
    return;
  }

  // if headers.authorization does exist, begin process of decoding
  // encoded string will be in a format of 'Basic username:password'
  // split string on space to isolate the encoded username:password
  let encodedAuthorizationCredentials =
    request.headers.authorization.split(" ")[1];

  // decode the username:password
  let decodedCredentials = base64.decode(encodedAuthorizationCredentials);
  // split decoded credentials on ':', everything to the left of the ':' is the username and everything to the right is the password
  let [decodedUserName, decodedPassword] = decodedCredentials.split(":");

  try {
    request.user = await UsersTable.authenticateUser(
      decodedUserName,
      decodedPassword
    );
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = basicAuth;
