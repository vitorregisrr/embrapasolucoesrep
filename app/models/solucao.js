const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Solucao = new Schema({

    nome: {
        type: String,
        required: true
    },

    descricao: {
        type: String,
        required: true
    },

    empresaId: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa'
    },

    date: {
        type: Date,
        default: Date.now()
    },

    encarregado: {
        type: String,
        required: false
    },

    categoria: {
        type: String,
        required: false
    },

    mainImage: {
        type: Object,
        required: false
    },

    images: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('Solucao', Solucao);