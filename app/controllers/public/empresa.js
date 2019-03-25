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
        nome_solucao: req.body.nome_solucao,
        categoria_solucao: req.body.categoria_solucao,
        link_solucao: req.body.link_solucao,
        descricao_solucao: req.body.descricao_solucao
    }

    new Empresa( {
        ...empresa,
        status: 'pendente'
    })
    .save()
    .then( empresa => {
       new Solucao( {
           ...solucao,
           status: 'pendente',
           empresaId: empresa
       })
       .save()
       .then( solucao => {
            res.render('/public/submissaoconcluida', {
                //informacoes da pagina que mostra os dados submetidos
            });
       })
       .catch( err => next(err, 500));
    })
    .catch( err => next(err, 500))
}