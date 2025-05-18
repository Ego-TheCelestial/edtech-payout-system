const mongoose = require("mongoose");

const ReceiptSchema = new mongoose.Schema(
    {
        mentorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mentor",
            required: true,
        },
        sessionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session",
            required: true,
        },
        sessionDate: Date,
        sessionType: String,
        durationMinute: Number,
        ratePerHour: Number,
        baseAmount: Number,
        platformFee: Number,
        gst: Number,
        totalDeductions: Number,
        finalAmount: Number,
        status: String,
        receiptGeneratedAt: Date,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Receipt", ReceiptSchema);
