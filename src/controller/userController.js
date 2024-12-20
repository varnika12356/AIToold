require('dotenv').config();
const bcrypt = require("bcrypt"); // bcrypt Module Import
const UsersModel = require("../schema/user"); // Schema created for the Users
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//@desc   Set SignUp User
//@route  POST /signup
//@access Private
const signup = asyncHandler(async (req, res) => {
  const { name, email, number, password, dob, username, gender, city, state, country, role, status } = req.body;

  // Validate required fields
  if (!name || !email || !number || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if email or number already exists
  const emailExists = await UsersModel.findOne({ email });
  const numberExists = await UsersModel.findOne({ number });

  if (emailExists) {
    return res.status(400).json({ error: "Email already exists" });
  }

  if (numberExists) {
    return res.status(400).json({ error: "Number already exists" });
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await UsersModel.create({
    name,
    email,
    number,
    password: hashPassword,
    dob,
    username,
    gender,
    city,
    state,
    country,
    role,  // Make sure this field is in the schema if you're sending it in the payload
    status: status || true, // Use default value if status is not provided
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      number: user.number,
      dob: user.dob,
      username: user.username,
      gender: user.gender,
      city: user.city,
      state: user.state,
      country: user.country,
      role: user.role, // Include any new fields you're adding
      status: user.status,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// const signup = asyncHandler(async (req, res) => {
//   const { name, email, number, password } = req.body;

//   // console.log(name, email, number, password, "users");

//   if (!name || !email || !number || !password) {
//     res.status(400);
//     throw new Error("Please add all fields");
//   }

//    // Check if email or number already exists
//    const emailExists = await UsersModel.findOne({ email });
//    const numberExists = await UsersModel.findOne({ number });
 
//    if (emailExists) {
//      return res.status(400).json({ error: "Email already exists" });
//    }
 
//    if (numberExists) {
//      return res.status(400).json({ error: "Number already exists" });
//    }

  

//   // Hash Password
//   const salt = await bcrypt.genSalt(10);
//   const hashPassword = await bcrypt.hash(password, salt);

//   // create user
//   const user = await UsersModel.create({
//     name,
//     email,
//     number,
//     password: hashPassword,
  
  
//   });

//   if (user) {
//     res.status(201).json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       number: user.number,
//       password: user.password,
   
     
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid Credentials");
//   }

//   // if (!userData) {
//   //   const salt = await bcrypt.genSalt(saltRounds);
//   //   req.body.password = await bcrypt.hash(req.body.password, salt);
//   //   UsersModel.create(req.body)
//   //     .then((users) => res.json(users))
//   //     .catch((err) => res.json(err));
//   // } else {
//   //   res.json("User Details Already Exists Please Enter a New Entry !");
//   // }
// });

//@desc   Set Login User
//@route  POST /login
//@access Private
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("first", email, password);
  // check for user email
  const user = await UsersModel.findOne({ email });
  console.log("User", user);

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      data: user,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

//@desc   Get Profile User
//@route  GET /getprofiledata/:id
//@access Private
const getprofile = asyncHandler(async (req, res) => {
  try {
    let data = await UsersModel.findById(req.params.id);
    console.log(data);
    
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

//@desc   Update Forgot User Details
//@route  PUT /forgot
//@access Private
const forgotdata = asyncHandler(async (req, res) => {
 
  
  try {
    const users = await UsersModel.findOne({
      email: req.body.email,
    });
    if (!users) {
      return res.status(404).send("User not found");
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const password = await bcrypt.hash(req.body.password, salt);

    const updateduser = await UsersModel.updateOne(
      { _id: users._id },
      { $set: { password } }
    );
    res.status(200).json(updateduser);
  } catch (error) {
    console.log(error);
  }
});

//@desc   Update Profile User
//@route  PUT /updateprofile/:id
//@access Private
const updateprofile = asyncHandler(async (req, res) => {
  try {
    const data = await UsersModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

//@desc   Get All User
//@route  GET /getuser
//@access Private
const getAlluser = asyncHandler(async (req, res) => {
  
  
  try {
    const page = parseInt(req.query.page) || 1; // Current page, default to 1
    const limit = parseInt(req.query.limit) || 10; // Number of items per page, default to 10
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    // Retrieve user data with pagination
    let contactData = await UsersModel.find().skip(skip).limit(limit);
    const totalUser = await UsersModel.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalUser / limit);

    res.status(200).json({
      data: contactData,
      currentPage: page,
      totalPages,
      totalUser // Total number of users for pagination
    });
  } catch (error) {
    console.log(error);
    if (!error.status) {
      error.status = 500;
    }
    res.status(error.status).json({ message: error.message });
  }
});

// const getAlluser = asyncHandler(async (req, res) => {
//   try {
//     let contactData = await UsersModel.find();
//     const totalUser = await UsersModel.countDocuments();

//     res.status(200).json({ contactData, totalUser });
//   } catch (error) {
//     console.log(error);
//     if (!error.status) {
//       error.status = 500;
//     }

//     res.status(error.status).json({ message: error.message });
//   }
// });


//@desc   Genetate Token Function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const deleteUser = await UsersModel.findByIdAndDelete(id);

    if (!deleteUser) {
      console.log("deleted user");

      return res.status(404).json({ error: "User not found" })

      
    }
   return res.status(200).json({message:'User deleted successfully!'})
    
  } catch (error) {
    console.error("Error deleting User:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

module.exports = {
  signup,
  login,
  getprofile,
  forgotdata,
  updateprofile,
  getAlluser,
  deleteUser
};
