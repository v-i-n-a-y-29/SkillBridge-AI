const mongoose = require('mongoose')

async function connectToDb() {
    try {
        if (!process.env.MONGODB_URI) {
            console.error("❌ MONGODB_URI environment variable is missing!")
            return
        }
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("✅ Connected to MongoDB database successfully")
    }
    catch (err) {
        console.error("❌ Failed to connect to MongoDB database:", err.message)
    }
}

module.exports = connectToDb