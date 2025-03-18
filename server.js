require("dotenv").config(); // .env dosyasını kullanmak için
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');  // Kullanıcı modelini import ediyoruz





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



// Kullanıcı kaydı API'si
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Tüm alanların doldurulup doldurulmadığını kontrol et
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun.' });
  }

  // E-posta ile kullanıcı var mı kontrol et
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Bu e-posta ile kayıtlı bir kullanıcı var.' });
  }

  // Şifreyi hash'leme
  const hashedPassword = await bcrypt.hash(password, 10);

  // Yeni kullanıcı oluşturma
  const newUser = new User({
    username,
    email,
    password: hashedPassword
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi!' });
  } catch (err) {
    res.status(500).json({ message: 'Bir hata oluştu.', error: err });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // E-posta ile kullanıcıyı bul
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'E-posta veya şifre yanlış.' });
  }

  // Şifreyi doğrula
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'E-posta veya şifre yanlış.' });
  }

  // JWT token oluştur
  const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });

  // Kullanıcıya token gönder
  res.status(200).json({ message: 'Giriş başarılı', token });
});
