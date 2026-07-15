const StudyGroup = require("../models/StudyGroup");

// Criar grupo de estudo
const createStudyGroup = async (req, res) => {

    try {

        const { title, subject, description, maxMembers } = req.body;

        const group = await StudyGroup.create({

            title,
            subject,
            description,

            owner: req.user.id,

            members: [req.user.id],

            maxMembers: maxMembers || 10

        });

        res.status(201).json({
            message: "Grupo criado com sucesso.",
            group
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Listar todos os grupos
const getStudyGroups = async (req, res) => {

    try {

        const groups = await StudyGroup
            .find()
            .populate("owner", "name email")
            .populate("members", "name email");

        res.status(200).json(groups);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Entrar num grupo
const joinStudyGroup = async (req, res) => {

    try {

        const group = await StudyGroup.findById(req.params.id);

        if (!group) {
            return res.status(404).json({
                message: "Grupo não encontrado."
            });
        }

        // Já é membro?
        if (group.members.includes(req.user.id)) {
            return res.status(400).json({
                message: "Já pertence a este grupo."
            });
        }

        // Grupo cheio?
        if (group.members.length >= group.maxMembers) {
            return res.status(400).json({
                message: "O grupo está completo."
            });
        }

        group.members.push(req.user.id);

        await group.save();

        res.status(200).json({
            message: "Entrou no grupo com sucesso.",
            group
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Sair de um grupo
const leaveStudyGroup = async (req, res) => {

    try {

        const group = await StudyGroup.findById(req.params.id);

        if (!group) {
            return res.status(404).json({
                message: "Grupo não encontrado."
            });
        }

        // O dono do grupo não pode sair
        if (group.owner.toString() === req.user.id) {
            return res.status(400).json({
                message: "O proprietário do grupo não pode sair do grupo."
            });
        }

        // Verificar se é membro
        const isMember = group.members.some(
            member => member.toString() === req.user.id
        );

        if (!isMember) {
            return res.status(400).json({
                message: "Não pertence a este grupo."
            });
        }

        // Remover membro
        group.members = group.members.filter(
            member => member.toString() !== req.user.id
        );

        await group.save();

        res.status(200).json({
            message: "Saiu do grupo com sucesso.",
            group
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createStudyGroup,
    getStudyGroups,
    joinStudyGroup,
    leaveStudyGroup
};