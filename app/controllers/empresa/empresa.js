const Solucao = require('../../models/solucao'),
    Empresa = require('../../models/empresa'),
    Avaliacao = require('../../models/avaliacao'),
    transporter = require('../../util/email-transporter')(),
    queryHelper = require('../../util/query-filter');

exports.getPerfil = (req, res, next) => {
    res.render('/empresa/perfil', {
        pageTitle: 'Perfil da empresa',
        path: "empresa/perfil",
        robotsFollow: false,
        errorMessage: [],
        empresa: req.empresa,
        form: false
    });
}