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
    const collection = await db.collection("transactions");
    //Do CRUD Operation
    console.log(req.body);
    const transcations = await collection.insertOne({
      amount: req.body.amount,
      type: req.body.type,
      category: req.body.category,
      date: req.body.date,
      description: req.body.description,
      userID: new mongodb.ObjectId(req.body.userid),
    });

    console.log(req.body.userid);
    //close connection
    await connection.close();

    res.json({ message: "Transactions stored in Database" });
  } catch (error) {
    console.log("Error", error);
    res.json({ error: "Something went wrong" });
  }
};

module.exports = expense;
