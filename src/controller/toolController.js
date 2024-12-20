// toolController.js
const Category = require("../schema/category");
const Review = require("../schema/reviews");
const Tool = require("../schema/tool");

//@desc   Add Tool
//@route  POST /addtool
//@access Private
const addTool = async (req, res) => {
  try {
    // Ensure firebase_image_url is included
    if (!req.body.firebase_image_url) {
      return res.status(400).json({ message: "firebase_image_url is required" });
    }

    const tool = await Tool.create({
      title: req.body.title,
      category: req.body.category,
      categoryId: req.body.categoryId,
      description: req.body.description,
      longDescription: req.body.longDescription || '', 
      visit_link: req.body.visit_link,
      pricing: {
        price: req.body.pricing.price,
        type: req.body.pricing.type,
        pricing_url: req.body.pricing.pricing_url || '',
        pricing_image: req.body.pricing.pricing_image || ''
      },
      status: req.body.status !== undefined ? req.body.status : false, 
      visit_count: req.body.visit_count !== undefined ? req.body.visit_count : 0, 
      firebase_image_url: req.body.firebase_image_url,
      isFree: req.body.isFree !== undefined ? req.body.isFree : false, 
      isVerified: req.body.isVerified !== undefined ? req.body.isVerified : false, 
      tags: Array.isArray(req.body.tags) ? req.body.tags : [], 
      ranking: req.body.ranking !== undefined ? req.body.ranking : null     
      });

    res.status(201).json(tool);
  } catch (error) {
    console.error("Error adding tool:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//@desc   Get Filter
//@route  GET /homeai
//@access Private
const homeAI = async (req, res) => {
  try {
    const results = await Tool.find({ filter: req.query.filter });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//@desc   Get Tools
//@route  GET /gettool
//@access Private
const getTools = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const rows = req.query.rows || 12;
    const filter = new RegExp(req.query.filter?.trim(), 'i');

    const query = {};

    // console.log("filter",filter)

    if (filter) {
      const category = await Category.findOne({ name: filter });

      query["$or"] = [{ title: filter }, { filter: filter }];

      if (category) query["$or"].push({ category: filter });
    }

    // console.log("query :>> ", query);

    const total = await Tool.countDocuments(query);
    // console.log("total", total);

    const pages = Math.ceil(total / rows) || 1;

    if (page > pages) {
      res.status(400);
      throw new Error("Page limit exceeded!");
    }
    const startIdx = (page - 1) * rows;

    const results = { total, pages, page, result: [] };
    results.result = await Tool.find(query)
      .skip(startIdx)
      .limit(rows)
      .lean();

    for (const tool of results.result) {
      tool.status = tool.status == "true";
      const totalReviews = await Review.countDocuments({ productId: tool._id });
      tool.totalReviews = totalReviews;
    }
    // console.log("results",results)
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// const getAllTool = async (req, res) => {
//   try {
//     const filter = new RegExp(req.query.filter?.trim(), 'i');

//     const query = {};

//     // console.log("filter",filter)

//     if (filter) {
//       const category = await Category.findOne({ name: filter });

//       query["$or"] = [{ title: filter }, { filter: filter }];

//       if (category) query["$or"].push({ category: filter });
//     }

//     const results = await Tool.find(query).lean();

//     for (const tool of results) {
//       tool.status = tool.status == "true";
//       const totalReviews = await Review.countDocuments({ productId: tool._id });
//       tool.totalReviews = totalReviews;
//     }
//     res.json(results);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };


const getToolById = async (req, res) => {
  try {
    const { id } = req.params; 
    console.log("fnJSDFjS", id);
    
    const tool = await Tool.findById(id); 
    console.log('DCMVSVS',tool);
    

    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' }); 
    }

    res.status(200).json(tool);
  } catch (error) {
    console.error('Error fetching tool:', error);
    res.status(500).json({ message: 'Server error', error: error.message }); 
  }
}

const getAllTool = async (req, res) => {
  try {
    // Pagination parameters from the request
    const { page = 1, limit = 10 } = req.query;

    // Aggregate pipeline for retrieving tool data with pagination and returning all fields
    const aggregatePipeline = [
      {
        $lookup: {
          from: 'reviews', 
          localField: '_id', 
          foreignField: 'toolId',
          as: 'reviews' 
        }
      },
      {
        $addFields: {
          totalReviews: { $size: '$reviews' }, 
          averageRating: { $avg: '$reviews.rating' },
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          category: 1,
          categoryId: 1,
          description: 1,
          longDescription: 1,
          visit_link: 1,
          pricing: 1,
          status: 1,
          visit_count: 1,
          firebase_image_url: 1,
          isFree: 1,
          isFeatured: 1,
          isVerified: 1,
          tags: 1,
          ranking: 1,
          slug: 1,
          totalReviews: 1,
          averageRating: { $ifNull: ['$averageRating', 0] },
          createdAt: 1,  // Include timestamps
          updatedAt: 1
        }
      },
      { $skip: (page - 1) * limit }, // Skip based on page number
      { $limit: parseInt(limit) }    // Limit the results to the page size
    ];

    // Execute the aggregate query
    const results = await Tool.aggregate(aggregatePipeline);

    // Total count of documents for pagination
    const totalTools = await Tool.countDocuments();

    // Send response with pagination details
    res.json({
      data: results,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalTools / limit),
      totalTools
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllToolsWithoutPagination = async (req, res) => {
  try {
    // Aggregate pipeline for retrieving tool data without pagination
    const aggregatePipeline = [
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'toolId',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          totalReviews: { $size: '$reviews' },
          averageRating: { $avg: '$reviews.rating' },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          category: 1,
          categoryId: 1,
          description: 1,
          longDescription: 1,
          visit_link: 1,
          pricing: 1,
          status: 1,
          visit_count: 1,
          firebase_image_url: 1,
          isFree: 1,
          isFeatured: 1,
          isVerified: 1,
          tags: 1,
          ranking: 1,
          slug: 1,
          totalReviews: 1,
          averageRating: { $ifNull: ['$averageRating', 0] },
          createdAt: 1, // Include timestamps
          updatedAt: 1,
        },
      },
    ];

    // Execute the aggregate query
    const results = await Tool.aggregate(aggregatePipeline);

    // Send response with the results
    res.json({
      data: results,
      totalTools: results.length, // Total tools returned
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};







//@desc   Update Tool Status
//@route  PUT /updatetoolstatus/:id
//@access Private
const updateToolStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedAI = await Tool.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(updatedAI);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

//@desc   Update Visit Count
//@route  PUT /updateVisitCount/:id
//@access Private
const updateVisitCount = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAI = await Tool.updateOne(
      { _id: id },
      {
        $inc: { visit_count: 1 },
      }
    );
    res.json(updatedAI);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

//@desc   Update Tool Filter
//@route  PUT /ai/:id/updateFilter
//@access Private
const updateFilter = async (req, res) => {
  try {
    const { id } = req.params;
    const { newFilter } = req.body;
    const updatedAI = await Tool.findByIdAndUpdate(
      id,
      { filter: newFilter },
      { new: true }
    );
    res.status(200).json({
      message: "Filter value updated successfully",
      updatedAI: updatedAI,
    });
  } catch (error) {
    console.error("Error updating filter value:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc   Delete Tool
//@route  DELETE /deleteTool/:toolId
//@access Private
const deleteTool = async (req, res) => {
  try {
    const { toolId } = req.params;
    const deletedTool = await Tool.findByIdAndDelete(toolId);
    if (!deletedTool) {
      return res
        .status(404)
        .json({ success: false, message: "Tool not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Tool deleted successfully" });
  } catch (error) {
    console.error("Error deleting tool:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//@desc   Update Tool Data
//@route  PUT /tools/:toolId
//@access Private
const updateToolData = async (req, res) => {
  try {
    const { toolId } = req.params;
    const updatedTool = await Tool.findByIdAndUpdate(toolId, req.body, {
      new: true,
    });
    if (!updatedTool) {
      return res
        .status(404)
        .json({ success: false, message: "Tool not found" });
    }
    res.status(200).json({ success: true, data: updatedTool });
  } catch (error) {
    console.error("Error updating tool data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
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
}