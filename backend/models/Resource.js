const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({

    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudyGroup",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    fileName: {
        type: String,
        required: true
    },

    filePath: {
        type: String,
        required: true
    },

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Resource", resourceSchema);