const PrivateMessage = require("../models/PrivateMessage");

// Obter conversa entre o utilizador autenticado e outro utilizador
const getConversation = async (req, res) => {

    try {

        const messages = await PrivateMessage.find({

            $or: [

                {
                    sender: req.user.id,
                    receiver: req.params.userId
                },

                {
                    sender: req.params.userId,
                    receiver: req.user.id
                }

            ]

        })

            .populate("sender", "name email")
            .populate("receiver", "name email")
            .sort({ createdAt: 1 });

        res.status(200).json(messages);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Guardar mensagem privada
const sendPrivateMessage = async (req, res) => {

    try {

        const { receiverId, message } = req.body;

        const newMessage = await PrivateMessage.create({

            sender: req.user.id,
            receiver: receiverId,
            message

        });

        const populatedMessage = await PrivateMessage

            .findById(newMessage._id)

            .populate("sender", "name email")

            .populate("receiver", "name email");

        res.status(201).json(populatedMessage);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getConversation,
    sendPrivateMessage

};