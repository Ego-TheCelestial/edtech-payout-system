// server/routes/receiptRouter.js
const express = require("express");
const router = express.Router();

const Session = require("../models/Session");
const Receipt = require("../models/Receipt");
const Mentor = require("../models/Mentor");

const calculatePayout = require("../utils/calculatePayout"); // tax + fee math
const generateReceiptObj = require("../utils/receiptGenerator"); // returns plain object
const generateReceiptPDF = require("../utils/generateReceiptPDF"); // streams PDF into res

/* -----------------------------------------------------------
   1) POST  /api/receipts/generate
      Body: { "sessionId": "<Session _id>" }
      Creates a receipt in MongoDB and returns it
----------------------------------------------------------- */
router.post("/generate", async (req, res) => {
    try {
        const { sessionId } = req.body;
        if (!sessionId) {
            return res
                .status(400)
                .json({ success: false, error: "sessionId is required" });
        }

        // 1. Fetch session
        const session = await Session.findById(sessionId);
        if (!session) {
            return res
                .status(404)
                .json({ success: false, error: "Session not found" });
        }

        // 2. Calculate payout breakdown
        const breakdown = calculatePayout(
            session.durationMinutes,
            session.ratePerHour
        );

        // 3. Create receipt plain object
        const receiptData = generateReceiptObj(session, breakdown);

        // 4. Persist to DB
        const newReceipt = await Receipt.create({
            ...receiptData,
            sessionId: session._id,
        });

        res.status(201).json({ success: true, receipt: newReceipt });
    } catch (err) {
        console.error("Receipt generation error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

/* -----------------------------------------------------------
   2) GET /api/receipts/:id/download
      Streams a PDF version of the receipt for download
----------------------------------------------------------- */
router.get("/:id/download", async (req, res) => {
    try {
        const receipt = await Receipt.findById(req.params.id);
        if (!receipt) {
            return res
                .status(404)
                .json({ success: false, error: "Receipt not found" });
        }

        const mentor = await Mentor.findById(receipt.mentorId);
        const mentorName = mentor ? mentor.name : "Unknown Mentor";

        // generateReceiptPDF writes directly to the response stream
        generateReceiptPDF(receipt, mentorName, res);
    } catch (err) {
        console.error("PDF download error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

/* -----------------------------------------------------------
   3) GET /api/receipts/mentor/:mentorId
      Returns all receipts for a single mentor
----------------------------------------------------------- */
router.get("/mentor/:mentorId", async (req, res) => {
    try {
        const receipts = await Receipt.find({
            mentorId: req.params.mentorId,
        }).sort({ receiptGeneratedAt: -1 });
        res.json({ success: true, receipts });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// PUT /api/receipts/:id/status
router.put('/:id/status', async (req, res) => {
    try {
        const receiptId = req.params.id;
        const { status } = req.body;

        if (!['Pending', 'Paid', 'Under Review'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        const updatedReceipt = await Receipt.findByIdAndUpdate(
            receiptId,
            { status },
            { new: true }
        );

        if (!updatedReceipt) {
            return res.status(404).json({ error: 'Receipt not found' });
        }

        res.json(updatedReceipt);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


router.get("/:id", async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id);

    if (!receipt) {
      return res.status(404).json({ success: false, message: "Receipt not found" });
    }

    res.status(200).json({ success: true, receipt });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
