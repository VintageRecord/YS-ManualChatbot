import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }));
app.use(express.json());

app.use("/api/chat", chatRoute);
app.use("/api/admin", adminRoute);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "YS Manual Chatbot backend running" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
