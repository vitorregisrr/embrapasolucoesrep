const Solucao = require('../../models/solucao'),
    Empresa = require('../../models/empresa'),
    Avaliacao = require('../../models/avaliacao');

exports.getSolucao = (req, res, next) => {
    Solucao.findOne({
            codigo: req.params.codigo
        })
        .populate('empresaId')
        .then(solucao => {
            if (!solucao) {
                res.redirect('/')
            }

            if (solucao.status != 'aprovado' && !req.session.admin) {
                return res.redirect('/')
            }

            Avaliacao.find({
                    solucaoId: solucao,
                    status: 'aprovado'
                })
                .then(avaliacoes => {
                    return res.render('public/solucao', {
                        pageTitle: '',
                        path: "/solucao",
                        robotsFollow: true,
                        errorMessage: [],
                        form: false,
                        solucao,
                        avaliacoes,
                        showAvaliacao: false,
                        showSuccess: false
                    })
                })
                .catch(err => next(err, 500));
        })
        .catch(err => next(err, 500))
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