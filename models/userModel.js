const mongoose = require('mongoose');

// Eğer model zaten tanımlıysa tekrar tanımlama!
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'barber', 'customer'],
    default: 'customer',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}));

module.exports = User;
