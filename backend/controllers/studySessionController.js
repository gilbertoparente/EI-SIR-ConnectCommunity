const StudySession = require("../models/StudySession");
const StudyGroup = require("../models/StudyGroup");

// Criar sessão de estudo
const createStudySession = async (req, res) => {

    try {

        const {
    groupId,
    title,
    description,
    date,
    location,
    calendarLink,
    maxParticipants
} = req.body;

        const group = await StudyGroup.findById(groupId);

        if (!group) {
            return res.status(404).json({
                message: "Grupo não encontrado."
            });
        }

        const isMember = group.members.some(
            member => member.toString() === req.user.id
        );

        if (!isMember) {
            return res.status(403).json({
                message: "Tem de pertencer ao grupo para criar sessões."
            });
        }
            const session = await StudySession.create({

                groupId,
                title,
                description,
                date,
                location,
                calendarLink,
                maxParticipants,
                createdBy: req.user.id,

                participants: [req.user.id]

            });

        res.status(201).json({
            message: "Sessão criada com sucesso.",
            session
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Listar sessões de um grupo
const getStudySessionsByGroup = async (req, res) => {

    try {

        const group = await StudyGroup.findById(req.params.groupId);

        if (!group) {
            return res.status(404).json({
                message: "Grupo não encontrado."
            });
        }

        const isMember = group.members.some(
            member => member.toString() === req.user.id
        );

        if (!isMember) {
            return res.status(403).json({
                message: "Não pertence a este grupo."
            });
        }

        const sessions = await StudySession.find({
            groupId: req.params.groupId
        })
            .populate("createdBy", "name email")
            .populate("participants", "name email")
            .sort({ date: 1 });
            res.status(200).json(sessions);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Atualizar sessão
const updateStudySession = async (req, res) => {

    try {

        const session = await StudySession.findById(req.params.id);

        if (!session) {
            return res.status(404).json({
                message: "Sessão não encontrada."
            });
        }

        // Apenas o criador pode editar
        if (session.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Não tem permissão para editar esta sessão."
            });
        }



        const { title, description, date, location, calendarLink } = req.body;

        session.title = title ?? session.title;
        session.description = description ?? session.description;
        session.date = date ?? session.date;
        session.location = location ?? session.location;
        session.calendarLink = calendarLink ?? session.calendarLink;

        await session.save();

        res.status(200).json({
            message: "Sessão atualizada com sucesso.",
            session
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Eliminar sessão
const deleteStudySession = async (req, res) => {

    try {

        const session = await StudySession.findById(req.params.id);

        if (!session) {
            return res.status(404).json({
                message: "Sessão não encontrada."
            });
        }

        // Apenas o criador pode eliminar
        if (session.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Não tem permissão para eliminar esta sessão."
            });
        }

        await session.deleteOne();

        res.status(200).json({
            message: "Sessão eliminada com sucesso."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Entrar numa sessão
const joinStudySession = async (req, res) => {

    try {

        const session = await StudySession.findById(req.params.id);

        if (!session) {

            return res.status(404).json({
                message: "Sessão não encontrada."
            });

        }

        // Já participa?
        if (session.participants.some(
            participant => participant.toString() === req.user.id
        )) {

            return res.status(400).json({
                message: "Já participa nesta sessão."
            });

        }

        // Sessão cheia?
        if (session.participants.length >= session.maxParticipants) {

            return res.status(400).json({
                message: "A sessão está completa."
            });

        }

        session.participants.push(req.user.id);

        await session.save();

        res.status(200).json({

            message: "Entrou na sessão.",

            session

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Sair da sessão
const leaveStudySession = async (req, res) => {

    try {

        const session = await StudySession.findById(req.params.id);

        if (!session) {

            return res.status(404).json({
                message: "Sessão não encontrada."
            });

        }

        // O criador não pode sair
        if (session.createdBy.toString() === req.user.id) {

            return res.status(400).json({
                message: "O criador da sessão não pode sair."
            });

        }

        const isParticipant = session.participants.some(
            participant => participant.toString() === req.user.id
        );

        if (!isParticipant) {

            return res.status(400).json({
                message: "Não participa nesta sessão."
            });

        }

        session.participants = session.participants.filter(
            participant => participant.toString() !== req.user.id
        );

        await session.save();

        res.status(200).json({

            message: "Saiu da sessão.",

            session

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Obter uma sessão pelo ID
const getStudySessionById = async (req, res) => {

    try {

        const session = await StudySession.findById(req.params.id)
            .populate("createdBy", "name email")
            .populate("participants", "name email");

        if (!session) {

            return res.status(404).json({
                message: "Sessão não encontrada."
            });

        }

        res.status(200).json(session);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
    createStudySession,
    getStudySessionsByGroup,
    updateStudySession,
    deleteStudySession,
    joinStudySession,
    leaveStudySession,
    getStudySessionById
};