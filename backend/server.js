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

const studyGroupRoutes = require("./routes/studyGroupRoutes");
app.use("/api/groups", studyGroupRoutes);

const studySessionRoutes = require("./routes/studySessionRoutes");
app.use("/api/sessions", studySessionRoutes);

const resourceRoutes = require("./routes/resourceRoutes");
app.use("/api/resources", resourceRoutes);

app.use("/uploads", express.static("uploads"));


app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado na porta ${PORT}`);
});