const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registar utilizador
const register = async (req, res) => {
    try {
        const { name, email, password, course, year, university } = req.body;

        // Verificar se o utilizador já existe
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "O email já está registado."
            });
        }

        // Encriptar password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar utilizador
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            course,
            year,
            university
        });

        res.status(201).json({
            message: "Utilizador registado com sucesso.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    register
};