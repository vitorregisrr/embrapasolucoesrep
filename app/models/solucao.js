const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAutoIncrement = require('mongoose-auto-increment');
const mongoURI = require('../util/mongo_URI');
const connection = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true
});

const Solucao = new Schema({

    nome: {
        type: String,
        required: false
    },

    descricao: {
        type: String,
        required: false
    },

    link: {
        type: String,
        required: false
    },

    empresaId: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa'
    },

    date: {
        type: Date,
        default: Date.now()
    },

    categoria: {
        type: String,
        required: false
    },

    rating: {
        type: Number,
        required: false
    },

    mainImage: {
        type: Object,
        required: false
    },

    status: {
        type: String,
        required: true,
        default: 'pendente'
    },

    images: {
        type: Array,
        required: false
    }
});

mongooseAutoIncrement.initialize(connection, {
    useNewUrlParser: true
});

Solucao.plugin(mongooseAutoIncrement.plugin, {
    model: 'Solucao',
    field: 'codigo',
    startAt: 100,
    incrementBy: 4
});

module.exports = mongoose.model('Solucao', Solucao);