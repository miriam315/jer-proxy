import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// מסלול ראשי /proxy
app.post("/proxy", async (req, res) => {
  try {
    const response = await fetch("https://jerbasicserviceapi.jerusalem.muni.il/api/Db/ExecuteGetJSON", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.text(); // שומר גם תגובות HTML או JSON
    res.status(response.status).send(data);
  } catch (error) {
    console.error("❌ Proxy error:", error);
    res.status(500).send({ error: "Proxy failed", details: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Proxy running on port ${PORT}`));
