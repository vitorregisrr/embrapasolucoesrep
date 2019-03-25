const Solucao = require('../../models/solucao'),
    Empresa = require('../../models/empresa'),
    Avaliacao = require('../../models/avaliacao');
    
exports.getAvaliacoes = (req, res, next) => {
   Avaliacao.find({ status: 'aprovado'})
   .sort({ date: -1})
   .then( avaliacoes => {
        res.render('admin/avaliacao/avaliacoes', {
            pageTitle: 'Avaliações',
            path: "admin/avaliacao",
            robotsFollow: false,
            errorMessage: [],
            avaliacoes
        });
   })
   .catch( err => next(err, 500))
}

exports.getSolicitacoes = (req, res, next) => {
    res.render('admin/avaliacao/solicitacoes', {
        pageTitle: 'Solicitações de Avaliação',
        path: "admin/avalaicao/solicitacoes",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.deleteAvaliacao = (req, res, next) => {
    res.render('admin/avaliacao/solucoes', {
        pageTitle: 'Soluções',
        path: "admin/depoimentos",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.acceptAvaliacao = (req, res, next) => {
    res.render('admin/avaliacao/solucoes', {
        pageTitle: 'Soluções',
        path: "admin/depoimentos",
        robotsFollow: false,
        errorMessage: []
    });
}