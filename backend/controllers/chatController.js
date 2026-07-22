const ChatMessage = require("../models/ChatMessage");

// Histórico das mensagens de uma sessão
const getMessagesBySession = async (req, res) => {

    try {

        const messages = await ChatMessage.find({

            sessionId: req.params.sessionId

        })
            .populate("sender", "name email")
            .sort({ createdAt: 1 });

        res.status(200).json(messages);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getMessagesBySession

};