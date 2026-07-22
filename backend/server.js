const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const http = require("http");
const { Server } = require("socket.io");

const socketHandler = require("./sockets/socket");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

socketHandler(io);

dotenv.config();

// Ligar ao MongoDB
connectDB();


// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

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

const chatRoutes = require("./routes/chatRoutes");

app.use("/api/chat", chatRoutes);

const privateMessageRoutes = require("./routes/privateMessageRoutes");
app.use( "/api/privateMessages", privateMessageRoutes );

const profileRoutes = require("./routes/profileRoutes");

app.use("/api/profile", profileRoutes);


server.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado na porta ${PORT}`);
});