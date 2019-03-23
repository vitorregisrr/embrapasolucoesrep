exports.getAvaliacoes = (req, res, next) => {
    res.render('admin/avaliacao/avaliacoes', {
        pageTitle: 'Avaliações',
        path: "admin/avaliacao",
        robotsFollow: false,
        errorMessage: []
    });
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