const Solucao = require('../../models/solucao'),
    Empresa = require('../../models/empresa'),
    Avaliacao = require('../../models/avaliacao');

exports.solicitarCadastro = (req, res, next) => {
    const empresa = {
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        encarregado: req.body.encarregado,
    };

    const solucao = {
        nome: req.body.nome_solucao,
        categoria_: req.body.categoria_solucao,
        link: req.body.link_solucao,
        descricao: req.body.descricao_solucao
    }

    new Empresa( {
        ...empresa,
        status: 'pendente'
    })
    .save()
    .then( empresa => {
       new Solucao( {
           ...solucao,
           status: 'empresapendente',
           empresaId: empresa
       })
       .save()
       .then( solucao => {
            res.render('public/submissaoconcluida', {
                //informacoes da pagina que mostra os dados submetidos
            });
       })
       .catch( err => next(err, 500));
    })
    .catch( err => next(err, 500))
}