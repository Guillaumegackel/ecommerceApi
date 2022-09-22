const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN

router.post("/login", async (req, res) => {
	try {
	  const user = await User.findOne({username:req.body.username});

	  !user && res.status(401).json("mauvais login")

	  const hashPassword = CryptoJS.AES.decrypt(
		user.password,
		process.env.PASS_SECRET
		);

		const basePassword = hashPassword.toString(CryptoJS.enc.Utf8);

		basePassword !==req.body.password && 
		res.status(401).json("Mauvais MDP")

		const accessToken = jwt.sign({
			id:user._id,
			isAdmin:user.isAdmin,
		},process.env.JWT_SECRET, {expiresIn:"2d"})

		const { password, ...others} =user._doc;

	  res.status(200).json({...others, accessToken});
	} catch (error) {
	  res.status(500).json(error);
	}
  });
module.exports = router;
