require("dotenv").config();
const express = require("express");
const { connect, connection } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
// Help different ports communicate
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
const SALT_ROUNDS = 6; // 6 is a reasonable value
const jwtSecret = process.env.SECRET;

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

// +++ +++ | Middleware | +++ +++ //
app.use(express.json());
app.use(cookieParser());

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
  // foundUser ==== UserDoc
  const foundUser = await User.findOne({ email });

  // Check if user exist
  if (foundUser) {
    // Check if password is correct
    const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);
    if (isPasswordCorrect) {
      jwt.sign(
        {
          email: foundUser.email,
          id: foundUser._id,
        },
        jwtSecret,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json(foundUser);
        }
      );
    } else {
      res.status(400).json("password is incorrect");
    }
  } else {
    res.json("User Found");
  }
});

//
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { email, firstName, lastName, _id } = await User.findById(
        userData.id
      );
      res.json({ firstName, lastName, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
  // res.clearCookie('token')
});

app.post("/upload", async (req, res) => {
  const imageName = Date.now + ".jpg";
  const { link } = req.body;
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + imageName,
  });
  res.json(__dirname + "/uploads/" + imageName);
});
// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
