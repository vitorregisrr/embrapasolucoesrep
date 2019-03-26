const { check, body, validationResult } = require('express-validator/check');

exports.new = [
    // Express Validation
    [
        body('nome', 'O nome da solução é inválido.')
        .isLength({
            min: 8,
            max: 30
        })
        .withMessage('O nome da solução deve ter entre 8 e 30 letras.'),

        body('link', 'O link da solução é inválido.')
        .isURL()
        .withMessage('O link da solução não parece ter formato de uma URL.')
        .trim(),

        body('categoria', 'O campo categoria da solução é obrigatório'),
        
        body('descricao', 'A descrição da solução é inválido.')
        .isLength({
            min: 30
        })
        .withMessage('A descrição da solução deve ter no  minímo 30 letras.'),

        body('image', 'Imagem inválida, por favor escolha uma imagem!')
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error('Imagem inválida! Formatos aceitos: png, jpeg e jpg.')
            }

            return true;
        })
        .trim()
    ],

    //Calback Function
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .render('admin/solucao/nova', {
                    path: 'admin/solucao',
                    pageTitle: 'Nova solução',
                    errorMessage: errors.array(),
                    form: {
                        values: req.body,
                        hasError: errors.array().map(i => i.param)
                    },
                    user: req.body.user,
                    robotsFollow: false,
                })
        } else {
            next();
        }
    }

]

exports.edit = [
    [
        body('nome', 'O nome da solução é inválido.')
        .isLength({
            min: 8,
            max: 30
        })
        .withMessage('O nome da solução deve ter entre 8 e 30 letras.'),

        body('link', 'O link da solução é inválido.')
        .isURL()
        .withMessage('O link da solução não parece ter formato de uma URL.')
        .trim(),

        body('categoria', 'O campo categoria da solução é obrigatório'),
        
        body('descricao', 'A descrição da solução é inválido.')
        .isLength({
            min: 30
        })
        .withMessage('A descrição da solução deve ter no  minímo 30 letras.')
    ],

    //Calback Function
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .render('admin/solucao/editar', {
                    path: 'admin/solucao',
                    pageTitle: 'Editando solução',
                    errorMessage: errors.array(),
                    form: {
                        values: req.body,
                        hasError: errors.array().map(i => i.param)
                    },
                    user: req.body.user,
                    robotsFollow: false,
                    solucao: {...req.body}
                })
        } else {
            next();
        }
    }
]



exports.newSolucao = [
    // Express Validation
    [
        body('titulo', 'Entre uma senha válida!')
        .isLength({
            min: 8,
            max: 20
        })
        .withMessage('The a senha deve ter entre 8 e 20 letras!')
        .trim(),
    ],

    //Calback Function
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .render('admin/solucao/nova', {
                    path: 'admin/solucao',
                    pageTitle: 'Nova solução',
                    errorMessage: errors.array(),
                    form: {
                        values: req.body,
                        hasError: errors.array().map(i => i.param)
                    },
                    user: req.body.user,
                    robotsFollow: false,
                })
        } else {
            next();
        }
    }

]

exports.solicitacao = [
    [
        body('titulo', 'Entre uma senha válida!')
        .isLength({
            min: 8,
            max: 20
        })
        .withMessage('The a senha deve ter entre 8 e 20 letras!')
        .trim(),
    ],

    //Calback Function
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .render('admin/solucao/editar', {
                    path: 'admin/solucao',
                    pageTitle: 'Editando solução',
                    errorMessage: errors.array(),
                    form: {
                        values: req.body,
                        hasError: errors.array().map(i => i.param)
                    },
                    user: req.body.user,
                    robotsFollow: false,
                })
        } else {
            next();
        }
    }

]