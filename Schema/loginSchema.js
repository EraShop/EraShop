const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  ballance: Number,
  dateCreated: Date,
  token: String,
  cart: [],
  ownedItems: [],
});

module.exports = mongoose.model('Login', loginSchema, 'Login'); 