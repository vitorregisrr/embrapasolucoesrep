const Solucao = require('../../models/solucao'),
    Empresa = require('../../models/empresa'),
    Avaliacao = require('../../models/avaliacao');
    
exports.getIndex = (req, res, next) => {
    Solucao.find({ status: 'aprovado'})
    .sort({ date: -1})
    .then( solucoes => {
        res.render('public/home', {
            pageTitle: '',
            path: "/",
            robotsFollow: false,
            errorMessage: [],
            solucoes
        })
    })
    .catch( err => next(err, 500))
}

exports.getSubmeter = (req, res, next) => {
    res.render('public/submeter', {
        pageTitle: '',
        path: "/",
        robotsFollow: false,
        errorMessage: [],
        form: false
    })
}