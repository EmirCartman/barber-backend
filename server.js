require("dotenv").config(); // .env dosyasını kullanmak için

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; // Çevresel değişkeni kullan

if (!MONGO_URI) {
  console.error("❌ Hata: MONGO_URI tanımlı değil!");
  process.exit(1); // Uygulamayı durdur
}

// MongoDB Atlas'a bağlan
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB bağlantısı başarılı"))
  .catch(err => console.error("❌ Veritabanı bağlantı hatası:", err));


  

app.get("/", (req, res) => {
  res.send("Backend çalışıyor!"); 
});

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const barberRoutes = require("./routes/barberRoutes"); // Barber routes doğru şekilde import edilmelidir
app.use("/api/barbers", barberRoutes); // Barber routes doğru şekilde kullanılıyor

app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
});

