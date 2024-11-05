const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema(
    
        {
            email: { type: String },
            username: { type: String },
            password: { type: String },
          },
          { timestamps: true }
    
)


const AdminProfile = mongoose.model("AdminProfile", adminSchema );
module.exports = AdminProfile