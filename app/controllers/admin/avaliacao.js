const Solucao = require('../../models/solucao'),
    Empresa = require('../../models/empresa'),
    Avaliacao = require('../../models/avaliacao'),
    filterHelper = require('../../util/query-filter');

exports.getAvaliacoes = (req, res, next) => {

    const query = filterHelper.avaliacao(req);
    query.status = 'aprovado';
    
    Avaliacao.find({
            ...query
        })
        .populate({
            path: 'solucaoId',
            populate: {
                path: 'empresaId '
            }
        })
        .sort({
            date: -1
        })
        .then(avaliacoes => {

            if (req.query.empresaId) {
                avaliacoes = avaliacoes.filter(avaliacao => avaliacao.solucaoId.empresaId._id.toString() == req.query.empresaId.toString());
            }

            res.render('admin/avaliacao/avaliacoes', {
                pageTitle: 'Avaliações',
                path: "admin/avaliacoes",
                robotsFollow: false,
                errorMessage: [],
                form: {
                    values: req.query
                },
                avaliacoes
            });
        })
        .catch(err => next(err, 500))
}

exports.getSolicitacoes = (req, res, next) => {


    const query = filterHelper.avaliacao(req);
    query.status = 'pendente';
    if (req.query.status == 'rejeitado') {
        query.status = 'rejeitado';
    }
    Avaliacao.find({
            ...query
        })
        .populate({
            path: 'solucaoId',
            populate: {
                path: 'empresaId '
            }
        })
        .sort({
            date: -1
        })
        .then(avaliacoes => {
            if (req.query.empresaId) {
                avaliacoes = avaliacoes.filter(avaliacao => avaliacao.solucaoId.empresaId == req.query.empresaId);
            }

            res.render('admin/avaliacao/solicitacoes', {
                pageTitle: 'Solicitações de Avaliação',
                path: "admin/avaliacoes/solicitacoes",
                robotsFollow: false,
                errorMessage: [],
                form: {
                    values: req.query
                },
                avaliacoes
            });
        })
        .catch(err => next(err, 500));
}


exports.aprovarAvaliacao = (req, res, next) => {

    Avaliacao.findOne({
            _id: req.body.id
        })
        .then(avaliacao => {
            if (!avaliacao) {
                res.redirect('/admin/avaliacoes/solicitacoes')
            }

            avaliacao.status = 'aprovado';
            avaliacao.save()
                .then(avaliacao => {
                    return Solucao.findOne({
                            _id: avaliacao.solucaoId
                        })
                        .then(solucao => {
                            if (!solucao) {
                                return false;
                            }
                            return solucao.updateRating();
                        })
                        .catch(err => next(err, 500))
                })
                .then(resul => res.redirect('/admin/avaliacoes/solicitacoes'))
                .catch(err => next(err, 500))
        })

        .catch(err => next(err));
}


exports.pendenciarAvaliacao = (req, res, next) => {

    Avaliacao.findOne({
            _id: req.body.id
        })
        .then(avaliacao => {
            if (!avaliacao) {
                res.redirect('/admin/avaliacoes/solicitacoes')
            }

            avaliacao.status = 'pendente';
            avaliacao.save()
                .then(avaliacao => {
                    return Solucao.findOne({
                            _id: avaliacao.solucaoId
                        })
                        .then(solucao => {
                            if (!solucao) {
                                return false;
                            }
                            return solucao.updateRating();
                        })
                        .catch(err => next(err, 500))
                })
                .then(resul => res.redirect('/admin/avaliacoes/solicitacoes'))
                .catch(err => next(err, 500))
        })

        .catch(err => next(err));
}



exports.rejeitarAvaliacao = (req, res, next) => {

    Avaliacao.findOne({
            _id: req.body.id
        })
        .then(avaliacao => {
            if (!avaliacao) {
                res.redirect('/admin/avaliacoes/solicitacoes')
            }

            avaliacao.status = 'rejeitado';
            avaliacao.save()
                .then(avaliacao => {
                    return Solucao.findOne({
                            _id: avaliacao.solucaoId
                        })
                        .then(solucao => {
                            if (!solucao) {
                                return false;
                            }
                            return solucao.updateRating();
                        })
                        .catch(err => next(err, 500))
                })
                .then(solucao => res.redirect('/admin/avaliacoes/solicitacoes'))
                .catch(err => next(err, 500))
        })

        .catch(err => next(err));
}