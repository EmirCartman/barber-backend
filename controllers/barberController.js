const Barber = require("../models/Barber");

// Berber oluşturma
const ekleBerber = async (req, res) => {
  const { services } = req.body;

  try {
    const barber = new Barber({ user: req.user.id, services });
    await barber.save();
    res.status(201).json(barber);
  } catch (error) {
    res.status(500).json({ message: "Berber oluşturulurken hata oluştu." });
  }
};

// Tüm berberleri listeleme
const listeleBerberler = async (req, res) => {
  try {
    const barbers = await Barber.find().populate("user", "name email");
    res.json(barbers);
  } catch (error) {
    res.status(500).json({ message: "Berberler listelenirken hata oluştu." });
  }
};

// Belirli berberi getirme
const getirBerber = async (req, res) => {
  try {
    const barber = await Barber.findById(req.params.id).populate("user", "name email");
    if (!barber) return res.status(404).json({ message: "Berber bulunamadı" });

    res.json(barber);
  } catch (error) {
    res.status(500).json({ message: "Profil getirilemedi." });
  }
};

module.exports = { ekleBerber, listeleBerberler, getirBerber };
