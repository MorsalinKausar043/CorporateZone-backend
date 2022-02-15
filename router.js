const express = require('express');
const router = new express.Router();

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



// module export ------------->
module.exports = router;