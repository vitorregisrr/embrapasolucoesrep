const Solucao = require('../../models/solucao'),
    Empresa = require('../../models/empresa'),
    Avaliacao = require('../../models/avaliacao');
    
exports.getAvaliacoes = (req, res, next) => {
   Avaliacao.find({ status: 'aprovado'})
   .sort({ date: -1})
   .then( avaliacoes => {
        res.render('admin/avaliacao/avaliacoes', {
            pageTitle: 'Avaliações',
            path: "admin/avaliacoes",
            robotsFollow: false,
            errorMessage: [],
            avaliacoes,
            form: false
        });
   })
   .catch( err => next(err, 500))
}

exports.getSolicitacoes = (req, res, next) => {
    res.render('admin/avaliacao/solicitacoes', {
        pageTitle: 'Solicitações de Avaliação',
        path: "admin/avalaicao/solicitacoes",
        robotsFollow: false,
        errorMessage: [],
        form: false
    });
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
            .then( resul => res.redirect('/admin/avaliacoes/solicitacoes'))
            .catch( err => next(err, 500))
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
            .then( solucao => res.redirect('/admin/avaliacoes/solicitacoes') )
            .catch( err => next(err, 500))
        })

        .catch(err => next(err));
}