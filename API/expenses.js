const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const URL = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.curjvmw.mongodb.net/`;
const bcrypt = require("bcrypt");

const expenses = async (req, res) => {
  try {
    //Connect Mongodb
    const connection = await mongoclient.connect(URL);
    //select db
    const db = await connection.db("money_manager");
    //select collection
    const collection = await db.collection("transactions");
    //Do CRUD Operation
    const transactions = await collection
      .find({ userID: new mongodb.ObjectId(req.body.userid) })
      .toArray();
    //close connection
    await connection.close();
    res.json(transactions);

    // res.json({ message: "All the transactions retrived from Database" });
  } catch (error) {
    console.log("Error", error);
    res.json({ error: "Something went wrong" });
  }
};

module.exports = expenses;
