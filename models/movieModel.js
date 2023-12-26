const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  publishingYear: {
    type: Number,
    required: true,
  },
  poster: {
    data: Buffer, 
    contentType: String, 
  },
  userId: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
