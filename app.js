// IMPORT DEPENDENCIES 
const { json } = require("express");
const express = require("express");

// IMPORT FILES 
const ExpressError = require("./expressError")
const expressError = require("./expressError")
const shoppingRoutes = require("./shoppingRoutes")

// CALL EXPRESS INSTANCE AND SAVE IT TO APP VARIALBE
const app = express();

app.use(express.json())

// CALL OUR ROUTES AND ADD A PREFIXED VARIALBE /items
app.use("/items", shoppingRoutes)








// 404 Error Handler 
app.use((req, res) => {
    return res.json(new ExpressError("Page Not Found", 404))
})

// Generic Error Handler 
app.use((error, req, res, next) => {
    // set a default status code 
    const status = error.status || 500; 
    // return status code and json if Error
    return res.status(status).json({
        error: {
            message: error.message,
            status: error.status
        }
    })
})



// EXPORT APP 
module.exports = app