const express = require("express");

const router = express.Router();

const ExpressError = require("./expressError");
const Items = require("./fakeDatabase")




// GENERATE ROUTES 

// NOTE: WE ARE GOING TO ADD  PREFIX VARIABLE (ITMES) TO ROUTES IN APP.JS SO 
// WE ARE STARTING OUR ROUTES WITH / 

// 1. GET ROUTE ITEMS
router.get("/", (req, res, next) =>{
    try{
        if(Items.length === 0){
        return res.json(new ExpressError( "No Item in DATABASE"))
        }
        return res.json({ Items })
    }catch(error){
        next(error)
    }

})

// 2. POST ROUTE ITEMS
router.post("/", (req, res, next) =>{
    try{
        if (!req.body.name || !req.body.price){
            throw new ExpressError("Please a Valid Name and Price", 400)
            }
            const addItem = {name: req.body.name, price: req.body.price}
            Items.push(addItem)
            return res.status(201).json({item: addItem})
    }catch(error){
        next(error)
    }
})

// 3. GET ROUTE ITEMS / BY NAME 
router.get("/:name", (req, res, next) => {
try{
    const item = Items.find(i => i.name === req.params.name)
    if (item === undefined){
        throw new ExpressError("Item Not Found", 404)
    } 
    return res.json({ item })
}catch(error){
    next(error)
}
})

// 4. PATCH ROUTE ITEMS / BY NAME TO EDIT 
router.patch("/:name", (req, res, next) => {
    try{
        const findItem = Items.find(i => i.name === req.params.name)
        if (findItem === undefined){
            throw new ExpressError("Item Not Found", 404)
        } 
        findItem.name = req.body.name
        findItem.price = req.body.price
        return res.json({findItem})
    }catch(error){
        next(error)
    }
})

// 5. DELETE ROUTE ITEMS / BY NAME 
router.delete("/:name", (req, res) => {
try{
    const findItem = Items.findIndex(i => i.name === req.params.name)
    if (findItem === undefined){
        throw new ExpressError("Item Not Found", 404)
    } 
    Items.splice(findItem, 1)
    return res.json({message: "Item Deleted"})
}catch(error){
    next(error)
}
})



module.exports = router