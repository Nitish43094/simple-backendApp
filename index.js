const express = require('express')
const dbConnection = require('./config/dbConnect');
const route = require('./routes/blogs');
const app = express();
app.use(express.json())
require('dotenv').config();
const PORT = process.env.PORT || 4000
// dbConnection();
let dbReadyPromise;

if (!dbReadyPromise) {
    dbReadyPromise = dbConnection();
}
app.use(async (req, res, next) => {
    try {
        await dbReadyPromise; // wait only first time
        next();
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Database unavailable",
        });
    }
});
app.get('/',(req,res)=>{
    res.send(`<h1>This is backend home page and added database and models change  db</h1>`)
})
app.use("/api/v1",route)
app.listen(PORT,()=>{
    console.log("The server started at Port ",PORT)
})