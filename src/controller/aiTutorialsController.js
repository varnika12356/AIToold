const AITutorial = require('../schema/aiTutorials'); 


// Create a new tutorial
const createTutorial = async (req, res) => {
  try {
    const { toolId, tutorialUrl } = req.body;

    const newTutorial = new AITutorial({ toolId, tutorialUrl });
    await newTutorial.save();

    res.status(201).json(newTutorial);
  } catch (error) {
    console.error("Error creating tutorial:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all tutorials
// const getAllTutorials = async (req, res) => {
//   try {
//     const tutorials = await AITutorial.find()
//     res.status(200).json(tutorials);
//   } catch (error) {
//     console.error("Error fetching tutorials:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const getAllTutorials = async (req, res) => {
  try {
    // Extract page and limit from query parameters
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to limit of 10 if not provided

    // Calculate the offset
    const offset = (page - 1) * limit;

    // Fetch the tutorials with pagination
    const tutorials = await AITutorial.find()
      .skip(offset)
      .limit(limit);

    // Count the total number of tutorials
    const totalTutorials = await AITutorial.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalTutorials / limit);

    // Respond with the paginated tutorials and total pages
    res.status(200).json({
      tutorials,
      totalPages,
      currentPage: page,
      totalItems: totalTutorials,
    });
  } catch (error) {
    console.error("Error fetching tutorials:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Get a tutorial by ID
const getTutorialById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('rgjaGjJs',id);
    
    const tutorial = await AITutorial.findById(id);

    if (!tutorial) {
      return res.status(404).json({ error: "Tutorial not found" });
    }

    res.status(200).json(tutorial);
  } catch (error) {
    console.error("Error fetching tutorial:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a tutorial
const updateTutorial = async (req, res) => {
  try {
    const { id } = req.params;
    const { toolId, tutorialUrl } = req.body;

    const updatedTutorial = await AITutorial.findByIdAndUpdate(
      id,
      { toolId, tutorialUrl },
      { new: true } // Return the updated document
    );

    if (!updatedTutorial) {
      return res.status(404).json({ error: "Tutorial not found" });
    }

    res.status(200).json(updatedTutorial);
  } catch (error) {
    console.error("Error updating tutorial:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a tutorial
const deleteTutorial = async (req, res) => {
  try {
    const { id } = req.params;
console.log(id);

    const deletedTutorial = await AITutorial.findByIdAndDelete(id);

    if (!deletedTutorial) {
        console.log("dnfjdnD");
        
      return res.status(404).json({ error: "Tutorial not found" });
    }

    res.status(204).send(); 
  } catch (error) {
    console.error("Error deleting tutorial:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createTutorial,
  getAllTutorials,
  getTutorialById,
  updateTutorial,
  deleteTutorial,
};
