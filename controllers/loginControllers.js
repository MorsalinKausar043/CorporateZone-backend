const { User } = require("../models/userModel");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userMail = await User.findOne({ email }).exec();

    if (password === userMail.password) {
      if (userMail.tokens.length <= 0) {
        return;
      } else {
        const token = await userMail.getTokenId();
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 200000),
          httpOnly: true,
        });

        await user.save();
        res.status(201).send("Successfull");
      }
    } else {
      res.status(500).send("Unsuccessfull");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { loginUser };
