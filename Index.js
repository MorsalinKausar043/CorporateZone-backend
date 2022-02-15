const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {connect} = require("./db/db");
dotenv.config();
const port = process.env.PORT || 5000;
const router = require("./router");
const app = express();


// connect with database
    connect();

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


// router setup-------------------> 
app.use(router);




app.listen(port, () => {
  console.log(`express port is ${port}`);
});