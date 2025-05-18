const PDFDocument = require("pdfkit");

function generateReceiptPDF(receipt, mentorName, res) {
    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=receipt.pdf");

    doc.pipe(res);

    doc.fontSize(18).text("Mentor Payout Receipt", { align: "center" });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Mentor Name: ${mentorName}`);
    doc.text(`Session Type: ${receipt.sessionType}`);
    doc.text(`Session Date: ${new Date(receipt.sessionDate).toDateString()}`);
    doc.text(`Duration (minutes): ${receipt.durationMinute}`);
    doc.text(`Rate per Hour: ₹${receipt.ratePerHour}`);
    doc.text(`Base Amount: ₹${receipt.baseAmount.toFixed(2)}`);
    doc.text(`Platform Fee: ₹${receipt.platformFee.toFixed(2)}`);
    doc.text(`GST: ₹${receipt.gst.toFixed(2)}`);
    doc.text(`Total Deductions: ₹${receipt.totalDeductions.toFixed(2)}`);
    doc.text(`Final Amount: ₹${receipt.finalAmount.toFixed(2)}`);
    doc.text(`Status: ${receipt.status}`);
    doc.text(
        `Receipt Generated At: ${new Date(
            receipt.receiptGeneratedAt
        ).toLocaleString()}`
    );

    doc.end();
}

module.exports = generateReceiptPDF;
