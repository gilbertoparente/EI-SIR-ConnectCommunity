const User = require("../models/User");
const bcrypt = require("bcrypt");

/*
===========================================
OBTER PERFIL
===========================================
*/

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)

            .select("-password");

        if (!user) {

            return res.status(404).json({

                message: "Utilizador não encontrado."

            });

        }

        res.json(user);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

/*
===========================================
ATUALIZAR PERFIL
===========================================
*/

const updateProfile = async (req, res) => {

    try {

        const {

            name,
            email,
            course,
            year,
            university,
            bio,
            currentPassword,
            newPassword

        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                message: "Utilizador não encontrado."

            });

        }

        user.name = name;
        user.email = email;
        user.course = course;
        user.year = year;
        user.university = university;
        user.bio = bio;

        if (newPassword && newPassword.trim() !== "") {

            const validPassword = await bcrypt.compare(

                currentPassword,

                user.password

            );

            if (!validPassword) {

                return res.status(400).json({

                    message: "Password atual incorreta."

                });

            }

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(

                newPassword,

                salt

            );

        }

        await user.save();

       res.json({

        message: "Perfil atualizado com sucesso.",

        user: {

            id: user._id,

            name: user.name,

            email: user.email

        }

        });         

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getProfile,

    updateProfile

};