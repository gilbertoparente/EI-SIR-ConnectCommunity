const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {

    uploadResource,
    getResourcesByGroup,
    deleteResource

} = require("../controllers/resourceController");

// Upload
router.post( "/upload", authMiddleware, upload.single("file"), uploadResource );

// Listar recursos
router.get( "/group/:groupId", authMiddleware, getResourcesByGroup );

// Eliminar
router.delete( "/:id",authMiddleware, deleteResource );

module.exports = router;