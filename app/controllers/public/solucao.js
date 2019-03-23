exports.getSolucao = (req, res, next) => {
    res.render('public/solucao', {
        pageTitle: '',
        path: "/solucao",
        robotsFollow: false,
        errorMessage: []
    })
}

exports.getSolicitacao = (req, res, next) => {
    res.render('public/solicitacao', {
        pageTitle: '',
        path: "/solicitacao",
        robotsFollow: false,
        errorMessage: []
    })
}

exports.postSolicitacao = (req, res, next) => {
    res.render('public/solicitacao', {
        pageTitle: '',
        path: "/solicitacao",
        robotsFollow: false,
        errorMessage: []
    })
}