const express = require("express");
const router = express.Router();
const path = require("path");

const Perfil = require("../models/Perfil");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/upload/:url', upload.single("image"), (req, res) => {
  const { url } = req.params;
  const fileName = req.file.filename
  Perfil.updateImage(url, fileName);
  res.redirect(`/perfil/${url}`)
});

module.exports = router;