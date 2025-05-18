require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const mentorRoutes = require("./routes/mentorRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const receiptRoutes = require("./routes/receiptRoutes");

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Payout automation api running");
});

const PORT = process.env.PORT;

app.use("/api/mentors", mentorRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/receipts", receiptRoutes);

app.listen(PORT, ()=> {
    console.log(`Server started on http://localhost:${PORT}`);
});

