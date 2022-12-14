const mongoose = require("mongoose");
const authorSchema = new mongoose.Schema({
    email: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model("author", authorSchema);