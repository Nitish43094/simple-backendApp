// const mongoose = require("mongoose")
// require('dotenv').config()
// let isConnected = false;

// const dbConnection = async()=>{
//     if (isConnected) {
//         return;
//     }

//     try {
//         const db = await mongoose.connect(process.env.DATABASE_URL, {
//             bufferCommands: false, // 🔥 IMPORTANT
//         });

//         isConnected = db.connections[0].readyState;
//         console.log("MongoDB Connected");
//     } catch (error) {
//         console.error("MongoDB connection failed:", error.message);
//         throw error;
//     }
// }

// module.exports = dbConnection;



const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const dbConnection = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.DATABASE_URL, {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
        }).then((mongoose) => {
            console.log("MongoDB Connected");
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

module.exports = dbConnection;
