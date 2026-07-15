const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

    createStudySession,
    getStudySessionsByGroup,
    updateStudySession,
    deleteStudySession

} = require("../controllers/studySessionController");

// Criar sessão
router.post("/", authMiddleware, createStudySession);

// Listar sessões de um grupo
router.get("/group/:groupId", authMiddleware, getStudySessionsByGroup);

// Atualizar sessão
router.put("/:id", authMiddleware, updateStudySession);

// Eliminar sessão
router.delete("/:id", authMiddleware, deleteStudySession);

module.exports = router;