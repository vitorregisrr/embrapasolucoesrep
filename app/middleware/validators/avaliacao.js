const {
    check,
    body,
    validationResult
} = require('express-validator/check'),
    Solucao = require('../../models/solucao'),
    Avaliacao = require('../../models/avaliacao');

module.exports = [
    [
        body('titulo', 'O título é obrigatório!')
        .isLength({
            min: 5,
            max: 25
        })
        .withMessage('O títulod deve ter entre 5 e 25 letras.'),

        body('autor', 'O autor é obrigatório!')
        .isLength({
            min: 4,
            max: 20
        })
        .withMessage('O autor deve ter entre 5 e 20 letras.'),

        body('titulo', 'O campo título é obrigatório!')
        .isLength({
            min: 5,
            max: 25
        })
        .withMessage('O título deve ter entre 5 e 25 letras.'),

        body('descricao', 'A descrição é obrigatória!')
        .isLength({
            min: 20,
        })
        .withMessage('A descrição deve ter no mínimo 20 letras. Escreva mais um pouco!'),

        body('rating', 'A avaliação por estrelas é obrigatória!')
        .isNumeric()


    ],

    //Calback Function
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            Solucao.findOne({
                    _id: req.body.solucaoId
                })
                .then(solucao => {
                    Avaliacao.find({
                            solucaoId: solucao,
                            status: 'aprovado'
                        })
                        .then(avaliacoes => {
                            return res
                                .status(422)
                                .render('public/solucao', {
                                    path: 'solucao',
                                    pageTitle: 'Emprapa Soluções - ' + req.body.titulo,
                                    errorMessage: errors.array(),
                                    form: {
                                        values: req.body,
                                        hasError: errors.array().map(i => i.param)
                                    },
                                    robotsFollow: true,
                                    showAvaliacao: true,
                                    showSuccess: false,
                                    solucao,
                                    avaliacoes
                                });
                        })
                        .catch(err => next(err, 500))
                })
                .catch(err => next(err, 500));
        } else {
            next();
        }
    }

]