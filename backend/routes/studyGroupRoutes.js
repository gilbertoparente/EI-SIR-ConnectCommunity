const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createStudyGroup,
    getStudyGroups,
    getStudyGroupById,
    joinStudyGroup,
    leaveStudyGroup,
    deleteStudyGroup
} = require("../controllers/studyGroupController");

// Criar grupo
router.post("/", authMiddleware, createStudyGroup);

// Listar grupos
router.get("/", authMiddleware, getStudyGroups);

//likdta por id
router.get("/:id", authMiddleware, getStudyGroupById);

// Entrar no grupo
router.post("/:id/join", authMiddleware, joinStudyGroup);

//sair do grupo
router.post("/:id/leave", authMiddleware, leaveStudyGroup);

// Eliminar grupo
router.delete("/:id", authMiddleware, deleteStudyGroup);

module.exports = router;