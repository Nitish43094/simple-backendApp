const mongoose = require("mongoose")
require('dotenv').config()

const dbConnection = async()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("Connection Successfully")
    })
    .catch((error) =>{
        console.log("Database Connection Error")
        console.error(error.message)
    })
}

module.exports = dbConnection;
