const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const URL = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.curjvmw.mongodb.net/`;
const bcrypt = require("bcrypt");

const expense = async (req, res) => {
  try {
    //Connect Mongodb
    const connection = await mongoclient.connect(URL);
    //select db
    const db = await connection.db("money_manager");
    //select collection
    const collection = await db.collection("app_users");
    //Do CRUD Operation
    console.log(req.body)
    const Updateuserdata = await collection.updateOne(
      { email: res.locals.email },
      { $addToSet: { expense_and_income: req.body } }
    );

    //close connection
    await connection.close();

    res.json({ message: "User Inserted" });
  } catch (error) {
    console.log("Error", error);
    res.json({ error: "Something went wrong" });
  }
};

module.exports = expense;
