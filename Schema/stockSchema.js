const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

module.exports = mongoose.model('Stock', stockSchema, 'Stock');