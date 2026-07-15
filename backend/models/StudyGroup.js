const mongoose = require("mongoose");

const studyGroupSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    maxMembers: {
        type: Number,
        default: 10
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("StudyGroup", studyGroupSchema);