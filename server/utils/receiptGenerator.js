function generateReceipt(session, breakdown) {
    return {
        mentorId: session.mentorId,
        sessionDate: session.sessionDate,
        sessionType: session.sessionType,
        durationMinute: session.durationMinute,
        ratePerHour: session.ratePerHour,
        baseAmount: breakdown.baseAmount,
        platformFee: breakdown.platformFee,
        gst: breakdown.gst,
        totalDeductions: breakdown.totalDeductions,
        finalAmount: breakdown.finalAmount,
        status: session.status,
        receiptGeneratedAt: new Date(),
    };
}

module.exports = generateReceipt;
