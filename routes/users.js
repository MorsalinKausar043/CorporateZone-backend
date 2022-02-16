const express = require("express");
const router = express.Router();
const { postUser, allUsers, deleteUsers } = require("../controllers/userControllers");

// get all users
router.get("/", allUsers);

// post a user
router.post("/", postUser);

// delete a user
router.delete("/:id", deleteUsers);

module.exports = router;
