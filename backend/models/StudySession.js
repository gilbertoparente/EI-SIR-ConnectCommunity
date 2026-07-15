const mongoose = require("mongoose");

const studySessionSchema = new mongoose.Schema({

    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudyGroup",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    date: {
        type: Date,
        required: true
    },

    location: {
        type: String
    },

    calendarLink: {
        type: String
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("StudySession", studySessionSchema);