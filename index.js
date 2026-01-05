const express = require('express')
const dbConnection = require('./config/dbConnect')
const app = express();
app.use(express.json())
require('dotenv').config();
const PORT = process.env.PORT || 4000
dbConnection();
app.get('/',(req,res)=>{
    res.send(`<h1>This is backend home page and added database and models</h1>`)
})

app.listen(PORT,()=>{
    console.log("The server started at Port ",PORT)
})