"use strict";
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

//-----------------------------------requirements------------------------------------
// these are the abstract models of the tables we want to create.
const UsersModel = require("./users.model");

//---------------------------------******************----------------------------------
/*==============seting up a database connection using Sequelize============= */

const POSTGRES_URI =
  process.env.NODE_ENV === "test"
    ? "sqlite::memory:"
    : process.env.DATABSAE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production" // this is production , it won't work locally , so if you try npm start it won't work
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};
const sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

//-----------------------------------creating the tables by sequalize--------------------------------------------------------
//==============================these function calls will create the tables ====================================
/* note that not all tables need to be created in a collection class.
this depends on if we want to do the same methods to the same tables , like in the case of crud  */
const UsersTable = UsersModel(sequelize, DataTypes);

//=======================================================================================================
//-----------------------------------------******************---------------------------------------------------------------

module.exports = {
  db: sequelize,
  UsersTable: UsersTable,
};
