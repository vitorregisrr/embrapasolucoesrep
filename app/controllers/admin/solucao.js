exports.getSolucoes = (req, res, next) => {
    res.render('admin/solucao/solucoes', {
        pageTitle: 'Soluções',
        path: "admin/depoimentos",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.getSolicitacoes = (req, res, next) => {
    res.render('admin/solucao/solicitacoes', {
        pageTitle: 'Solicitações de solução',
        path: "admin/depoimentos",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.getEditSolucao = (req, res, next) => {
    res.render('admin/solucao/editar', {
        pageTitle: 'Editar soluçao',
        path: "admin/depoimentos",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.getNewSolucao = (req, res, next) => {
    res.render('admin/solucao/nova', {
        pageTitle: 'Nova solução',
        path: "admin/depoimentos",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.postEditSolucao = (req, res, next) => {
    res.render('admin/solucao/editar', {
        pageTitle: 'Editar soluçao',
        path: "admin/depoimentos",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.postNewSolucao = (req, res, next) => {
    res.render('admin/solucao/nova', {
        pageTitle: 'Nova solução',
        path: "admin/depoimentos",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.setSolucaoImage = (req, res, next) => {
    res.render('admin/solucao/nova', {
        pageTitle: 'Nova solução',
        path: "admin/depoimentos",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.removeSolucaoImage = (req, res, next) => {
    res.render('admin/solucao/nova', {
        pageTitle: 'Nova solução',
        path: "admin/depoimentos",
        robotsFollow: false,
        errorMessage: []
    });
}


exports.deleteSolucao = (req, res, next) => {
    res.render('admin/solucao/editar', {
        pageTitle: 'Editar soluçao',
        path: "admin/depoimentos",
        robotsFollow: false,
        errorMessage: []
    });
}