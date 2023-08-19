const mongoose = require("mongoose");
 
// Create a schema from mongoose schema class
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Custom instance method
todoSchema.methods = {
  findActive: function() {
    return mongoose.model("Todo").find({ status: "active" });
  }
}

// Custom instance method
todoSchema.statics = {
  findByStatic: function() {
    return this.find({ status: "active" });
  }
}

// Custom Query Helper method
todoSchema.query = {
  findByQueryHelper: function(value) {
    return this.find({ status: value });
  }
}

module.exports = todoSchema;