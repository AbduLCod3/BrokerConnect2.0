// Load .env file containing environment variables
require("dotenv").config();

// Importing necessary modules
const express = require("express");
const { connect, connection } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const Listing = require("./models/Listing");
const cors = require("cors"); // used for setting up cross-origin resource sharing
const fs = require("fs"); // File system, for handling file paths
const path = require("path"); // Provides utilities for working with file and directory paths

// Setting up express server
const app = express();
const PORT = process.env.PORT || 3001;
const SALT_ROUNDS = 6;
const jwtSecret = process.env.SECRET;

// Establish database connection (Create)
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if db connection has been established
connection.once("open", () => {
  console.log("connected to mongo");
});

// Setting up middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/photoFolder", express.static(__dirname + "/photoFolder"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Test Route
app.get("/test", (req, res) => {
  res.json("TEST PASSED");
});

// Register User Route (Create)
app.post("/register", async (req, res) => {
  const { firstName, lastName, middleName, phoneNumber, email, password } =
    req.body;

  try {
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

// Login User Route (Read)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });

  if (foundUser) {
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

// User Profile Route (Read)
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

// Logout User Route (Update)
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// Image Upload Route (Create)
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

// Listing Route (Create)
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

// Listen on the defined port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
