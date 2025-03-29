const express = require("express");
const router = express.Router();
const { ekleBerber, listeleBerberler, getirBerber } = require("../controllers/barberController");
const authMiddleware = require("../middleware/authMiddleware"); // Eğer JWT kontrolü gerekiyorsa bunu da ekle

// Yeni berber ekleme - Giriş yapılmış kullanıcılar için
router.post("/", authMiddleware, ekleBerber);

// Tüm berberleri listeleme - Herkese açık
router.get("/", listeleBerberler);

// Belirli berberi ID ile getirme - Herkese açık
router.get("/:id", getirBerber);

module.exports = router;
