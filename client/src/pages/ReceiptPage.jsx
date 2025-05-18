import React, { useEffect, useState } from "react";
import axios from "axios";

const ReceiptPage = () => {
    const [receipts, setReceipts] = useState([]);
    const mentorId = "68276826e08d7244306b42cb"; // Replace with dynamic ID later if needed

    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/receipts/mentor/${mentorId}`
                );
                setReceipts(res.data.receipts);
            } catch (err) {
                console.error("Error fetching receipts:", err);
            }
        };

        fetchReceipts();
    }, []);

    const markAsPaid = async (receiptId) => {
        try {
            await axios.put(
                `http://localhost:5000/api/receipts/${receiptId}/status`,
                {
                    status: "Paid",
                }
            );
            alert("Receipt marked as Paid!");

            // Update local state
            setReceipts((prevReceipts) =>
                prevReceipts.map((receipt) =>
                    receipt._id === receiptId
                        ? { ...receipt, status: "Paid" }
                        : receipt
                )
            );
        } catch (err) {
            console.error("Error marking receipt as paid:", err);
            alert("Failed to update status");
        }
    };

    const downloadReceipt = async (receiptId) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/receipts/${receiptId}/download`,
                {
                    responseType: "blob", // Important for downloading files
                }
            );

            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `receipt_${receiptId}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Error downloading receipt:", err);
            alert("Failed to download receipt");
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Receipts</h2>
            {receipts.length === 0 ? (
                <p>No receipts found.</p>
            ) : (
                <div className="space-y-4">
                    {receipts.map((receipt) => (
                        <div
                            key={receipt._id}
                            className="border p-4 rounded shadow flex justify-between items-center"
                        >
                            <div>
                                <p>
                                    <strong>Session Type:</strong>{" "}
                                    {receipt.sessionType}
                                </p>
                                <p>
                                    <strong>Date:</strong>{" "}
                                    {new Date(
                                        receipt.sessionDate
                                    ).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Final Amount:</strong> ₹
                                    {receipt.finalAmount}
                                </p>
                                <p>
                                    <strong>Status:</strong> {receipt.status}
                                </p>
                            </div>
                            {receipt.status === "Paid" ? (
                                <button
                                    onClick={() => downloadReceipt(receipt._id)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                    Download Receipt
                                </button>
                            ) : (
                                <button
                                    onClick={() => markAsPaid(receipt._id)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                >
                                    Mark as Paid
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReceiptPage;
