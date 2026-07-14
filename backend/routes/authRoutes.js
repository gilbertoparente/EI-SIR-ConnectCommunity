const express = require("express");

const router = express.Router();

const { register, login } = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, (req, res) => {

    res.json({
        message: "Acesso autorizado.",
        user: req.user
    });

});

module.exports = router;