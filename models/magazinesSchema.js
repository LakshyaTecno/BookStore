const mongoose = require("mongoose");
const magazineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  authors: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("magazine", magazineSchema);
