const express = require("express");
const router = express.Router();
const vendorCtrl = require("../controllers/vendorController");

router.post("/add", vendorCtrl.addVendor);
router.get("/", vendorCtrl.getVendors);
router.put("/update/:id", vendorCtrl.updateVendor);
router.delete("/delete/:id", vendorCtrl.deleteVendor);

module.exports = router;