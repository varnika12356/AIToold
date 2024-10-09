const mongoose = require("mongoose");
const Tool = require('./schema/tool'); 

mongoose.connect('mongodb+srv://aditya:1234567890@cluster0.oje5zln.mongodb.net/ai_tools', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Error connecting to MongoDB", err));

async function updateTools() {
  try {
    let rankingCounter = 1;

    const tools = await Tool.find({});

    for (const tool of tools) {
      await Tool.updateOne(
        { _id: tool._id },
        {
          $set: {
            longDescription: tool.longDescription || "",  
            isFree: tool.isFree || false,       
            isVerified: tool.isVerified || false,    
            tags: tool.tags || [],             
            "pricing.type": tool.pricing?.type || "freemium",  
            "pricing.pricing_url": tool.pricing?.pricing_url || "",
            "pricing.pricing_image": tool.pricing?.pricing_image || "", 
            filter: tool.filter || "new",
            ranking: rankingCounter 
          }
        }
      );
      rankingCounter++;  
    }

    console.log(`${rankingCounter - 1} tools were updated with ranking and new pricing fields`);
  } catch (err) {
    console.error('Error updating tools:', err);
  } finally {
    mongoose.connection.close(); 
  }
}

updateTools();
