import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const response = await axios.get("http://localhost:5000/api/mentors/68276826e08d7244306b42cb/sessions");
        setSessions(response.data.sessions);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Error fetching sessions");
      } finally {
        setLoading(false);
      }
    }
    fetchSessions();
  }, []);

  if (loading) return <div>Loading sessions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Sessions</h1>
      {sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Duration (min)</th>
              <th className="border px-4 py-2">Rate/hr</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session._id}>
                <td className="border px-4 py-2">
                  {new Date(session.sessionDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{session.sessionType}</td>
                <td className="border px-4 py-2">{session.durationMinutes}</td>
                <td className="border px-4 py-2">₹{session.ratePerHour}</td>
                <td className="border px-4 py-2">{session.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
