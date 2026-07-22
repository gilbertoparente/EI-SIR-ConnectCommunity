const ChatMessage = require("../models/ChatMessage");
const PrivateMessage = require("../models/PrivateMessage");
const StudySession = require("../models/StudySession");
const User = require("../models/User");

const jwt = require("jsonwebtoken");

/*
====================================================
UTILIZADORES ONLINE
====================================================
*/

const onlineUsers = new Map();

/*
====================================================
SOCKET HANDLER
====================================================
*/

const socketHandler = (io) => {

    /*
    ====================================================
    AUTENTICAÇÃO
    ====================================================
    */

    io.use(async (socket, next) => {

        try {

            const token = socket.handshake.auth?.token;

            if (!token) {
                return next(new Error("Token não fornecido."));
            }

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            const user = await User.findById(decoded.id)
                .select("name email");

            if (!user) {
                return next(new Error("Utilizador não encontrado."));
            }

            socket.user = {

                _id: user._id.toString(),
                name: user.name,
                email: user.email

            };

            next();

        }

        catch (error) {

            next(new Error("Token inválido."));

        }

    });

    /*
    ====================================================
    NOVA LIGAÇÃO
    ====================================================
    */

    io.on("connection", (socket) => {

        console.log(
            `🟢 ${socket.user.name} ligou-se.`
        );

        /*
        ===========================================
        REGISTAR UTILIZADOR ONLINE
        ===========================================
        */

        onlineUsers.set(

            socket.user._id,

            {

                id: socket.user._id,
                _id: socket.user._id,
                socketId: socket.id,
                name: socket.user.name,
                email: socket.user.email

            }

        );
        /*
        ===========================================
        ENVIAR LISTA DE ONLINE
        ===========================================
        */

        io.emit(

            "onlineUsers",

            Array.from(onlineUsers.values())

        );

        /*
        ===========================================
        PEDIDO MANUAL DA LISTA
        ===========================================
        */

        socket.on("getOnlineUsers", () => {

            socket.emit(

                "onlineUsers",

                Array.from(onlineUsers.values())

            );

        });

        /*
        ====================================================
        CHAT DAS SESSÕES
        ====================================================
        */
        socket.on("joinSession", async (sessionId) => {

            try {

                const session = await StudySession.findById(sessionId);

                if (!session) {

                    socket.emit(
                        "errorMessage",
                        "Sessão não encontrada."
                    );

                    return;

                }

                const isParticipant = session.participants.some(

                    participant =>

                        participant.toString() === socket.user._id

                );

                if (!isParticipant) {

                    socket.emit(

                        "errorMessage",

                        "Não pertence a esta sessão."

                    );

                    return;

                }

                socket.join(sessionId);

                console.log(

                    `📚 ${socket.user.name} entrou na sessão "${session.title}"`

                );

            }

            catch (error) {

                console.error(error);

            }

        });

        /*
        ===========================================
        MENSAGEM DA SESSÃO
        ===========================================
        */

        socket.on("sendMessage", async (data) => {

            try {

                const {

                    sessionId,
                    message

                } = data;

                if (!message || message.trim() === "") {

                    return;

                }

                const session = await StudySession.findById(sessionId);

                if (!session) return;

                const isParticipant = session.participants.some(

                    participant =>

                        participant.toString() === socket.user._id

                );

                if (!isParticipant) {

                    return;

                }

                const savedMessage = await ChatMessage.create({

                    sessionId,

                    sender: socket.user._id,

                    message

                });

                const populatedMessage = await ChatMessage

                    .findById(savedMessage._id)

                    .populate(

                        "sender",

                        "name email"

                    );

                io.to(sessionId).emit(

                    "receiveMessage",

                    populatedMessage

                );

            }

            catch (error) {

                console.error(error);

            }

        });

        /*
        ===========================================
        SAIR DA SESSÃO
        ===========================================
        */

        socket.on("leaveSession", (sessionId) => {

            socket.leave(sessionId);

            console.log(

                `📤 ${socket.user.name} saiu da sessão.`

            );

        });

        /*
        ====================================================
        CHAT PRIVADO
        ====================================================
        */
               socket.on("privateMessage", async (data) => {

            try {

                const {

                    receiverId,
                    message

                } = data;

                if (!receiverId || !message || message.trim() === "") {

                    return;

                }

                const receiver = await User.findById(receiverId);

                if (!receiver) {

                    socket.emit(

                        "errorMessage",

                        "Utilizador não encontrado."

                    );

                    return;

                }

                const savedMessage = await PrivateMessage.create({

                    sender: socket.user._id,

                    receiver: receiverId,

                    message

                });

                const populatedMessage = await PrivateMessage

                    .findById(savedMessage._id)

                    .populate("sender", "name email")

                    .populate("receiver", "name email");

                    const messageObject = populatedMessage.toObject();

                    messageObject.id = messageObject._id;

                    messageObject.sender.id = messageObject.sender._id;
                    messageObject.receiver.id = messageObject.receiver._id;

                /*
                ==========================================
                ENVIA PARA O DESTINATÁRIO
                ==========================================
                */

                const receiverSocket = onlineUsers.get(receiverId);

                if (receiverSocket) {

                    io.to(receiverSocket.socketId).emit(

                        "receivePrivateMessage",

                        messageObject

                    );

                }

                /*
                ==========================================
                ENVIA TAMBÉM PARA O REMETENTE
                ==========================================
                */

                socket.emit(

                    "receivePrivateMessage",

                    populatedMessage

                );

            }

            catch (error) {

                console.error(error);

            }

        });

        /*
        ====================================================
        DESLIGAR
        ====================================================
        */

        socket.on("disconnect", () => {

            console.log(

                `🔴 ${socket.user.name} desligou-se.`

            );

            onlineUsers.delete(socket.user._id);

            io.emit(

                "onlineUsers",

                Array.from(onlineUsers.values())

            );

        });

    });

};

module.exports = socketHandler;