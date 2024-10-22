const dotenv = require("dotenv")
dotenv.config();
const bcrypt = require("bcrypt")
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const AdminSchema = require("../schema/admin")


const signupAdmin = async (req, res) => {
    const { email, password, name } = req.body;
    try {
      const existingUser = await AdminSchema.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new AdminSchema({
        name,
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
          name: savedUser.name,
        });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
const loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await AdminSchema.findOne({ email });
  
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

 const getAdminById = async(req,res)=>{
    const userId = req.params.id; 

  try {
    const user = await AdminSchema.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.status(200).json({
      message: "User information retrieved successfully",
      data: user
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to get user information",
      details: err.message
    });
  }
  }



module.exports = {
    signupAdmin, 
    loginAdmin,
    getAdminById
}