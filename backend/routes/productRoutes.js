const express = require("express");
const productCtrl = require("../controllers/itemController");

const router = express.Router();

router.post("/add", productCtrl.createProduct);
router.get("/", productCtrl.getProduct);
router.put("/update/:id", productCtrl.updateProduct);
router.delete("/delete/:id", productCtrl.deleteProduct)

module.exports = router;