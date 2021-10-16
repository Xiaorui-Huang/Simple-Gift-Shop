const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const multer = require("multer");

const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "routes/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products: products });
    // res.status(200).render("imagesPage", { items: products });
  } catch (err) {
    res.status(500).send("An error occurred", err);
  }
});

router.post("/", upload.single("image"), async (req, res, next) => {
  const filePath = path.join(__dirname + "/uploads/" + req.file.filename);
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: {
      data: fs.readFileSync(filePath),
      contentType: "image/png",
    },
  });
  try {
    const newImg = await product.save();
    fs.unlinkSync(filePath);
    res.status(201).json({ success: "image saved" });
  } catch (err) {
    fs.unlinkSync(filePath);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
