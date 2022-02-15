const express = require('express');
const router = new express.Router();
const {User} = require("./models/usermodels");

// error handling middlewares
const errorHandler = (err, req, res, next) => {
    if (err.headerSent) {
      return next();
    }
    res.status(500).json(err.message);
  };
  router.use(errorHandler);
  
  router.get("/", (req, res) => {
    res.send("hello world this is home page!");
  });


  // user part ------------------------->

  router.get("/user", async (req, res) => {
    try
    {
      const showUser = await User.find({});
      res.status(201).send(showUser);
        
      } catch (error) {
        res.status(500).json(error.message);
      }
    })

    // create a user
router.post("/user", async (req, res) => {
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
});

// module export ------------->
module.exports = router;