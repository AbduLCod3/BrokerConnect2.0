const express = require("express");
//help communicate different ports
const cors = require("cors");
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/test", (req, res) => {
  res.json("TEST PASSED");
});

app.listen("3001");
