const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

    createStudySession,
    getStudySessionsByGroup,
    getStudySessionById,
    updateStudySession,
    deleteStudySession,
    joinStudySession,
    leaveStudySession

} = require("../controllers/studySessionController");

// Criar sessão
router.post("/", authMiddleware, createStudySession);

// Listar sessões de um grupo
router.get("/group/:groupId", authMiddleware, getStudySessionsByGroup);

router.get( "/:id", authMiddleware, getStudySessionById );

// Atualizar sessão
router.put("/:id", authMiddleware, updateStudySession);

// Eliminar sessão
router.delete("/:id", authMiddleware, deleteStudySession);

// Entrar
router.post( "/:id/join",authMiddleware, joinStudySession );

// Sair
router.post("/:id/leave", authMiddleware, leaveStudySession );



module.exports = router;