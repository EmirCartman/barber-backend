const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const Barber = require('../models/barberModel');

// 🔹 Tüm berberleri listele (Admin)
router.get('/barbers', protect, admin, async (req, res) => {
  try {
    const barbers = await Barber.find({});
    res.json(barbers);
  } catch (error) {
    res.status(500).json({ message: 'Berberleri getirirken hata oluştu', error: error.message });
  }
});

// 🔹 Yeni berber ekle (Admin)
router.post('/barbers', protect, admin, async (req, res) => {
  try {
    const { name, location, services } = req.body;
    const newBarber = new Barber({ name, location, services });
    const savedBarber = await newBarber.save();
    res.status(201).json(savedBarber);
  } catch (error) {
    res.status(400).json({ message: 'Berber eklenirken hata oluştu', error: error.message });
  }
});

// 🔹 Berber bilgilerini güncelle (Admin)
router.put('/barbers/:id', protect, admin, async (req, res) => {
  try {
    const { name, location, services } = req.body;
    const updatedBarber = await Barber.findByIdAndUpdate(
      req.params.id,
      { name, location, services },
      { new: true, runValidators: true }
    );

    if (!updatedBarber) {
      return res.status(404).json({ message: 'Berber bulunamadı' });
    }

    res.json(updatedBarber);
  } catch (error) {
    res.status(400).json({ message: 'Berber güncellenirken hata oluştu', error: error.message });
  }
});

// 🔹 Berberi sil (Admin)
router.delete('/barbers/:id', protect, admin, async (req, res) => {
  try {
    const barber = await Barber.findByIdAndDelete(req.params.id);
    if (!barber) {
      return res.status(404).json({ message: 'Berber bulunamadı' });
    }
    res.json({ message: 'Berber başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Berber silinirken hata oluştu', error: error.message });
  }
});

module.exports = router;
