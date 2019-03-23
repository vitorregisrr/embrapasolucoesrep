exports.getEmpresas = (req, res, next) => {
    res.render('admin/empresa/empresas', {
        pageTitle: 'Soluções',
        path: "admin/empresas",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.getEmpresa = (req, res, next) => {
    res.render('admin/empresa/empresa', {
        pageTitle: 'Empresa',
        path: "admin/empresas",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.getSolicitacoes = (req, res, next) => {
    res.render('admin/empresa/solicitacoes', {
        pageTitle: 'Solicitações de Empresas',
        path: "admin/empresas",
        robotsFollow: false,
        errorMessage: []
    });
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
    res.render('admin/empresa/solicitacoes', {
        pageTitle: 'Solicitações de Empresas',
        path: "admin/empresas",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.getSolucoes = (req, res, next) => {
    res.render('admin/empresa/solicitacoes', {
        pageTitle: 'Solicitações de Empresas',
        path: "admin/empresas",
        robotsFollow: false,
        errorMessage: []
    });
}

exports.setEmpresaImage = (req, res, next) => {
    res.render('admin/empresa/nova', {
        pageTitle: 'Nova empresa',
        path: "admin/empresas",
        robotsFollow: false,
        errorMessage: []
    });    
}    

exports.removeEmpresaImage = (req, res, next) => {
    res.render('admin/empresa/nova', {
        pageTitle: 'Nova empresa',
        path: "admin/empresas",
        robotsFollow: false,
        errorMessage: []
    });    
}    

exports.deleteEmpresa = (req, res, next) => {
    res.render('admin/empresa/solicitacoes', {
        pageTitle: 'Solicitações de Empresas',
        path: "admin/empresas",
        robotsFollow: false,
        errorMessage: []
    });
}