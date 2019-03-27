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

    image: {
        type: Object,
        required: false,
        default: { url : '/images/thumbs/user.jpg'}
    },

    status: {
        type: String,
        required: true
    },
    
    rating: {
        type: Number,
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