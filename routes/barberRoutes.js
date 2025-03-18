const express = require("express");
const router = express.Router();
const { ekleBerber, listeleBerberler, getirBerber } = require("../controllers/barberController");

// Yeni berber ekleme
router.post("/", ekleBerber);

// Tüm berberleri listeleme
router.get("/", listeleBerberler);

// Belirli berberi ID ile getirme
router.get("/:id", getirBerber);

module.exports = router;
