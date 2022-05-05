const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  ballance: Number,
  dateCreated: Date,
  state: String,
  token: String,
  cart: [],
  ownedItems: [],
});

module.exports = mongoose.model('Login', loginSchema, 'Login'); 