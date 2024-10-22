const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const AdminModel = require("../../schema/adminSchema");

exports.signup = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const existingUser = await AdminModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new AdminModel({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({
        loginid: savedUser._id,
        email: savedUser.email,
        message: "Registered Successfully",
        name: savedUser.username,
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.loginadmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AdminModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token: token,
      loginid: user._id,
      user,
    });
  } catch (err) {
    res.status(500).json({ error: "Error logging in", details: err.message });
  }
};
