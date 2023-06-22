"use strict";
const bcrypt = require("bcryptjs");
const UsersModel = (sequelize, DataTypes) => {
  //this is the best practice so that if we want to do modifications on the model and add stuff to it like bellow we can but we have to return it
  const UsersModel = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.STRING, //we will not save a bassword in the db  , we will save the hashed version of the encrypted password
        allowNull: false,
      },
      // email: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   unique: true,
      //   validate: {
      //     //this here will validate if the entered is a true email , check validation in sequalize
      //     isEmail: true,
      //   },
      // },
    },
    {
      freezeTableName: true, //some times , dequalise changes the name to plural , this will prevent it
    }
  );

  // this function will get applyed before the creation of the new user coloumn
  // read more about sequalize hooks //
  // in the lab we took another approch ==> do the hashing on the signup
  UsersModel.beforeCreate(async (user) => {
    let hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return user.password;
  });

  //what we did here is kind of adding a method ==> this not a very accurate explaination ==>{this is allowed because of sequalize ,it will take the created table as an object and ann methodes to it }
  UsersModel.authenticateUser = async (username, password) => {
    // query the database, find if database username === username from request
    let foundUser = await UsersModel.findOne({ where: { username: username } });
    // if a username is found, compare saved password to password from request
    let isAuthenticated = await bcrypt.compare(password, foundUser.password);

    if (isAuthenticated) {
      return foundUser;
    } else {
      throw new Error("Invalid credentials");
    }
  };

  return UsersModel; //we must return model so that the function gets executed and return the value , in previos lab we didn't have to return it becuse we didn't assign the function call to a variable so it automatically returned since it's arrow function
};

module.exports = UsersModel;

// here we defined the function that ==> when executed in the index creates user table in the db
