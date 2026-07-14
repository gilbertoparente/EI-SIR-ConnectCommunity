const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

// Ligar ao MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
    res.status(200).json({
        application: "ConnectCommunity",
        status: "API Online"
    });
});

const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado na porta ${PORT}`);
});