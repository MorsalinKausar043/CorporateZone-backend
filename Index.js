const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/connect");
dotenv.config();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 4030;

const app = express();

// all routes
const users = require("./routes/users");
const jobs = require("./routes/jobs");
const login = require("./routes/login");

// connect with database
connectDB();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/users", users);
app.use("/jobs", jobs);
app.use("/login", login);

// error handling middleware
const errorHandler = (err, req, res, next) => {
  if (err.headerSent) {
    return next();
  }
  res.status(500).json(err.message);
};

app.use(errorHandler);

app.get("/", (req, res) => {
  res.json("Hello this is for testing");
});

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);
});
