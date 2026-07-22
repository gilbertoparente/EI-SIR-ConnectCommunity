const Resource = require("../models/Resource");
const StudyGroup = require("../models/StudyGroup");
const fs = require("fs");

// Upload de recurso
const uploadResource = async (req, res) => {

    try {

        const { groupId, title } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "Nenhum ficheiro enviado."
            });
        }

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
                message: "Tem de pertencer ao grupo."
            });
        }

        const resource = await Resource.create({

            groupId,

            title,

            type: req.file.mimetype,

            fileName: req.file.filename,

            filePath: req.file.path,

            uploadedBy: req.user.id

        });

        res.status(201).json({

            message: "Recurso carregado com sucesso.",

            resource

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Listar recursos
// Listar recursos
const getResourcesByGroup = async (req, res) => {

    try {

        const resources = await Resource
            .find({
                groupId: req.params.groupId
            })
            .populate("uploadedBy", "name email")
            .sort({
                createdAt: -1
            });

        const resourcesWithUrl = resources.map(resource => ({

            _id: resource._id,

            title: resource.title,

            type: resource.type,

            fileName: resource.fileName,

            filePath: resource.filePath,

            uploadedBy: resource.uploadedBy,

            createdAt: resource.createdAt,

            downloadUrl: `/uploads/${resource.fileName}`

        }));

        res.status(200).json(resourcesWithUrl);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Eliminar recurso
const deleteResource = async (req, res) => {

    try {

        const resource = await Resource.findById(req.params.id);

        if (!resource) {

            return res.status(404).json({

                message: "Recurso não encontrado."

            });

        }

        if (resource.uploadedBy.toString() !== req.user.id) {

            return res.status(403).json({

                message: "Não tem permissão."

            });

        }

        if (fs.existsSync(resource.filePath)) {

            fs.unlinkSync(resource.filePath);

        }

        await resource.deleteOne();

        res.status(200).json({

            message: "Recurso eliminado."

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    uploadResource,
    getResourcesByGroup,
    deleteResource

};