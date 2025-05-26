const express = require("express");
const router = express.Router();
const controller = require("../Controllers/PaymentControllers/UserReciptsSubCon"); // Import controller

router.post("/create", controller.createReceipt);
router.get("/all", controller.getAllReceipts);
router.get("/user/:userId", controller.getReceiptsByUser);
router.patch("/status/:id", controller.updateReceiptStatus);
router.delete("/:id", controller.deleteReceipt);

module.exports = router;
