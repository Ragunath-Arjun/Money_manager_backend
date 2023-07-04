const express = require("express");
const app = express();
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const dotenv = require("dotenv").config();
const cors = require("cors");
const URL = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.curjvmw.mongodb.net/`;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = require("./API/register");
const login = require("./API/login");
const expense = require("./API/expense");
const authenticate = require("./API/authenticate");
const expenses = require("./API/expenses");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
const PORT = process.env.PORT || 8000;

app.get("/test", (req, res) => res.json({ message: "Tested" }));
app.post("/register", register);

app.post("/login", login);

app.post("/expense", authenticate, expense);
app.get("/expense", authenticate, expenses);

app.listen(PORT, () =>
  console.log(`App is running in http://localhost:${PORT}`)
);
