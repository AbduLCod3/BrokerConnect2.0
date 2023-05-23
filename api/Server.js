require("dotenv").config();
const express = require("express");
const { connect, connection } = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
// Help different ports communicate
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
const SALT_ROUNDS = 6; // 6 is a reasonable value

// Establish Database Conenction
// Database connection
connect(process.env.MONGO_URI, {
  // Having these two properties set to true is best practice when connecting to MongoDB
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if db connection has been established
connection.once("open", () => {
  console.log("connected to mongo");
});

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/test", (req, res) => {
  res.json("TEST PASSED");
});

// +++ +++ | C R U D | CREATE READ UPDATE DELETE | +++ +++ //

// +++ +++ | CREATE | +++ +++ //
app.post("/register", async (req, res) => {
  const { firstName, lastName, middleName, phoneNumber, email, password } =
    req.body;

  try {
    // userRegister ===== userDoc
    const userRegister = await User.create({
      firstName,
      lastName,
      middleName,
      phoneNumber,
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
    });
    res.json(userRegister);
  } catch (err) {
    res.status(400).json(err);
  }
});

// +++ +++ | READ | +++ +++ //
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // findUser ==== UserDoc
  const findUser = await User.findOne({ email });

  // Check if user exist
  if (findUser) {
    // Check if password is correct
    const isPasswordCorrect = bcrypt.compareSync(password, findUser.password);
    // res.cookie('token', '').json('password is correct');
    isPasswordCorrect ? res.json("password is correct") : res.json("Incorrect");
  } else {
    res.json("User Found");
  }
});

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
