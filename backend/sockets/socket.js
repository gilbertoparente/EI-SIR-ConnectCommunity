const ChatMessage = require("../models/ChatMessage");
const StudyGroup = require("../models/StudyGroup");
const jwt = require("jsonwebtoken");

const socketHandler = (io) => {

    // Middleware de autenticação JWT
    io.use((socket, next) => {

        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error("Token não fornecido."));
        }

        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            socket.user = decoded;

            next();

        } catch (error) {

            next(new Error("Token inválido."));

        }

    });

    io.on("connection", (socket) => {

        console.log(`🔌 Cliente ligado: ${socket.id}`);

        // Entrar num grupo
        socket.on("joinGroup", async (groupId) => {

            try {

                const group = await StudyGroup.findById(groupId);

                if (!group) {
                    return;
                }

                const isMember = group.members.some(
                    member => member.toString() === socket.user.id
                );

                if (!isMember) {
                    return;
                }

                socket.join(groupId);

                console.log(
                    `${socket.user.email} entrou no grupo ${group.title}`
                );

            } catch (error) {

                console.error(error.message);

            }

        });

        // Enviar mensagem
        socket.on("sendMessage", async (data) => {

            try {

                const { groupId, message } = data;

                const group = await StudyGroup.findById(groupId);

                if (!group) {
                    return;
                }

                const isMember = group.members.some(
                    member => member.toString() === socket.user.id
                );

                if (!isMember) {
                    return;
                }

                const newMessage = await ChatMessage.create({

                    groupId,
                    sender: socket.user.id,
                    message

                });

                const populatedMessage = await ChatMessage
                    .findById(newMessage._id)
                    .populate("sender", "name email");

                io.to(groupId).emit("receiveMessage", populatedMessage);

            } catch (error) {

                console.error(error.message);

            }

        });

        socket.on("disconnect", () => {

            console.log(`❌ Cliente desligado: ${socket.id}`);

        });

    });

};

module.exports = socketHandler;