const express=require("express");
const app=express();
const mongodb= require("mongodb")
const mongoclient=mongodb.MongoClient;
const dotenv=require("dotenv").config();
const cors=require("cors");
const URL=`mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.curjvmw.mongodb.net/`
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");

const register = require("./API/register");
const login = require("./API/login");
const expense = require("./API/expense");
const authenticate = require("./API/authenticate");

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000"}))

app.post("/register",register)

app.post("/login",login)

app.post("/expense",authenticate,expense)

app.listen(8000);