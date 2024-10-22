const express = require("express");
const router = express.Router();
const sendMessage = require("../controller/smsController");
const {
  createFooter,
  getFooter,
  updateFooter,
} = require("../controller/footerController");
const { replyOnQuery } = require("../controller/emailcontroller");
const { protect } = require("../Middleware/authMiddleware");

const {
  addCategory,
  getCategory,
  deleteCategory,
  getCategoryById,
  updateCategory
} = require("../controller/categoryController");

const {
  signupAdmin,
  loginAdmin,
  getAdminById

} = require("../controller/adminController")


const {
  createTutorial,
  getAllTutorials,
  getTutorialById,
  updateTutorial,
  deleteTutorial,
} = require("../controller/aiTutorialsController")

const {
  submitContactForm,
  getAllContacts,
  getContactById,
} = require("../controller/contactcontroller");
const {
  createReview,
  getAllReviews,
  getReviewsByToolId,
  updateReviewById,
  deleteReviewById,
} = require("../controller/reviewcontroller");
const {
  addTool,
  homeAI,
  getTools,
  getAllTool,
  getToolById,
  updateToolStatus,
  updateVisitCount,
  updateFilter,
  deleteTool,
  updateToolData,
  getAllToolsWithoutPagination
} = require("../controller/toolController");
const {
  signup,
  login,
  getprofile,
  forgotdata,
  updateprofile,
  getAlluser,
  deleteUser
} = require("../controller/userController");

router.post("/createfooter", createFooter);
router.put("/updatefooter/:id", updateFooter);
router.get("/getfooter", getFooter);



// Admin api 

/**
 * @swagger
 * /admin/signup:
 *   post:
 *     summary: Registers a new admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin email
 *               password:
 *                 type: string
 *                 description: Admin password
 *               name:
 *                 type: string
 *                 description: Admin name
 *             example:
 *               email: admin@example.com
 *               password: yourpassword123
 *               name: John Doe
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 loginid:
 *                   type: string
 *                   description: Admin ID
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
router.post("/signup", signupAdmin);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Logs in an admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin email
 *               password:
 *                 type: string
 *                 description: Admin password
 *             example:
 *               email: admin@example.com
 *               password: yourpassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 loginid:
 *                   type: string
 *                   description: Admin ID
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post("/login", loginAdmin);

/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: Get admin by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Admin information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     other_admin_properties:
 *                       type: string
 *                       description: Other admin-specific fields
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Failed to retrieve admin information
 */
router.get("/admin/:id", getAdminById);



// ** User Controller All API ** //

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/login", login);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows a user to register by providing user details such as name, email, number, and password.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               number:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 number:
 *                   type: string
 *       400:
 *         description: Bad request (e.g., validation error)
 *       500:
 *         description: Internal server error
 */
router.post("/signup", signup);


// Forgot data API
/**
 * @swagger
 * /forgot:
 *   put:
 *     summary: Reset user password
 *     description: This endpoint allows users to reset their password by providing their email address and a new password.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Bad request (e.g., email or password not provided)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put("/forgot", forgotdata);


// Get User Data by /:id API
/**
 * @swagger
 * /getprofiledata/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     description: This endpoint retrieves user profile information based on the provided user ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: User profile data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   format: email
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/getprofiledata/:id", getprofile);

// Get All User Data API
/**
 * @swagger
 * /getAlluser:
 *   get:
 *     summary: Retrieve all users
 *     description: This endpoint retrieves a list of all users in the system.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   number:
 *                     type: string
 *                     example: "9526159361"
 *                   status:
 *                     type: boolean
 *                     example: true
 *       500:
 *         description: Internal server error
 */
router.get("/getAlluser", getAlluser);



// Update User Data by /:id
/**
 * @swagger
 * /updateprofile/{id}:
 *   put:
 *     summary: Update user profile by ID
 *     description: This endpoint allows updating a user's profile by their ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               number:
 *                 type: string
 *               username:
 *                 type: string
 *               dob:
 *                 type: string
 *               gender:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               role:
 *                 type: string
 *               status:
 *                 type: boolean
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Bad request (e.g., validation error)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put("/updateprofile/:id", updateprofile);

/**
 * @swagger
 * /deleteUserById/{id}:
 *   delete:
 *     summary: Delete a User by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteUserById/:id", deleteUser);


// ** Contact Controller All API ** //

// Create/Send Contact data API
/**
 * @swagger
 * /createcontact:
 *   post:
 *     summary: Create a new contact
 *     description: This endpoint allows users to create and send contact data.
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Bad request (e.g., validation error)
 *       500:
 *         description: Internal server error
 */

router.post("/createcontact", submitContactForm);

// GET ALL Contact data API
/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Retrieve all contacts
 *     description: This endpoint retrieves a list of all contacts submitted.
 *     tags: [Contact]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number to retrieve.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: rows
 *         required: false
 *         description: The number of contacts per page.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of contacts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total number of contacts
 *                 pages:
 *                   type: integer
 *                   description: Total number of pages available
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The ID of the contact
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                         format: email
 *                       message:
 *                         type: string
 *       500:
 *         description: Internal server error
 */

router.get("/contacts", getAllContacts);

// ** Tool Controller All API ** //

// Add Tool API
/**
 * @swagger
 * /addtool:
 *   post:
 *     summary: Add a new tool
 *     description: This endpoint allows users to add a new tool to the inventory.
 *     tags: [Tool]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               longDescription:  
 *                 type: string
 *               visit_link:
 *                 type: string
 *               pricing:
 *                 type: object
 *                 properties:
 *                   price:
 *                     type: number
 *                   type:
 *                     type: string
 *                     enum: ["freemium", "trial", "premium"]  
 *               status:
 *                 type: boolean  
 *               visit_count:
 *                 type: number
 *               filter:
 *                 type: string  
 *                 enum: ["new", "popular", "featured"]  
 *               rating:
 *                 type: number 
 *               isFree:
 *                 type: boolean  
 *               isVerified:
 *                 type: boolean  
 *               tags:
 *                 type: array  
 *                 items:
 *                   type: string
 *               firebase_image_url:  
 *                 type: string
 *     responses:
 *       201:
 *         description: Tool added successfully
 *       400:
 *         description: Bad request (e.g., validation error)
 *       500:
 *         description: Internal server error
 */
router.post("/addTool", addTool);


/**
 * @swagger
 * /getToolById/{ID}:
 *   get:
 *     summary: Retrieve a tool by ID
 *     description: Get a tool's details using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the tool to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tool retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *       404:
 *         description: Tool not found
 *       500:
 *         description: Server error
 */
router.get("/getToolById/:id", getToolById);


// Get Category API
/**
 * @swagger
 * /getcategory:
 *   get:
 *     summary: Retrieve categories with pagination
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: The category name to filter by
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The category ID
 *                       name:
 *                         type: string
 *                         description: The name of the category
 *                       icon:
 *                         type: string
 *                         description: The icon URL for the category
 *                       toolCount:
 *                         type: integer
 *                         description: The number of tools in the category
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages
 *                 totalCategories:
 *                   type: integer
 *                   description: The total number of categories
 *       404:
 *         description: Categories not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/getcategory", getCategory);



/**
 * @swagger
 * path:
 *   /getCategoryById/{Id}:
 *     get:
 *       summary: Get a category by ID
 *       tags: [Category]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the category
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: A category object
 *           content:
 *             application/json:
 *               schema:
 *                
 *         404:
 *           description: Category not found
 *         500:
 *           description: Internal server error
 */
router.get("/getCategoryById/:id", getCategoryById);

/**
 * @swagger
 * path:
 *   /updateCategory/{categoryId}:
 *     put:
 *       summary: Update a category by ID
 *       tags: [Categories]
 *       parameters:
 *         - name: categoryId
 *           in: path
 *           required: true
 *           description: The ID of the category to update
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Name of the category
 *                 icon:
 *                   type: string
 *                   description: Icon URL for the category
 *       responses:
 *         200:
 *           description: The updated category object
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   data:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       icon:
 *                         type: string
 *                       slug:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *         404:
 *           description: Category not found
 *         500:
 *           description: Internal server error
 */

router.put("/updateCategory/:id", updateCategory)

// Add Category API
/**
 * @swagger
 * /addcategory:
 *   post:
 *     summary: Add a new category
 *     description: This endpoint allows users to add a new category.
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               toolCount:
 *                 type: number
 *               icon:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category added successfully
 *       400:
 *         description: Bad request (e.g., validation error)
 *       500:
 *         description: Internal server error
 */
router.post("/addcategory", addCategory);

/**
 * @swagger
 * /tools/{toolId}:
 *   put:
 *     summary: Update the data of a specific tool
 *     description: This endpoint updates the data of a tool identified by its Tool ID.
 *     tags: [Tool]
 *     parameters:
 *       - in: path
 *         name: toolId
 *         required: true
 *         description: ID of the tool to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Tool Title"
 *               description:
 *                 type: string
 *                 example: "This is an updated description of the tool."
 *               category:
 *                 type: string
 *                 example: "Updated Category"
 *               visit_link:
 *                 type: string
 *                 example: "https://example.com/tool"
 *               pricing:
 *                 type: object
 *                 properties:
 *                   price:
 *                     type: string
 *                     example: "Free"
 *                   type:
 *                     type: string
 *                     enum: ["freemium", "trial", "premium"]
 *               firebase_image_url:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               isFree:
 *                 type: boolean
 *                 example: true
 *               isVerified:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Tool data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       404:
 *         description: Tool not found
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       500:
 *         description: Internal server error
 */
router.put("/category/:categoryId", updateCategory);

// Delete Category by Category ID
/**
 * @swagger
 * /deleteCategory/{categoryId}:
 *   delete:
 *     summary: Delete a specific category
 *     description: This endpoint deletes a category identified by its Category ID.
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tool deleted successfully
 *       404:
 *         description: Tool not found
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteCategory/:categoryId", deleteCategory);
// Define route for '/AI'


// Get All Tools API
// /**
//  * @swagger
//  * /gettool:
//  *   get:
//  *     summary: Retrieve tools based on AI filters
//  *     description: This endpoint retrieves tools filtered by AI criteria.
//  *     tags: [Tool]
//  *     responses:
//  *       200:
//  *         description: List of tools retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   id:
//  *                     type: string
//  *                     description: Unique identifier for the tool
//  *                   title:
//  *                     type: string
//  *                     description: The title of the tool
//  *                   category:
//  *                     type: string
//  *                     description: The category of the tool
//  *                   description:
//  *                     type: string
//  *                     description: Brief description of the tool
//  *                   visit_link:
//  *                     type: string
//  *                     description: Link to visit the tool
//  *                   pricing:
//  *                     type: object
//  *                     properties:
//  *                       price:
//  *                         type: number
//  *                         description: Price of the tool
//  *                       type:
//  *                         type: string
//  *                         description: Type of pricing model (freemium, trial, premium)
//  *                   status:
//  *                     type: boolean
//  *                     description: Indicates if the tool is active or not
//  *                   visit_count:
//  *                     type: number
//  *                     description: Number of times the tool has been visited
//  *                   filter:
//  *                     type: string
//  *                     description: Filter category of the tool (new, popular, featured)
//  *                   firebase_image_url:
//  *                     type: string
//  *                     description: URL of the tool's image stored in Firebase
//  *                   rating:
//  *                     type: number
//  *                     description: Rating of the tool
//  *                   isFree:
//  *                     type: boolean
//  *                     description: Indicates if the tool is free to use
//  *                   isVerified:
//  *                     type: boolean
//  *                     description: Indicates if the tool is verified
//  *                   tags:
//  *                     type: array
//  *                     items:
//  *                       type: string
//  *                     description: Tags associated with the tool
//  *       500:
//  *         description: Internal server error
//  */
router.get("/gettool", getTools);


/**
 * @swagger
 * /getAllTool:
 *   get:
 *     summary: Retrieve all tools with pagination
 *     description: This endpoint returns a paginated list of tools from the database.
 *     tags: [Tool]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of results per page
 *     responses:
 *       200:
 *         description: Paginated list of tools retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       category:
 *                         type: string
 *                       description:
 *                         type: string
 *                       pricing:
 *                         type: string
 *                       firebase_image_url:
 *                         type: string
 *                       totalReviews:
 *                         type: integer
 *                       averageRating:
 *                         type: number
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalTools:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.get('/getAllTool', getAllTool);


/**
 * @swagger
 * /getAllToolWithoutPagination:
 *   get:
 *     summary: Retrieve a list of all tools
 *     tags: [Tools]
 *     responses:
 *       200:
 *         description: A list of tools
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The tool ID
 *                       title:
 *                         type: string
 *                         description: The title of the tool
 *                       category:
 *                         type: string
 *                         description: The category of the tool
 *                       categoryId:
 *                         type: string
 *                         description: The category ID
 *                       description:
 *                         type: string
 *                         description: A short description of the tool
 *                       longDescription:
 *                         type: string
 *                         description: A detailed description of the tool
 *                       visit_link:
 *                         type: string
 *                         description: The link to visit the tool
 *                       pricing:
 *                         type: string
 *                         description: The pricing information
 *                       status:
 *                         type: string
 *                         description: The current status of the tool
 *                       visit_count:
 *                         type: integer
 *                         description: The number of visits
 *                       firebase_image_url:
 *                         type: string
 *                         description: URL for the tool's image
 *                       isFree:
 *                         type: boolean
 *                         description: Indicates if the tool is free
 *                       isFeatured:
 *                         type: boolean
 *                         description: Indicates if the tool is featured
 *                       isVerified:
 *                         type: boolean
 *                         description: Indicates if the tool is verified
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Tags related to the tool
 *                       ranking:
 *                         type: integer
 *                         description: The ranking of the tool
 *                       slug:
 *                         type: string
 *                         description: The URL slug for the tool
 *                       totalReviews:
 *                         type: integer
 *                         description: Total number of reviews for the tool
 *                       averageRating:
 *                         type: number
 *                         format: float
 *                         description: Average rating of the tool
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Creation timestamp
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Last update timestamp
 *       500:
 *         description: Server error
 */

router.get('/getAllToolWithoutPagination', getAllToolsWithoutPagination)

// Define route for 'homeAi'

/**
 * @swagger
 * /homeai:
 *   get:
 *     summary: Retrieve AI-related tools and content
 *     description: This endpoint retrieves tools and content related to AI for the homepage.
 *     tags: [Tool]
 *     responses:
 *       200:
 *         description: AI-related tools and content retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tools:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       visit_link:
 *                         type: string
 *                       status:
 *                         type: string
 *                 content:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.get("/homeai", homeAI);

// Update Tool Status by ID
/**
 * @swagger
 * /updatetoolstatus/{id}:
 *   put:
 *     summary: Update the status of a specific tool
 *     description: This endpoint updates the status of a tool identified by its ID.
 *     tags: [Tool]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tool to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: New status of the tool (e.g., active, inactive)
 *     responses:
 *       200:
 *         description: Tool status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Tool not found
 *       400:
 *         description: Bad request (e.g., invalid status value)
 *       500:
 *         description: Internal server error
 */
router.put("/updatetoolstatus/:id", updateToolStatus);


// Update Filter for AI Tool by ID
/**
 * @swagger
 * /ai/{id}/updateFilter:
 *   put:
 *     summary: Update filter settings for a specific AI tool
 *     description: This endpoint updates the filter settings for an AI tool identified by its ID.
 *     tags: [Tool]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the AI tool to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filter:
 *                 type: object
 *                 description: New filter settings for the AI tool
 *     responses:
 *       200:
 *         description: AI tool filter updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedAI:
 *                   type: object
 *       404:
 *         description: AI tool not found
 *       400:
 *         description: Bad request (e.g., missing filter)
 *       500:
 *         description: Internal server error
 */
router.put("/ai/:id/updateFilter", updateFilter);


// Update Tool Data by Tool ID
/**
 * @swagger
 * /tools/{toolId}:
 *   put:
 *     summary: Update the data of a specific tool
 *     description: This endpoint updates the data of a tool identified by its Tool ID.
 *     tags: [Tool]
 *     parameters:
 *       - in: path
 *         name: toolId
 *         required: true
 *         description: ID of the tool to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Tool Title"
 *               description:
 *                 type: string
 *                 example: "This is an updated description of the tool."
 *               category:
 *                 type: string
 *                 example: "Updated Category"
 *               visit_link:
 *                 type: string
 *                 example: "https://example.com/tool"
 *               pricing:
 *                 type: object
 *                 properties:
 *                   price:
 *                     type: string
 *                     example: "Free"
 *                   type:
 *                     type: string
 *                     enum: ["freemium", "trial", "premium"]
 *               firebase_image_url:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               isFree:
 *                 type: boolean
 *                 example: true
 *               isVerified:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Tool data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       404:
 *         description: Tool not found
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       500:
 *         description: Internal server error
 */
router.put("/tools/:toolId", updateToolData);


// Update Visit Count by ID
/**
 * @swagger
 * /updateVisitCount/{id}:
 *   put:
 *     summary: Update the visit count for a specific tool
 *     description: This endpoint increments the visit count for a tool identified by its ID.
 *     tags: [Tool]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tool to update the visit count
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Visit count updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     visit_count:
 *                       type: number
 *                       example: 10
 *       404:
 *         description: Tool not found
 *       500:
 *         description: Internal server error
 */
router.put("/updateVisitCount/:id", updateVisitCount);


// Delete Tool by Tool ID
/**
 * @swagger
 * /deleteTool/{toolId}:
 *   delete:
 *     summary: Delete a specific tool
 *     description: This endpoint deletes a tool identified by its Tool ID.
 *     tags: [Tool]
 *     parameters:
 *       - in: path
 *         name: toolId
 *         required: true
 *         description: ID of the tool to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tool deleted successfully
 *       404:
 *         description: Tool not found
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteTool/:toolId", deleteTool);

// Send SMS API
/**
 * @swagger
 * /sendsms:
 *   post:
 *     summary: Send a message via SMS
 *     description: This endpoint sends an SMS message to a specified recipient.
 *     tags: [SMS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       400:
 *         description: Bad request (e.g., missing parameters)
 *       500:
 *         description: Internal server error
 */
router.post("/sendsms", sendMessage);

// Route to create a new review for a specific tool
/**
 * @swagger
 * /tool/{toolId}/review:
 *   post:
 *     summary: Create a review for a tool
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: toolId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the tool
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewContent:
 *                 type: string
 *                 description: Content of the review
 *                 example: "This tool is excellent for development."
 *               rating:
 *                 type: number
 *                 description: Rating of the tool
 *                 example: 4
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The review ID
 *                 reviewContent:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 toolId:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Tool not found
 *       500:
 *         description: Internal server error
 */
router.post("/createReview/:toolid", createReview);

// Route to get all reviews
/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Retrieve all reviews
 *     description: This endpoint retrieves a list of all reviews.
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: List of reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   reviewContent:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   productId:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 */
router.get("/getAllReviews", getAllReviews)

/**
 * @swagger
 * /tool/:toolid/review:
 *   get:
 *     summary: Get reviews by Tool ID
 *     description: Retrieve all reviews for a specific tool by its ID.
 *     parameters:
 *       - in: path
 *         name: toolId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the tool to retrieve reviews for
 *     responses:
 *       200:
 *         description: A list of reviews for the tool
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       reviewContent:
 *                         type: string
 *                       rating:
 *                         type: integer
 *                       toolId:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       404:
 *         description: No reviews found for the tool
 *       500:
 *         description: Server error
 */
router.get("/getReviewByToolId/:toolid", getReviewsByToolId);
// POST route for creating a new email address
/**
 * @swagger
 * /emails:
 *   post:
 *     summary: Create a new email address
 *     description: This endpoint allows users to create a new email address for receiving replies or notifications.
 *     tags: [Emails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Email created successfully
 *       400:
 *         description: Bad request (e.g., invalid email format)
 *       500:
 *         description: Internal server error
 */
router.post("/emails", replyOnQuery);


/**
 * @swagger
 * path:
 *   /tutorials:
 *     post:
 *       summary: Create a new tutorial
 *       tags: [Tutorials]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 toolId:
 *                   type: string
 *                   description: The ID of the associated tool
 *                   example: "60c72b2f5f1b2c001f45d1a7"
 *                 tutorialUrl:
 *                   type: string
 *                   description: The URL of the tutorial
 *                   example: "https://example.com/tutorial"
 *       responses:
 *         201:
 *           description: Tutorial created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   toolId:
 *                     type: string
 *                   tutorialUrl:
 *                     type: string
 *         500:
 *           description: Internal server error
 */
router.post("/createAItutorial", createTutorial);

/**
 * @swagger
 * path:
 *   /tutorials:
 *     get:
 *       summary: Get all tutorials with pagination
 *       tags: [Tutorials]
 *       parameters:
 *         - name: page
 *           in: query
 *           required: false
 *           description: The page number to retrieve (default is 1)
 *           schema:
 *             type: integer
 *             example: 1
 *         - name: limit
 *           in: query
 *           required: false
 *           description: The number of tutorials to retrieve per page (default is 10)
 *           schema:
 *             type: integer
 *             example: 10
 *       responses:
 *         200:
 *           description: A list of tutorials with pagination info
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   tutorials:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         toolId:
 *                           type: string
 *                         tutorialUrl:
 *                           type: string
 *                   totalPages:
 *                     type: integer
 *                     description: Total number of pages available
 *                   currentPage:
 *                     type: integer
 *                     description: The current page number
 *                   totalItems:
 *                     type: integer
 *                     description: Total number of tutorials available
 *         500:
 *           description: Internal server error
 */
router.get("/getAllAITutorials", getAllTutorials);

/**
 * @swagger
 * path:
 *   /getTutorialById/{id}:
 *     get:
 *       summary: Get a tutorial by ID
 *       tags: [Tutorials]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the tutorial to retrieve
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: A tutorial object
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   toolId:
 *                     type: string
 *                   tutorialUrl:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *         404:
 *           description: Tutorial not found
 *         500:
 *           description: Internal server error
 */

router.get("/getTutorialById/:id", getTutorialById)

/**
 * @swagger
 * path:
 *   /tutorials/{id}:
 *     put:
 *       summary: Update a tutorial by ID
 *       tags: [Tutorials]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the tutorial
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 toolId:
 *                   type: string
 *                 tutorialUrl:
 *                   type: string
 *       responses:
 *         200:
 *           description: Tutorial updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   toolId:
 *                     type: string
 *                   tutorialUrl:
 *                     type: string
 *         404:
 *           description: Tutorial not found
 *         500:
 *           description: Internal server error
 */
router.put("/updateTutorialById/:id", updateTutorial);

/**
 * @swagger
 * path:
 *   /deleteTutorialById/:id:
 *     delete:
 *       summary: Delete a tutorial by ID
 *       tags: [Tutorials]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the tutorial
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: Tutorial deleted successfully
 *         404:
 *           description: Tutorial not found
 *         500:
 *           description: Internal server error
 */
router.delete("/deleteTutorialById/:id", deleteTutorial);


function getRandomMobileNumber() {
  // Mobile numbers usually start with a digit from 6 to 9 in many countries.
  const startDigit = getRandomInt(6, 9);

  // Generate the remaining 9 digits.
  let remainingDigits = "";
  for (let i = 0; i < 9; i++) {
    remainingDigits += getRandomInt(0, 9);
  }

  return `${startDigit}${remainingDigits}`;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// router.get("/test", async (req, res) => {
//   try {
//     const fs = require("node:fs");
//     const path = require("node:path");

//     const filePath = path.join("ai-tools-database", "mockcontact.json");

//     if (!fs.existsSync(filePath)) {
//       return res.json({ msg: "File not found!" });
//     }

//     const fileData = JSON.parse(fs.readFileSync(filePath));

//     for (const data of fileData) {
//       let contact = await Contact.findOne({
//         name: data.name,
//         email: data.email,
//         message: data.message,
//       });

//       if (!contact) {
//         contact = await Contact.create({
//           name: data.name,
//           email: data.email,
//           message: data.message,
//         });
//       }

//       // const newData = {
//       //   title: data.toolTitle,
//       //   category: data.category,
//       //   description: data.toolDescription,
//       //   visit_link: data.visitLink || "na",
//       //   pricing: {
//       //     price: data.pricingPrice,
//       //     type: data.pricingType.toLowerCase() || "trial",
//       //   },
//       //   status: data.status,
//       //   visit_count: data.visitCount,
//       //   filter: data.filter,
//       //   firebase_image_url: data.firebaseImageUrl,
//       // };

//       // console.log("newData :>> ", newData);

//       // await Category.create(newData);
//     }

//     return res.json({ msg: "OK" });
//   } catch (err) {
//     return res.json({
//       err: err.message,
//       stack: err.stack,
//     });
//   }
// });

module.exports = router;
