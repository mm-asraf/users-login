const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/user.model");
const app = express();

//load config
dotenv.config({ path: "./config.env" });
connectDB();

//Body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already Exists" });
    } else {
      const user = new User({
        email,
        password,
      });

      user.save((err) => {
        if (err) {
          res.send("something went wrong");
        } else {
          res.send({ message: "successFully SignedUp" });
        }
      });
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "login succesfully" });
      } else {
        res.send({ message: "password didnt match" });
      }
    } else {
      res.send("User not registered");
    }
  });
});

app.listen(5000, () => {
  console.log("Server is running!");
});
