const Barber = require("../models/Barber");

// Berber oluşturma
const ekleBerber = async (req, res) => {
  const { name, location, services } = req.body;

  // Eksik alan kontrolü
  if (!name || !location || !services) {
    return res.status(400).json({ message: "Lütfen name, location ve services bilgilerini eksiksiz gönderin." });
  }

  try {
    console.log("Gelen veriler:", req.body);

    const barber = new Barber({ user: req.user.id, name, location, services });
    await barber.save();

    res.status(201).json(barber);
  } catch (error) {
    console.error("Berber oluşturma hatası:", error);
    res.status(500).json({ message: "Berber oluşturulurken hata oluştu.", error: error.message });
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
    console.error("Hata Detayı:", error); // Gerçek hata mesajını göster
    res.status(500).json({ message: "Profil getirilemedi.", error: error.message });
  }
};


module.exports = { ekleBerber, listeleBerberler, getirBerber };
