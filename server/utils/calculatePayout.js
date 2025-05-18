function calculatePayout(durationMinute, ratePerHour) {
    const ratePerMinute = ratePerHour / 60;
    const baseAmount = durationMinute * ratePerMinute;

    const platformFeePercent = 10;
    const gstPercent = 18;

    const platformFee = (platformFeePercent / 100) * baseAmount;
    const gst = (gstPercent / 100) * baseAmount;

    const totalDeductions = platformFee + gst;
    const finalAmount = baseAmount - totalDeductions;

    return {
        baseAmount: Math.round(baseAmount),
        platformFee: Math.round(platformFee),
        gst: Math.round(gst),
        totalDeductions: Math.round(totalDeductions),
        finalAmount: Math.round(finalAmount),
    };
}

module.exports = calculatePayout;
