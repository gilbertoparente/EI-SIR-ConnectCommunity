const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createStudyGroup,
    getStudyGroups,
    joinStudyGroup,
    leaveStudyGroup
} = require("../controllers/studyGroupController");

// Criar grupo
router.post("/", authMiddleware, createStudyGroup);

// Listar grupos
router.get("/", authMiddleware, getStudyGroups);

// Entrar no grupo
router.post("/:id/join", authMiddleware, joinStudyGroup);

//sair do grupo
router.post("/:id/leave", authMiddleware, leaveStudyGroup);

module.exports = router;