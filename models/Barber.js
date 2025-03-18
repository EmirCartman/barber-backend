const mongoose = require("mongoose");

const barberSchema = new mongoose.Schema({
  isim: { type: String, required: true },
  lokasyon: { type: String, required: true },
  hizmetler: [{ type: String }], // Berberin sunduğu hizmetler
  ratings: [{ customer: String, rating: Number, comment: String }], // Müşteri puanları ve yorumlar
  createdAt: { type: Date, default: Date.now }
});

const Barber = mongoose.model("Barber", barberSchema);
module.exports = Barber;