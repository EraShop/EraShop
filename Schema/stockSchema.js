const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  material: String,
  origin: String,
  photos: Number
});

module.exports = mongoose.model('Stock', stockSchema, 'Stock');