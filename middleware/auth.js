const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    // const userDataAuth = jwt.verify(token, process.env.SECRET_KEY);
    // const userMatch = await User.findOne({ _id: userDataAuth.id });

    // console.log(userMatch);
    console.log(token);

    // req.token = token;
    // req.userMatch = userMatch;

    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = auth;
