const mongoose = require("mongoose");

const PayoutSchema = new mongoose.Schema(
    {
        mentorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mentor",
            required: true,
        },
        sessionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session",
        },
        baseAmount: Number,
        platformFee: Number,
        gst: Number,
        otherDeductions: Number,
        finalAmount: Number,
        receiptUrl: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Payout", PayoutSchema);
