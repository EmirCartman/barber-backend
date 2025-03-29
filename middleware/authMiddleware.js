const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // User modelin varsa bunu kullan


// Kullanıcı doğrulama middleware'i
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Yetkisiz, kullanıcı bulunamadı' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Yetkisiz, token geçersiz' });
    }
  } else {
    res.status(401).json({ message: 'Yetkisiz, token eksik' });
  }
};

// Admin yetkilendirme middleware'i
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Yetkisiz, admin izni gerekli' });
  }
};

module.exports = { protect, admin };
