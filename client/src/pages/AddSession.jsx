import { useState } from "react";
import axios from "axios";

const AddSession = () => {
    const [formData, setFormData] = useState({
        mentorId: "",
        sessionType: "",
        sessionDate: "",
        durationMinutes: "",
        ratePerHour: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const sessionRes = await axios.post(
                "http://localhost:5000/api/sessions/add",
                formData
            );
            const sessionId = sessionRes.data.session._id;
            console.log(sessionId);
            await axios.post("http://localhost:5000/api/receipts/generate", {
                sessionId,
            });
            setMessage("Session added successfully!");
            setFormData({
                mentorId: "",
                sessionType: "",
                sessionDate: "",
                durationMinutes: "",
                ratePerHour: "",
            });
        } catch (err) {
            setMessage(`Failed to add session - ${err.message}`);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Add New Session
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Mentor ID */}
                <input
                    type="text"
                    name="mentorId"
                    placeholder="Mentor ID"
                    value={formData.mentorId}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                {/* Session Type */}
                <select
                    name="sessionType"
                    value={formData.sessionType}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                >
                    <option value="">Select Session Type</option>
                    <option value="Live">Live</option>
                    <option value="Evaluation">Evaluation</option>
                    <option value="Review">Review</option>
                </select>

                {/* Session Date */}
                <input
                    type="datetime-local"
                    name="sessionDate"
                    value={formData.sessionDate}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                {/* Duration */}
                <input
                    type="number"
                    name="durationMinutes"
                    placeholder="Duration (minutes)"
                    value={formData.durationMinutes}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                {/* Rate Per Hour */}
                <input
                    type="number"
                    name="ratePerHour"
                    placeholder="Rate Per Hour (INR)"
                    value={formData.ratePerHour}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Add Session
                </button>

                {message && (
                    <p className="text-center mt-2 text-green-600">{message}</p>
                )}
            </form>
        </div>
    );
};

export default AddSession;
