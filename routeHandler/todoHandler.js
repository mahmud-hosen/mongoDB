/*
Note: 

1) Create a schema from mongoose schema class
2) Create a model using schema
3) Create a document using model class
4) model instance method using document

*/
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");


const checkLogin = require("../middlewares/checkLogin");

const Todo = new mongoose.model("Todo", todoSchema);  // Create a model using schema

// Get A TODO --- using find
router.get("/", checkLogin, async (req, res) => {
  console.log(req)
  try {
    const result = await Todo.find({ status: "active" }).select({
      _id: 0,
      __v: 0,
      date: 0
    }).limit(100);

    res.status(200).json({
      result: result,
      message: "successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});


// Insert a Todo
router.post("/", async (req, res) => {
  try {
    const result = await new Todo(req.body);  // Create a document using model class
          result.save();                      // build in model instance method using document 
    res.status(200).json({
      result: result,
      message: "Todo was inserted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

// POST MULTIPLE TODO
router.post("/all", async (req, res) => {
  try {
    const result = await Todo.insertMany(req.body);
    
    res.status(200).json({
      result: result,
      message: "Many todos inserted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});


// Update One
//http://localhost:3000/todo/64db7cf4e0f799219ae52d87
router.put("/:id", async (req, res) => {
  try {
    const result = await Todo.updateOne({ _id: req.params.id }, {
      $set: {
        status: 'inactive'
      }
    });


    console.log(result)

    res.status(200).json({
      result: result,
      message: "Todo was update successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});


// Delete A TODO 
router.delete("/:delete_id", async (req, res) => {
  try {
    const result = await Todo.deleteOne({ _id: req.params.delete_id });

    res.status(200).json({
      result: result,
      message: "Todo was successfully delete!",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});


// Custom instance method 
router.get("/activetodo", async (req, res) => {
  try {
    const todo = new Todo();   // todo is instance for Todo model  then get document todo
    const result = await todo.findActive(); //Custom instance method 'findActive'

    res.status(200).json({
      result: result,
      message: " Active Todo was find!",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});


// Custom static method 
router.get("/findbystatic", async (req, res) => {
  try {
    const result = await Todo.findByStatic(); //Custom static method 'findByStatic' call by Model 'Todo' 

    res.status(200).json({
      result: result,
      message: "Active Todo was find using findbystatic.",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});


// Custom Query Helper Method 
router.get("/findByQueryHelper", async (req, res) => {
  try {
    const result = await Todo.find().findByQueryHelper("inactive"); //Custom static method 'findByStatic' call by Model 'Todo' 

    res.status(200).json({
      result: result,
      message: " Todo was find using findByQueryHelper method.",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});








module.exports = router;
