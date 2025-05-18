const express = require("express");
const router = express.Router();
const calculatePayout = require("../utils/calculatePayout");
const generateReceipt = require("../utils/receiptGenerator");
const Session = require("../models/Session");

router.post("/add", async (req, res) => {
    try {
        const {
            mentorId,
            sessionType,
            sessionDate,
            durationMinutes,
            ratePerHour,
        } = req.body;
        const session = new Session({
            mentorId,
            sessionType,
            sessionDate,
            durationMinutes,
            ratePerHour,
        });
        await session.save();
        res.status(201).json({ success: true, session });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.post("/calculate", async (req, res) => {
    try {
        const { durationMinute, ratePerHour } = req.body;

        if (!durationMinute || !ratePerHour) {
            return res.status(400).json({ error: "Missing duration or rate" });
        }

        const breakdown = calculatePayout(durationMinute, ratePerHour);

        res.json({
            success: true,
            breakdown,
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});



router.get("/receipt/:id", async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ success: false, error: "Session not found" });
        }

        const breakdown = calculatePayout(session.durationMinutes, session.ratePerHour);

        const receipt = generateReceipt(session, breakdown);

        res.json({ success: true, receipt });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


router.get("/all", async (req, res) => {
    try {
        const sessions = await Session.find().populate(
            "mentorId",
            "name email"
        );
        res.status(200).json({ success: true, sessions });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;