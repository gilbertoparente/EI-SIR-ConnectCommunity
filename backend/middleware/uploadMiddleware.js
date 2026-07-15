const multer = require("multer");
const path = require("path");

// Configuração do armazenamento
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

// Tipos permitidos
const fileFilter = (req, file, cb) => {

    console.log(file.mimetype);

    const allowedTypes = [

        "application/pdf",

        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

        "application/msword",

        "application/vnd.ms-powerpoint",

        "application/vnd.openxmlformats-officedocument.presentationml.presentation",

        "image/jpeg",

        "image/png",

        "application/zip"

    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(new Error("Tipo de ficheiro não permitido."), false);

    }

};

module.exports = multer({

    storage,
    fileFilter

});