const Solucao = require('../../models/solucao'),
    Empresa = require('../../models/empresa'),
    Avaliacao = require('../../models/avaliacao');
    
exports.getSolucao = (req, res, next) => {
    Solucao.findOne({ codigo:req.params.codigo})
    .then( solucao => {
        if( solucao.status != 'aprovado' && !req.session.admin){
            return res.redirect('/')
        }

        return res.render('public/solucao', {
            pageTitle: '',
            path: "/solucao",
            robotsFollow: true,
            errorMessage: [],
            form: false,
            solucao
        })
    })
    .catch( err => next(err, 500))
}

exports.getSolicitacao = (req, res, next) => {
    res.render('public/solicitacao', {
        pageTitle: '',
        path: "/solicitacao",
        robotsFollow: true,
        errorMessage: [],
        form: false
    })
}

exports.postSolicitacao = (req, res, next) => {
    res.render('public/solicitacao', {
        pageTitle: '',
        path: "/solicitacao",
        robotsFollow: true,
        errorMessage: [],
        form: false
    })
}