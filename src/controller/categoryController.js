const Category = require("../schema/category");




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


// const getCategory = async (req, res) => {
//   try {
//     const aggregatePipeline = [
//       {
//         $lookup: {
//           from: 'tools', 
//           localField: '_id', 
//           foreignField: 'categoryId', 
//           as: 'tools' 
//         }
//       },
//       {
//         $project: {
//           name: 1, 
//           icon: 1, 
//           toolCount: { $size: '$tools' }, 
//           // tools: 0 // Exclude the tools array from the result
//         }
//       }
//     ];

//     if (req.query.category) {
//       aggregatePipeline.unshift({
//         $match: {
//           name: req.query.category 
//         }
//       });
//     }

//     const categoryData = await Category.aggregate(aggregatePipeline);
//     console.log(categoryData);

//     if (!categoryData || categoryData.length === 0) {
//       return res.status(404).json({ message: "Categories not found" });
//     }

//     res.status(200).json(categoryData);
//   } catch (error) {
//     console.log("Error Getting Categories", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


const getCategory = async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1; // Current page, default to 1
      const limit = parseInt(req.query.limit) || 10; // Number of items per page, default to 10
      const skip = (page - 1) * limit; // Calculate the number of documents to skip

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
              }
          },
          {
              $skip: skip // Skip documents based on pagination
          },
          {
              $limit: limit // Limit the number of documents returned
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

      // Count total categories for pagination
      const totalCategories = await Category.countDocuments();

      res.status(200).json({
          data: categoryData,
          currentPage: page,
          totalPages: Math.ceil(totalCategories / limit), // Calculate total pages
          totalCategories // Total number of categories
      });
  } catch (error) {
      console.log("Error Getting Categories", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting tool:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params; 
    console.log("fnJSDFjS", id);
    
    const tool = await Category.findById(id); 
    console.log('DCMVSVS',tool);
    

    if (!tool) {
      return res.status(404).json({ message: 'Category not found' }); 
    }

    res.status(200).json(tool);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Server error', error: error.message }); 
  }
}

const updateCategory = async (req, res) => {
  try {
    // const { categoryId } = req.params;
    // console.log(categoryId);
    
    // const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, {
    //   new: true,
    // });
    // if (!updatedCategory) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Category not found"});
    // }
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    console.error("Error updating category data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = {
  addCategory,
  getCategory,
  deleteCategory,
  getCategoryById,
  updateCategory
};
