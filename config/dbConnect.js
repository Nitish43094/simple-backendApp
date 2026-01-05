const mongoose = require("mongoose")
require('dotenv').config()
let isConnected = false;

const dbConnection = async()=>{
    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(process.env.DATABASE_URL, {
            bufferCommands: false, // 🔥 IMPORTANT
        });

        isConnected = db.connections[0].readyState;
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
}

module.exports = dbConnection;
