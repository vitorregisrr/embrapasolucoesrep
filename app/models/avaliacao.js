const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Avaliacao = new Schema({

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

    data: {
        type: Date,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    },
    
    solucaoId: {
        type: Schema.Types.ObjectId,
        ref: 'Solucao'
    },
});

module.exports = mongoose.model('Avaliacao', Avaliacao);