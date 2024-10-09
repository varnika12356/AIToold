const Category = require("../schema/category");


// const addCategory = async (req, res) => {
//   try {
//     const { name, icon } = req.body; 
//     const newCategory = new Category({
//       name,
//       icon: icon || '', 
//     });
//     await newCategory.save();
//     res.status(201).json(newCategory);
//   } catch (error) {
//     console.error("Error adding category:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


const addCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;

    // Ensure that the name is provided
    if (!name) {
      return res.status(400).json({ message: "Category name is required." });
    }

    const newCategory = new Category({
      name,
      icon: icon || '', 
    });

    await newCategory.save(); 
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};





const getCategory = async (req, res) => {
  try {
    const aggregatePipeline = [
      {
        $lookup: {
          from: 'tools', 
          localField: '_id', 
          foreignField: 'categoryId', 
          as: 'tools' 
        }
      },
      {
        $project: {
          name: 1, 
          icon: 1, 
          toolCount: { $size: '$tools' }, 
          // tools: 0 // Exclude the tools array from the result
        }
      }
    ];

    if (req.query.category) {
      aggregatePipeline.unshift({
        $match: {
          name: req.query.category 
        }
      });
    }

    const categoryData = await Category.aggregate(aggregatePipeline);
    console.log(categoryData);

    if (!categoryData || categoryData.length === 0) {
      return res.status(404).json({ message: "Categories not found" });
    }

    res.status(200).json(categoryData);
  } catch (error) {
    console.log("Error Getting Categories", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




module.exports = {
  addCategory,
  getCategory,
};
