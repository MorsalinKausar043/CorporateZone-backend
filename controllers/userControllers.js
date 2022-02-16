const mongoose = require("mongoose");
const { User } = require("../models/userModel");

// create a new user
const postUser = async (req, res) => {
  try
  {
    const user = new User(req.body);
    const token = await user.getTokenId();
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 200000),
        httpOnly: true
    })

    await user.save();
    res.status(201).json({ massage: "save successfull!" }); 
    
  } catch (err)
  {
    res.status(500).json(err.message);
  }
};

// get all users
const allUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete user 

const deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: id };
    const result = await User.findOneAndDelete(query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { postUser, allUsers, deleteUsers };
