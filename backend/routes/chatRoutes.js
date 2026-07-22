const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

    getMessagesBySession

} = require("../controllers/chatController");

router.get(

    "/session/:sessionId",

    authMiddleware,

    getMessagesBySession

);

module.exports = router;