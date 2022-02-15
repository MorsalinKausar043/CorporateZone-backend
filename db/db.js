require("dotenv").config();
const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("mongoose connection port 27017!");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { connect };