import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRoute from "./routes/chat.js";
import uploadRoute from "./routes/upload.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }));
app.use(express.json());

app.use("/api/chat", chatRoute);
app.use("/api/upload", uploadRoute);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "YS Chatbot backend running" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
