exports.getAvalicoes = (req, res, next) => {
    Empresa.find({
            _id: req.session.empresa
        })
        .then(empresa => {
            Solucao.find({
                    empresaId: empresa,
                    status: 'aprovado'
                })
                .then(solucoes => {
                    const avaliacoesPromise = solucoes.map(solucao => {
                        return Avaliacao.find({
                                solucaoId: solucao
                            })
                            .then(avaliacao => avaliacao);
                    })
                    Promise.all(avaliacoesPromise)
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
                })
                .catch(err => next(err, 500));
        })
        .catch(err => next(err, 500));
}