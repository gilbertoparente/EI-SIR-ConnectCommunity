const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

    getConversation,
    sendPrivateMessage

} = require("../controllers/privateMessageController");

router.get(

    "/:userId",

    authMiddleware,

    getConversation

);

router.post(

    "/",

    authMiddleware,

    sendPrivateMessage

);

module.exports = router;