const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Requisicao = new Schema({

    titulo: {
        type: String,
        required: true
    },

    descricao: {
        type: String,
        required: true
    },

    autor: {
        type: String,
        required: true
    },

    telefone: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    },

    email: {
        type: String,
        required: true
    },

    data: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('Requisicao', Requisicao);