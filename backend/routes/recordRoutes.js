const express = require("express");
const router = express.Router();
const { getRecords, setRecord } = require("../controllers/recordController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getRecords);
router.post("/game", protect, setRecord);

module.exports = router;
