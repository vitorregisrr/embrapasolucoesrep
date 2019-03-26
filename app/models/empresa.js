const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Empresa = new Schema({
    email: {
        type: String,
        required: false
    },

    usuario: {
        type: String,
        required: false
    },

    password: {
        type: String,
        required: false
    },

    nome: {
        type: String,
        required: false
    },

    telefone: {
        type: String,
        required: false
    },

    date: {
        type: Date,
        default: Date.now()
    },
    
    encarregado: {
        type: String,
        required: false
    },

    image: {
        type: Object,
        required: false
    },

    codigoCadastro: {
        type: String,
        required: false
    },

    status: {
        type: String,
        required: true,
        default: 'pendente'
    },

    resetToken: String,

    resetTokenExpiration: Date
});

module.exports = mongoose.model('Empresa', Empresa);