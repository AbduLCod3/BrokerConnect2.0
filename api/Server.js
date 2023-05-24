require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const { connect, connection } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const Listing = require("./models/Listing");
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
app.use("/photoFolder", express.static(__dirname + "/photoFolder"));

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

console.log(__dirname);

// app.post("/upload", async (req, res) => {
//   const { link } = req.body;
//   const imageName = Date.now() + ".jpg";
//   await imageDownloader.image({
//     url: link,
//     dest: __dirname + "/photoFolder/" + imageName,
//   });
//   res.json(__dirname + "/photoFolder/" + imageName);
// });

app.post("/upload", async (req, res) => {
  const { link } = req.body;
  const imageName = Date.now() + ".jpg";
  const imageFolderPath = path.join(__dirname, "/photoFolder");

  // Create directory if it doesn't exist
  if (!fs.existsSync(imageFolderPath)) {
    fs.mkdirSync(imageFolderPath);
  }

  const imagePath = path.join(imageFolderPath, imageName);

  try {
    await imageDownloader.image({
      url: link,
      dest: imagePath,
    });
    res.json(imageName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to download image" });
  }
});

app.post("/listings", (req, res) => {
  const { token } = req.cookies;
  const { title, address, description, cost, oldPhotos } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    await Listing.create({
      title,
      address,
      description,
      cost,
      oldPhotos,
      broker: userData.id,
    });
  });
});

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
