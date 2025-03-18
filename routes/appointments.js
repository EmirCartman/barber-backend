const express = require("express");
const Appointment = require("../models/Appointment");
const router = express.Router();

router.post("/book", async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json({ message: "Randevu alındı!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
