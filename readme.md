# 🧑‍🏫 Mentor Session Management System

A full‑stack web application that helps EdTech platforms track mentor sessions, automate payout calculations, and generate auditable PDF receipts.

---

## 📌 Features

| Category           | Details                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| Session Management | • Create sessions with type, date, duration, and custom rate<br>• View all sessions for a mentor  |
| Automated Receipts | • Receipt auto‑generated on session creation<br>• Mark receipts **Paid / Pending / Under Review** |
| PDF Downloads      | • One‑click PDF receipt (via PDFKit)                                                              |
| Mentor‑Scoped Data | • All APIs accept `mentorId` → ready for multi‑mentor rollout                                     |
| Future‑Ready       | • Hooks in place for JWT login, CSV uploads, audit logs                                           |

---

## 🏗️ Tech Stack

### 🔹 Frontend

* **React + Vite** — blazing‑fast dev server
* **Tailwind CSS** — utility‑first styling
* **Axios** — API requests

### 🔹 Backend

* **Node.js + Express** — REST API
* **MongoDB + Mongoose** — NoSQL database & ODM
* **PDFKit** — Server‑side PDF generation

---

## ⚙️ Local Setup

```bash
# Clone repo
$ git clone https://github.com/Ego-TheCelestial/edtech-payout-system.git
$ cd mentor-session-manager

# ───────────────────────────
# Backend
# ───────────────────────────
$ cd server
$ npm install

# Create .env
MONGO_URI=mongodb://127.0.0.1:27017/mentorDB
PORT=5000

$ npm run dev        # start backend on :5000

# ───────────────────────────
# Frontend
# ───────────────────────────
$ cd ../client
$ npm install
$ npm run dev        # Vite dev server on :5173 (default)
```

Open [http://localhost:5173](http://localhost:5173) in the browser.

---

## 🧪 Quick Demo Guide

1. **Add a Session**
   ‑ Go to **Home** → Fill form → **Submit**
   ✓ Session saved ➜ Receipt auto‑generated.
2. **List Sessions**
   ‑ Navigate to **/sessions**
   ✓ Shows type, date, duration, rate, status.
3. **Receipts**
   ‑ Route **/receipts** lists all receipts for the mentor.
   ‑ Click **Mark as Paid** → Status flips to *Paid*.
4. **Download PDF**
   ‑ After status = Paid, click **Download Receipt**.
   ✓ PDF downloads with full tax/fee breakdown.

---

## 📁 Project Structure (Monorepo)

```
mentor-session-manager/
│
├── client/                 # React + Vite frontend
│   ├── pages/
│   ├── components/
│   └── …
│
├── server/                 # Node/Express backend
│   ├── models/             # Mongoose schemas (Mentor, Session, Receipt)
│   ├── routes/             # REST endpoints
│   ├── utils/              # payoutCalculator, PDF generator
│   └── server.js
└── README.md
```

---

## ✍️ Future Improvements

* 🔐 **JWT Auth** — mentor login/signup & protected routes
* 📤 **CSV Upload** — bulk session import for admins
* 📊 **Admin Dashboard** — analytics, filters & audit logs
* 📧 **Email Receipts** — auto‑mail PDF to mentors on payment

---

## 👨‍💻 Author

Built for the 2025 EdTech Hackathon by **Siddharth Singh**.

Feel free to fork, contribute, and ⭐ the repo!
