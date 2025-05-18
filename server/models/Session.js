const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema(
    {
        mentorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mentor",
            required: true,
        },
        sessionType: {
            type: String,
            enum: ["Live", "Evaluation", "Review"],
            required: true,
        },
        sessionDate: {
            type: Date,
            required: true,
        },
        durationMinutes: {
            type: Number,
            required: true,
        },
        ratePerHour: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Paid", "Under Review"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Session", SessionSchema);
