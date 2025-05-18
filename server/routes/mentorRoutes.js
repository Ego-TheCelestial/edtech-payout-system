const express = require("express");
const router = express.Router();
const Mentor = require("../models/Mentor");
const Session = require("../models/Session");

router.post("/add", async (req, res) => {
    try {
        const { name, email, defaultRatePerHour } = req.body;
        const mentor = new Mentor({ name, email, defaultRatePerHour });
        await mentor.save();
        res.status(201).json({ success: true, mentor });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get("/all", async (req, res) => {
    try {
        const mentor = await Mentor.find();
        res.status(200).json({ success: true, mentor });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get("/:mentorId/sessions", async (req, res) => {
    try {
        const mentorId = req.params.mentorId;
        const sessions = await Session.find({ mentorId }).sort({
            sessionDate: -1,
        });
        res.status(200).json({ success: true, sessions });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
