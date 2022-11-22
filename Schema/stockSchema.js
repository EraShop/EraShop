const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  name: String,
  price: Number,
  state: String,
  file: String
});

module.exports = mongoose.model('Stock', stockSchema, 'Stock');