const mongoose = require("mongoose");

const barberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: false },
  services: [{ type: String }], // Berberin sunduğu hizmetler
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
      rating: Number,
      comment: String
    }
  ], // Müşteri puanları ve yorumlar
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const Barber = mongoose.model("Barber", barberSchema);
module.exports = Barber;