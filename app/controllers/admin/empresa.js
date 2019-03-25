const Solucao = require('../../models/solucao'),
    Empresa = require('../../models/empresa'),
    Avaliacao = require('../../models/avaliacao');

exports.getEmpresas = (req, res, next) => {
    Empresa.find({
            status: 'aprovado'
        })
        .then(empresas => {
            res.render('admin/empresa/empresas', {
                pageTitle: 'Soluções',
                path: "admin/empresas",
                robotsFollow: false,
                errorMessage: [],
                empresas
            });
        })
        .catch(err => next(err, 500))
}

exports.getEmpresa = (req, res, next) => {
    Empresa.findOne({
            _id: req.body.id
        })
        .then(empresa => {
            res.render('admin/empresa/empresa', {
                pageTitle: 'Empresa',
                path: "admin/empresas",
                robotsFollow: false,
                errorMessage: [],
                empresa
            });
        })
        .catch(err => next(err, 500))
}

exports.getSolicitacoes = (req, res, next) => {
    Empresa.find({
            status: 'pendente'
        })
        .then(empresas => {
            res.render('admin/empresa/solicitacoes', {
                pageTitle: 'Solicitações de Empresas',
                path: "admin/empresas",
                robotsFollow: false,
                errorMessage: [],
                empresas
            });
        })
        .catch(err => next(err, 500))
}

exports.getEditEmpresa = (req, res, next) => {
    res.render('admin/empresa/editar', {
        pageTitle: 'Editar soluçao',
        path: "admin/empresas",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.getNewEmpresa = (req, res, next) => {
    res.render('admin/empresa/nova', {
        pageTitle: 'Nova empresa',
        path: "admin/empresas",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.postEditEmpresa = (req, res, next) => {
    res.render('admin/empresa/editar', {
        pageTitle: 'Editar soluçao',
        path: "admin/empresas",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.postNewEmpresa = (req, res, next) => {
    res.render('admin/empresa/nova', {
        pageTitle: 'Nova empresa',
        path: "admin/empresas",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.getAvaliacoes = (req, res, next) => {
    Avaliacao.find({
            status: 'aprovado'
        })
        .then(avaliacoes => {
            res.render('admin/avaliacao/avaliacoes', {
                pageTitle: 'Ver avaliações',
                path: "admin/avaliacoes",
                robotsFollow: false,
                errorMessage: [],
                avaliacoes
            });
        })
        .catch(err => next(err, 500));
}

exports.getSolucoes = (req, res, next) => {
    res.render('admin/empresa/solicitacoes', {
        pageTitle: 'Solicitações de Empresas',
        path: "admin/empresas",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.deleteEmpresa = (req, res, next) => {

    Empresa.find({
            id: req.body.id
        })
        .then(empresa => {
            if (!empresa) {
                res.redirect('/admin/empresas')
            }

            if (empresa.mainImage) {
                cloudinary.uploader.destroy(empresa.mainImage.public_id);
            }

            return res.redirect('/admin/empresas')

        })

        .catch(err => next(err));
}