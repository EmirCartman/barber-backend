const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // User modelini dahil et

// Kullanıcı oluşturma (register)
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun.' });
  }

  try {
    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    await newUser.save();
    res.status(201).json({
      message: 'Kullanıcı başarıyla kaydedildi',
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Bir hata oluştu.', error });
  }
};

// Kullanıcıları listeleme
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Bir hata oluştu.', error });
  }
};

// Kullanıcı girişi (login)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun.' });
  }

  try {
    // Kullanıcıyı email ile bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // Şifreyi kontrol et
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Şifre hatalı.' });
    }

    // JWT token oluştur
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // payload (kullanıcı id'si ve rolü)
      'secretkey', // bu kısmı güvenli bir şekilde saklamalısın
      { expiresIn: '1h' } // token geçerlilik süresi
    );

    res.status(200).json({
      message: 'Giriş başarılı!',
      token, // token'ı döndürüyoruz
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Bir hata oluştu.', error });
  }
};

module.exports = { createUser, getUsers, loginUser };
