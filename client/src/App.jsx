import React from "react";
import { Route, Routes } from "react-router-dom";
import AddSession from "./pages/AddSession";
import AllSessions from "./pages/AllSessions";
import ReceiptPage from "./pages/ReceiptPage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AddSession />} />
            <Route path="/sessions" element={<AllSessions />} />
            <Route path="/receipts" element={<ReceiptPage />} />
        </Routes>
    );
};

export default App;
