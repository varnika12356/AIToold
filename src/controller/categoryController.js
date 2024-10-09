const Category = require("../schema/category");

//@desc   Add Category
//@route  POST /addcategory
//@access Private
const addCategory = async (req, res) => {
  try {
    // const { name, toolCount, icon } = req.body; // Add toolCount and icon
    const { name, icon } = req.body; // Add toolCount and icon
    const newCategory = new Category({
      name,
      // toolCount: toolCount || 0, // default to 0 if not provided
      toolCount: toolCount || 0, // default to 0 if not provided
      icon: icon || '', // default to empty string if not provided
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



//@desc   Get Category
//@route  GET /getcategory
//@access Private
const getCategory = async (req, res) => {
  try {
    const query = {};

    if (req.query.category) {
      query.category = req.query.category;
    }
    const CategoryData = await Category.find(query);
    if (!CategoryData) throw new Error({ message: "Categories are not found" });

    res.status(200).json(CategoryData);
  } catch (error) {
    console.log("Error Getting Categories", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  addCategory,
  getCategory,
};
