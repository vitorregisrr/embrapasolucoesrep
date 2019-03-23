const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Empresa = new Schema({
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

    telefone: {
        type: String,
        required: false
    },

    encarregado: {
        type: String,
        required: false
    },

    image: {
        type: Object,
        required: false
    }
});

module.exports = mongoose.model('Empresa', Empresa);