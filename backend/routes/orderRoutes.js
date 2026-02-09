const express = require("express");
const router = express.Router();
const orderCtrl = require("../controllers/orderController");

router.post("/add", orderCtrl.createOrder);
router.get("/", orderCtrl.getOrders);
router.put("/update/:id", orderCtrl.updateOrder);

module.exports = router;