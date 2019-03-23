const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
    email: {
        type: String,
        required: true
    },

    usuario: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    image: {
        type: Object,
        required: false
    },

    resetToken: String,

    resetTokenExpiration: Date
});

module.exports = mongoose.model('Admin', Admin);