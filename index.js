const express = require('express')
const app = express();
app.use(express.json())
require('dotenv').config();
const PORT = process.env.PORT || 4000
app.get('/',(req,res)=>{
    res.send(`<h1>This is backend home page</h1>`)
})

app.listen(PORT,()=>{
    console.log("The server started at Port ",PORT)
})